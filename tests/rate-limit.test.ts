import { describe, expect, test, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { checkRateLimit } from "@/server/rate-limit";
import type { Database } from "@/types/database";

// The limiter delegates counting to the check_rate_limit Postgres RPC, so these
// tests pin the contract: argument shape, response mapping, and the fail-open
// behavior on RPC failure (a deliberate availability tradeoff — see the module).
function clientReturning(response: unknown) {
  const rpc = vi.fn().mockResolvedValue(response);
  return { client: { rpc } as unknown as SupabaseClient<Database>, rpc };
}

describe("checkRateLimit — RPC contract", () => {
  test("passes the key, limit, and window in seconds", async () => {
    const { client, rpc } = clientReturning({ data: [{ allowed: true, retry_after_seconds: 0 }], error: null });

    await checkRateLimit(client, "consult:1.2.3.4", 5, 15 * 60 * 1000);

    expect(rpc).toHaveBeenCalledWith("check_rate_limit", {
      p_key: "consult:1.2.3.4",
      p_limit: 5,
      p_window_seconds: 900,
    });
  });

  test("rounds a sub-second window up to one second", async () => {
    const { client, rpc } = clientReturning({ data: [{ allowed: true, retry_after_seconds: 0 }], error: null });

    await checkRateLimit(client, "k", 1, 500);

    expect(rpc).toHaveBeenCalledWith("check_rate_limit", expect.objectContaining({ p_window_seconds: 1 }));
  });
});

describe("checkRateLimit — response mapping", () => {
  test("allows when the RPC allows", async () => {
    const { client } = clientReturning({ data: [{ allowed: true, retry_after_seconds: 0 }], error: null });

    await expect(checkRateLimit(client, "k", 5, 1000)).resolves.toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
  });

  test("blocks and surfaces retry-after when the RPC blocks", async () => {
    const { client } = clientReturning({ data: [{ allowed: false, retry_after_seconds: 42 }], error: null });

    await expect(checkRateLimit(client, "k", 5, 1000)).resolves.toEqual({
      allowed: false,
      retryAfterSeconds: 42,
    });
  });
});

describe("checkRateLimit — failure handling", () => {
  test("defaults to fail-open when the RPC errors", async () => {
    const { client } = clientReturning({ data: null, error: { message: "boom" } });

    const result = await checkRateLimit(client, "k", 5, 1000);

    expect(result).toEqual({ allowed: true, retryAfterSeconds: 0 });
  });

  test("fails open when the RPC returns no rows", async () => {
    const { client } = clientReturning({ data: [], error: null });

    await expect(checkRateLimit(client, "k", 5, 1000)).resolves.toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
  });

  test("fails closed when asked to, on RPC error", async () => {
    const { client } = clientReturning({ data: null, error: { message: "boom" } });

    const result = await checkRateLimit(client, "k", 5, 1000, "closed");

    // Paid endpoints use this: a broken limiter must not expose an unmetered
    // route. Blocks with a retry hint instead of letting the call through.
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  test("fails closed when the RPC returns no rows", async () => {
    const { client } = clientReturning({ data: [], error: null });

    await expect(checkRateLimit(client, "k", 5, 1000, "closed")).resolves.toMatchObject({
      allowed: false,
    });
  });

  test("failure mode does not affect a healthy RPC", async () => {
    const { client } = clientReturning({ data: [{ allowed: true, retry_after_seconds: 0 }], error: null });

    await expect(checkRateLimit(client, "k", 5, 1000, "closed")).resolves.toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
  });
});
