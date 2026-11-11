import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "프로젝트 문의 및 AI 기술 상담 | HongLabAI",
  description:
    "AI 소프트웨어 개발, LLM 도입 컨설팅, RAG 구축, 풀스택 웹/앱 외주 개발 문의. 프로젝트 아이디어를 남겨주시면 24시간 이내에 전담 엔지니어가 기술 타당성 검토와 함께 회신합니다.",
  keywords: [
    "프로젝트 문의",
    "AI 개발 문의",
    "LLM 컨설팅 의뢰",
    "RAG 시스템 외주",
    "웹앱 개발 문의",
    "HongLabAI",
    "홍랩에이아이",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "프로젝트 문의 및 AI 기술 상담 | HongLabAI",
    description:
      "AI 소프트웨어 개발, LLM 및 풀스택 웹/앱 프로젝트에 대해 HongLabAI와 상담하세요.",
    url: "/contact",
    siteName: "HongLabAI (홍랩에이아이)",
    locale: "ko_KR",
  },
};

export default function ContactPage() {
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
        name: "프로젝트 문의",
        item: `${siteUrl}/contact`,
      },
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "HongLabAI 프로젝트 문의",
    description: "AI 및 소프트웨어 엔지니어링 프로젝트 상담 신청 페이지",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "HongLabAI",
      email: "honglabai@gmail.com",
    },
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
