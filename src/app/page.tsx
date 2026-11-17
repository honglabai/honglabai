import Link from "next/link";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import FeaturedApps from "@/components/FeaturedApps";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import { getPublishedApps } from "@/server/apps";

export const revalidate = 60;

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "HongLabAI에서는 어떤 AI 개발 및 기술 서비스를 제공하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "거대언어모델(LLM) 기반 솔루션, RAG(검색 증강 생성) 사내 지식 검색 엔진, 기업 맞춤형 24/7 AI 상담 챗봇, 비정형 PDF/계약서 데이터 추출 자동화 파이프라인 및 풀스택 반응형 웹/앱 개발 서비스를 제공합니다.",
      },
    },
    {
      "@type": "Question",
      name: "AI 도입 및 외주 개발 프로젝트의 일반적인 소요 기간은 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "프로젝트의 범위, 데이터 준비 상태, 외부 시스템 연동과 검증 요구사항에 따라 달라집니다. 문의 시 목표와 필요한 기능을 알려주시면 기술 타당성을 검토해 일정과 범위를 협의합니다.",
      },
    },
    {
      "@type": "Question",
      name: "기존 사내 시스템이나 데이터베이스에 AI 기능을 연동할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 가능합니다. 기존 REST API, PostgreSQL, MySQL 등 사내 데이터베이스 및 클라우드 인프라와 안전하게 연동되는 맞춤형 AI API 및 에이전트 시스템을 구축해 드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "개발 의뢰 및 견적 상담은 어떻게 신청하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "웹사이트 상단의 '프로젝트 문의하기' 메뉴 또는 공식 이메일(honglabai@gmail.com)을 통해 프로젝트 개요를 남겨주시면 기술 타당성과 필요한 개발 범위를 검토해 안내해 드립니다.",
      },
    },
  ],
};

export default async function HomePage() {
  const portfolioApps = await getPublishedApps();

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <Navbar />
      <ScrollReveal />
      <main id="main-content">
        <ScrollVideoHero
          src="/media/hero-scroll.mp4"
          poster="/media/hero-poster.webp"
          eyebrow="AI Software & Consulting"
          headline={
            <>
              인간을 널리 이롭게!
              <br />
              <span className="font-robot tracking-wide text-zinc-950">
                HongLab<span className="text-zinc-500">AI</span>
              </span>
            </>
          }
          description="기획부터 설계, 개발, 배포까지 직접 만듭니다. 지금까지 만든 앱들이 실제로 운영되고 있습니다."
          apps={portfolioApps}
        >
          <Link
            href="/apps"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-zinc-950 shadow-[0_18px_36px_-14px_rgba(180,212,49,0.7)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-strong active:scale-[0.98] sm:text-lg"
          >
            만든 앱 둘러보기
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/70 px-8 py-4 text-base font-bold text-zinc-900 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-zinc-950 active:scale-[0.98] sm:text-lg"
          >
            프로젝트 문의하기
          </Link>
        </ScrollVideoHero>

        <FeaturedApps apps={portfolioApps} />
        <Features />
        <section aria-labelledby="home-faq-title" className="mx-auto max-w-4xl px-6 py-16">
          <h2 id="home-faq-title" className="text-2xl font-bold tracking-tight">AI 개발 및 기술 컨설팅 자주 묻는 질문</h2>
          <div className="mt-8 space-y-6">
            {homeFaqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name}>
                <h3 className="text-lg font-semibold">{faq.name}</h3>
                <p className="mt-2 leading-7 text-zinc-600">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8"><Link href="/contact" className="font-semibold text-lime-800 underline underline-offset-4">프로젝트 문의하기</Link></p>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
