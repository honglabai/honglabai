import "server-only";

import type { ConsultationResponse } from "@/types";

function getLocalConsultationAnalysis(projectDescription: string): ConsultationResponse {
  const text = projectDescription.toLowerCase();
  const techStack: string[] = ["Next.js (App Router)", "TypeScript", "Tailwind CSS"];

  if (text.includes("ai") || text.includes("인공지능") || text.includes("llm") || text.includes("제미나이") || text.includes("챗봇")) {
    techStack.push("AI SDK / LLM API");
  }
  if (text.includes("게임") || text.includes("퍼즐") || text.includes("스도쿠") || text.includes("십자말") || text.includes("game")) {
    techStack.push("HTML5 Canvas / Web Audio");
  }
  if (text.includes("모바일") || text.includes("앱") || text.includes("app") || text.includes("ios") || text.includes("안드로이드")) {
    techStack.push("React Native / PWA");
  }
  if (text.includes("결제") || text.includes("쇼핑") || text.includes("이커머스") || text.includes("상점")) {
    techStack.push("포트원(PortOne) 결제 연동");
  }
  if (text.includes("데이터") || text.includes("관리자") || text.includes("회원") || text.includes("로그인") || text.includes("db")) {
    techStack.push("PostgreSQL / RLS 보안 정책");
  }

  const uniqueStack = Array.from(new Set(techStack)).slice(0, 4);

  return {
    analysis:
      "제안해주신 프로젝트는 반응형 모던 웹/앱 아키텍처와 직관적인 인터랙션 설계가 핵심입니다. 클라이언트 최적화와 안정적인 데이터 흐름을 기반으로 고품질 제품으로 구현 가능합니다.",
    techStack: uniqueStack,
  };
}

export async function analyzeProjectRequest(projectDescription: string): Promise<ConsultationResponse> {
  // Gemini API integration is disconnected as requested. Local consultation analysis is used.
  return getLocalConsultationAnalysis(projectDescription);
}
