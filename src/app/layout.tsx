import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

// Self-hosted by next/font: no gstatic connection, and the CSS is inlined.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HongLabAI | AI 소프트웨어 개발 & LLM 기술 컨설팅",
    template: "%s | HongLabAI",
  },
  description:
    "AI 소프트웨어 개발, 생성형 AI·LLM 도입 컨설팅, RAG 및 비즈니스 업무 자동화 솔루션. 기획부터 배포까지 아이디어를 작동하는 완성도 높은 제품으로 직접 만듭니다.",
  applicationName: "HongLabAI",
  keywords: [
    "홍랩에이아이",
    "HongLabAI",
    "AI 소프트웨어 개발",
    "생성형 AI 컨설팅",
    "LLM 도입 솔루션",
    "RAG 시스템 구축",
    "AI 챗봇 개발",
    "풀스택 웹개발",
    "모바일 앱 개발",
    "업무 자동화",
    "DX 컨설팅",
    "프롬프트 엔지니어링",
    "Next.js AI 개발",
    "홍은선",
  ],
  authors: [{ name: "홍은선 (HongLabAI)", url: siteUrl }],
  creator: "홍은선",
  publisher: "HongLabAI",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "HongLabAI (홍랩에이아이)",
    title: "HongLabAI | AI 소프트웨어 개발 & LLM 기술 컨설팅",
    description:
      "AI 기술과 소프트웨어 엔지니어링으로 비즈니스 아이디어를 실제 제품으로 만듭니다. 기획부터 설계, 개발, 배포까지 직접 운영합니다.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HongLabAI - AI Software & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HongLabAI | AI 소프트웨어 개발 & LLM 기술 컨설팅",
    description:
      "AI 기술과 소프트웨어 엔지니어링으로 비즈니스 아이디어를 실제 제품으로 만듭니다.",
    images: [`${siteUrl}/opengraph-image`],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || process.env.NAVER_SITE_VERIFICATION
        ? {
            "naver-site-verification": (
              process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ||
              process.env.NAVER_SITE_VERIFICATION
            )?.trim(),
          }
        : {}),
      "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT_ID || "ca-pub-8675047967209162",
    },
  },
};

// Organization markup helps search engines link the site to the brand entity.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "HongLabAI",
  alternateName: ["홍랩에이아이", "HongLab AI"],
  url: siteUrl,
  sameAs: [
    "https://honglabai.com",
    "https://www.honglabai.com",
  ],
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.svg`,
  },
  description:
    "AI 기반 소프트웨어, 앱 포트폴리오 및 기술 컨설팅을 제공하는 HongLabAI의 공식 홈페이지입니다.",
  legalName: "홍랩에이아이",
  founder: {
    "@type": "Person",
    name: "홍은선",
    jobTitle: "Founder & Lead AI Engineer",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "honglabai@gmail.com",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: ["Korean", "English"],
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Generative AI",
    "Large Language Models",
    "RAG (Retrieval-Augmented Generation)",
    "Full-Stack Web Development",
    "Mobile Application Development",
    "Digital Transformation",
  ],
};

// WebSite markup provides site search and metadata context for Google & Naver
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "HongLabAI (홍랩에이아이)",
  alternateName: ["HongLabAI", "honglabai.com", "www.honglabai.com"],
  description: "AI 소프트웨어 개발 & LLM 기술 컨설팅",
  inLanguage: "ko-KR",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/ai-board?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={orbitron.variable}>
      <head>
        {/* Pretendard, self-hosted from /public. Loaded as a plain stylesheet
            link rather than a CSS @import so the bundler leaves the /fonts
            paths alone. The dynamic subset fetches only the ranges the page
            uses, and same-origin delivery drops the third-party connection
            that cost ~357ms on the critical path. */}
        <link rel="stylesheet" href="/fonts/pretendard.css" />
        <link rel="alternate" type="application/rss+xml" title="HongLabAI RSS Feed" href="/rss.xml" />
        {/* Google AdSense official script tag for custom domain ownership verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8675047967209162"
          crossOrigin="anonymous"
        />
      </head>
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-dark"
        >
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}
