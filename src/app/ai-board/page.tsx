import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiBoardContainer from "@/components/board/AiBoardContainer";

export const metadata: Metadata = {
  title: "AI 활용 게시판 | HongLabAI",
  description:
    "생성형 AI, LLM 프롬프트 제어, 하이브리드 RAG 검색, 비즈니스 DX 자동화 및 MLOps 비용 절감 노하우를 다루는 계층형 트리 구조 기술 게시판입니다.",
  alternates: { canonical: "/ai-board" },
};

export const revalidate = 60;

export default function AiBoardPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="relative overflow-hidden px-4 sm:px-6 pt-32 pb-24">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[500px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
        <div className="container relative mx-auto max-w-7xl">
          <AiBoardContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
