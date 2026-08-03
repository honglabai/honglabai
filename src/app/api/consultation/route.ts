import { NextResponse } from "next/server";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { analyzeProjectRequest } from "@/server/gemini";
import { checkRateLimit } from "@/server/rate-limit";

type ConsultationRequest = {
  projectDescription?: unknown;
};

export async function POST(request: Request) {
  // Unauthenticated endpoint that calls a paid LLM — throttle by IP to prevent
  // cost-abuse / DoS. Skipped only when Supabase is unconfigured (no limiter).
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const limiter = createPublicSupabaseClient();
  if (limiter) {
    const rateLimit = await checkRateLimit(limiter, `consult:${clientKey}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }
  }

  let body: ConsultationRequest;

  try {
    body = (await request.json()) as ConsultationRequest;
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (typeof body.projectDescription !== "string") {
    return NextResponse.json({ message: "프로젝트 설명이 필요합니다." }, { status: 400 });
  }

  const projectDescription = body.projectDescription.trim();

  if (projectDescription.length < 10 || projectDescription.length > 3000) {
    return NextResponse.json(
      { message: "프로젝트 설명은 10자 이상 3,000자 이하로 입력해 주세요." },
      { status: 400 },
    );
  }

  const result = await analyzeProjectRequest(projectDescription);
  return NextResponse.json(result);
}
