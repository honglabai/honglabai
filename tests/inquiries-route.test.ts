import { beforeEach, describe, expect, test, vi } from "vitest";

// The route pulls in the Supabase client and the limiter; both are mocked so
// these tests exercise request validation, the honeypot, and the rate-limit
// branch without touching the network.
const insert = vi.fn();
const createPublicSupabaseClient = vi.fn();
const checkRateLimit = vi.fn();

vi.mock("@/lib/supabase/public", () => ({
  createPublicSupabaseClient: () => createPublicSupabaseClient(),
}));

vi.mock("@/server/rate-limit", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
}));

const { POST } = await import("@/app/api/inquiries/route");

function request(body: unknown) {
  return new Request("https://example.com/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  inquiryType: "project",
  name: "홍길동",
  email: "user@example.com",
  company: "회사",
  message: "충분히 긴 문의 내용입니다.",
  privacyConsent: true,
};

beforeEach(() => {
  vi.clearAllMocks();
  insert.mockResolvedValue({ error: null });
  createPublicSupabaseClient.mockReturnValue({ from: () => ({ insert }) });
  checkRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: 0 });
});

describe("POST /api/inquiries — happy path", () => {
  test("accepts a valid inquiry and inserts it", async () => {
    const response = await POST(request(validBody));

    expect(response.status).toBe(201);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert.mock.calls[0][0]).toMatchObject({
      inquiry_type: "project",
      name: "홍길동",
      email: "user@example.com",
      privacy_consent: true,
      status: "new",
    });
  });

  test("lowercases the stored email", async () => {
    await POST(request({ ...validBody, email: "USER@Example.COM" }));

    expect(insert.mock.calls[0][0].email).toBe("user@example.com");
  });
});

describe("POST /api/inquiries — rate limiting", () => {
  test("returns 429 with Retry-After when throttled", async () => {
    checkRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 300 });

    const response = await POST(request(validBody));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("300");
    expect(insert).not.toHaveBeenCalled();
  });

  test("keys the limit on the client IP", async () => {
    await POST(request(validBody));

    expect(checkRateLimit).toHaveBeenCalledWith(expect.anything(), "inquiry:1.2.3.4", 5, 15 * 60 * 1000);
  });
});

describe("POST /api/inquiries — honeypot", () => {
  test("silently accepts but does not store a bot submission", async () => {
    const response = await POST(request({ ...validBody, website: "http://spam.example" }));

    // Looks successful to the bot; nothing is written.
    expect(response.status).toBe(201);
    expect(insert).not.toHaveBeenCalled();
  });
});

describe("POST /api/inquiries — validation", () => {
  test("rejects malformed JSON", async () => {
    const response = await POST(request("{not json"));

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  test.each([
    ["unknown inquiry type", { inquiryType: "bogus" }],
    ["missing name", { name: "" }],
    ["invalid email", { email: "not-an-email" }],
    ["message shorter than 10 chars", { message: "짧음" }],
    ["missing privacy consent", { privacyConsent: false }],
    ["overlong name", { name: "a".repeat(101) }],
    ["overlong message", { message: "a".repeat(3001) }],
  ])("rejects %s", async (_label, override) => {
    const response = await POST(request({ ...validBody, ...override }));

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });
});

describe("POST /api/inquiries — unconfigured Supabase", () => {
  test("returns 503 instead of crashing", async () => {
    createPublicSupabaseClient.mockReturnValue(null);

    const response = await POST(request(validBody));

    expect(response.status).toBe(503);
  });
});
