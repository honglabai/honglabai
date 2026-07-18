import { NextResponse } from "next/server";
import { analyzeProjectRequest } from "@/server/gemini";

type ConsultationRequest = {
  projectDescription?: unknown;
};

export async function POST(request: Request) {
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
