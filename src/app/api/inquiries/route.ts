import { NextResponse } from "next/server";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { checkRateLimit } from "@/server/rate-limit";

type InquiryBody = {
  inquiryType?: unknown;
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  privacyConsent?: unknown;
  website?: unknown;
};

const allowedTypes = new Set(["project", "partnership", "investment", "other"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const rateLimit = checkRateLimit(`inquiry:${clientKey}`, 5, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "문의 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "문의가 접수되었습니다." }, { status: 201 });
  }

  const inquiryType = typeof body.inquiryType === "string" ? body.inquiryType : "project";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!allowedTypes.has(inquiryType) || !name || name.length > 100 || !emailPattern.test(email) || email.length > 320) {
    return NextResponse.json({ message: "이름, 이메일과 문의 유형을 확인해 주세요." }, { status: 400 });
  }

  if (company.length > 120 || message.length < 10 || message.length > 3000 || body.privacyConsent !== true) {
    return NextResponse.json({ message: "문의 내용과 개인정보 수집 동의를 확인해 주세요." }, { status: 400 });
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) return NextResponse.json({ message: "문의 저장소가 아직 연결되지 않았습니다." }, { status: 503 });

  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: inquiryType,
    name,
    email,
    company,
    message,
    privacy_consent: true,
    consent_version: "2026-07-18",
    source: "website",
    status: "new",
    user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
  });

  if (error) {
    console.error("Inquiry insert failed", error.message);
    return NextResponse.json({ message: "문의 저장 중 오류가 발생했습니다." }, { status: 500 });
  }

  return NextResponse.json({ message: "문의가 접수되었습니다. 확인 후 연락드리겠습니다." }, { status: 201 });
}
