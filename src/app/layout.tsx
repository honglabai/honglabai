import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

// Self-hosted by next/font: no gstatic connection, and the CSS is inlined.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HongLabAI | AI Software & Consulting",
    template: "%s | HongLabAI",
  },
  description:
    "AI 기반 소프트웨어, 앱 포트폴리오 및 기술 컨설팅을 제공하는 HongLabAI의 공식 홈페이지입니다.",
  applicationName: "HongLabAI",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "HongLabAI",
    title: "HongLabAI | AI Software & Consulting",
    description:
      "AI 기술과 소프트웨어 엔지니어링으로 비즈니스 아이디어를 실제 제품으로 만듭니다.",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    ...(process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT_ID
      ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT_ID }
      : {}),
  },
};

// Organization markup helps search engines link the site to the brand entity.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HongLabAI",
  url: siteUrl,
  description:
    "AI 기반 소프트웨어, 앱 포트폴리오 및 기술 컨설팅을 제공하는 HongLabAI의 공식 홈페이지입니다.",
  legalName: "홍랩에이아이",
  founder: { "@type": "Person", name: "홍은선" },
  email: "honglabai@gmail.com",
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
      </head>
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-dark">
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}
