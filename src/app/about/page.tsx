import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "회사 소개 및 운영 철학",
  description: "HongLabAI의 설립 목적, AI 소프트웨어 엔지니어링 원칙, 연구팀 구성 및 기술 콘텐츠 검증 기준을 소개합니다.",
  alternates: { canonical: "/about" },
};

const domains = [
  {
    icon: "🧠",
    title: "거대언어모델(LLM) 엔지니어링",
    description: "단순 API 호출을 넘어 Structured Outputs, 시스템 프롬프트 가드레일, 멀티 에이전트 루프를 엔터프라이즈 환경에 적용합니다.",
  },
  {
    icon: "🔍",
    title: "하이브리드 RAG & 검색 엔진",
    description: "BM25 형태소 분석과 고차원 벡터 임베딩을 상호 순위 융합(RRF)하여 지식 검색 정확도를 극한으로 끌어올립니다.",
  },
  {
    icon: "⚡",
    title: "비즈니스 DX & 워크플로우 자동화",
    description: "24/7 고객 상담 챗봇, 비정형 PDF/계약서 데이터 추출 파이프라인으로 기업의 반복 수작업을 제로화합니다.",
  },
  {
    icon: "🚀",
    title: "풀스택 차세대 웹 애플리케이션",
    description: "Next.js App Router, Vercel AI SDK 실시간 스트리밍, 반응형 모바일 웹 게임을 기획부터 배포까지 원스톱으로 제작합니다.",
  },
];

const editorialStandards = [
  {
    number: "01",
    title: "100% 실무 프로덕션 검증",
    description: "이론에 그치는 튜토리얼이 아닌, 실제 서비스 배포 및 트래픽 환경에서 검증된 코드와 아키텍처만을 기술 게시판에 발행합니다.",
  },
  {
    number: "02",
    title: "투명한 벤치마크 및 비용 데이터 공개",
    description: "토큰 사용량, 지연시간(TTFT), 캐시 적중률, API 비용 절감 수치를 객관적 수치와 함께 있는 그대로 공개합니다.",
  },
  {
    number: "03",
    title: "상시 피드백 및 트리 토론 환류",
    description: "게시판의 계층형 트리 댓글 시스템을 통해 현업 개발자들의 질문과 피드백을 실시간으로 수렴하여 문서를 지속 보완합니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="relative overflow-hidden px-6 pt-36 pb-24">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

        <div className="container relative mx-auto max-w-4xl space-y-16">
          {/* Header */}
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
              About HongLabAI
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 leading-tight tracking-tight">
              아이디어가 실제로 작동하는
              <br />
              <span className="text-lime-700">검증된 제품</span>이 될 때까지.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-600">
              홍랩에이아이(HongLabAI)는 AI 기술과 현대 소프트웨어 엔지니어링을 결합하여,
              실제 비즈니스 현장에서 안정적으로 운영되는 디지털 솔루션과 웹 서비스를 연구·개발하는 AI 소프트웨어 스튜디오입니다.
            </p>
          </div>

          {/* Core Research & Technical Domains */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-6">
              주요 핵심 기술 및 연구 분야
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {domains.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xl mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Guidelines (E-E-A-T) */}
          <div className="rounded-3xl border border-zinc-200 bg-zinc-900 p-8 sm:p-10 text-white">
            <div className="mb-8">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                E-E-A-T 검증 체계
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black">
                HongLabAI 기술 콘텐츠 발행 및 검증 기준
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                구글 검색 품질 가이드라인과 글로벌 엔지니어링 표준에 입각하여, 독자들에게 신뢰할 수 있는 정보를 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editorialStandards.map((std) => (
                <div key={std.number} className="rounded-2xl bg-zinc-800/80 p-5 border border-zinc-700/60">
                  <span className="font-mono text-2xl font-black text-accent">{std.number}</span>
                  <h3 className="mt-2 text-base font-bold text-white mb-2">{std.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{std.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organization & Representative Information */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-xs">
            <h2 className="text-2xl font-black text-zinc-950 mb-6">
              사업자 정보 및 거버넌스
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">상호</p>
                <p className="text-base font-bold text-zinc-900">홍랩에이아이 (HonglabAI)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">대표자 / 기술 총괄</p>
                <p className="text-base font-bold text-zinc-900">홍은선</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">사업자 등록번호</p>
                <p className="text-base font-bold text-zinc-900">571-22-02410</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">공식 이메일</p>
                <a
                  href="mailto:honglabai@gmail.com"
                  className="text-base font-bold text-zinc-900 underline decoration-accent-strong decoration-2 underline-offset-2"
                >
                  honglabai@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-zinc-500">
                기술 제휴, 아티클 기고 및 프로젝트 의뢰는 문의 페이지를 통해 24시간 접수 가능합니다.
              </p>
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-accent-strong"
              >
                프로젝트 문의하기 →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
