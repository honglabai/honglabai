import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiBoardContainer from "@/components/board/AiBoardContainer";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "AI 활용 기술 게시판 | 생성형 AI·LLM 실전 엔지니어링 가이드",
  description:
    "생성형 AI, Structured Outputs, 하이브리드 RAG 검색, 자율 AI 에이전트 루프, DX 자동화 파이프라인, MLOps 모델 서빙 노하우를 다루는 HongLabAI의 계층형 트리 기술 게시판입니다.",
  keywords: [
    "AI 활용",
    "AI 기술 게시판",
    "생성형 AI",
    "LLM 엔지니어링",
    "하이브리드 RAG",
    "AI 에이전트",
    "DX 자동화",
    "MLOps",
    "HongLabAI",
    "홍랩에이아이",
  ],
  alternates: { canonical: "/ai-board" },
  openGraph: {
    type: "website",
    title: "AI 활용 기술 게시판 | HongLabAI",
    description:
      "생성형 AI와 LLM을 비즈니스 및 소프트웨어 엔지니어링에 실제로 적용한 실전 유스케이스와 아키텍처를 확인하세요.",
    url: "/ai-board",
    siteName: "HongLabAI (홍랩에이아이)",
    locale: "ko_KR",
  },
};

export const revalidate = 60;

export default function AiBoardPage() {
  const siteUrl = getSiteUrl();

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI 활용 게시판",
        item: `${siteUrl}/ai-board`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI 활용 기술 게시판",
    description:
      "생성형 AI, LLM 프롬프트 제어, 하이브리드 RAG 검색, 비즈니스 DX 자동화 및 MLOps 비용 절감 노하우를 다루는 계층형 트리 구조 기술 게시판입니다.",
    url: `${siteUrl}/ai-board`,
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
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
