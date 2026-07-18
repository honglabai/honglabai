import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
