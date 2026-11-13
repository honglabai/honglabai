import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "브랜드 스토리 | AI로 인간을 널리 이롭게! 홍랩 AI",
  description:
    "AI로 인간을 널리 이롭게! 홍익인간(弘益人間)의 철학을 기술로 실현하는 홍랩 AI의 브랜드 스토리. 사람의 작은 불편을 발견하고 실제 작동하는 제품으로 해결합니다.",
  keywords: [
    "홍랩AI 브랜드 스토리",
    "홍랩 AI",
    "AI로 인간을 널리 이롭게",
    "홍익인간 AI",
    "Technology for People",
    "AI for Everyone",
    "홍은선 대표",
    "AI 소프트웨어 스튜디오",
  ],
  alternates: { canonical: "/brand-story" },
  openGraph: {
    type: "website",
    title: "브랜드 스토리 | AI로 인간을 널리 이롭게! 홍랩 AI",
    description:
      "기술의 발전이 곧 인간의 발전은 아닙니다. 기술이 사람의 삶을 이롭게 할 때 비로소 진정한 발전이 됩니다. 홍랩 AI의 철학과 비전을 만나보세요.",
    url: "/brand-story",
    siteName: "HongLabAI (홍랩에이아이)",
    locale: "ko_KR",
  },
};

const storySteps = [
  {
    step: "01",
    tag: "문제 제기",
    title: "AI는 발전하는데 왜 일상은 여전히 불편할까?",
    desc: "기술은 날마다 똑똑해지지만, 평범한 사람들의 하루에는 번거로운 기록, 복잡한 정보 탐색, 낯선 도구의 장벽이 여전히 남아 있습니다.",
  },
  {
    step: "02",
    tag: "고객 공감",
    title: "더 복잡한 기술이 아니라 더 쉬운 일상이 필요하다",
    desc: "사람들이 진정으로 원하는 것은 기술 과시가 아닌, 오늘 하루의 시간과 에너지를 아껴주고 마음을 편안하게 덜어주는 직관적인 도구입니다.",
  },
  {
    step: "03",
    tag: "해결책 제시",
    title: "작은 불편을 발견하고, 작동하는 제품으로 해결한다",
    desc: "홍랩 AI는 말에 머물지 않습니다. 파크골프 점수 관리부터 국군 복지 상품 가이드, 스마트 발표 도구까지 실제 작동하는 소프트웨어로 답합니다.",
  },
  {
    step: "04",
    tag: "정체성 변화",
    title: "기술에 끌려가지 않고 기술로 더 많은 일을 해내는 사람으로",
    desc: "AI를 두려워하지 않고, 자신의 호흡에 맞추어 기술을 주체적으로 활용하며 더 창의적이고 가치 있는 일에 집중하는 주인공으로 변화합니다.",
  },
  {
    step: "05",
    tag: "행복한 결말",
    title: "누구나 기술의 혜택을 누리고 자신의 삶에 더 집중하는 세상",
    desc: "AI 전문가가 아니어도, 나이와 경험에 관계없이 누구나 기술의 결실을 편안하게 누리는 세상. 홍랩 AI가 지향하는 내일입니다.",
  },
];

const proofApps = [
  {
    emoji: "⛳",
    name: "가자, 파골!",
    category: "파크골프 점수 관리 & 편의 서비스",
    desc: "작은 글씨와 복잡한 점수판 대신, 어르신과 동호인 모두가 경기 자체의 즐거움에만 몰입할 수 있도록 돕습니다.",
    href: "https://pagol.zeromorow.chatgpt.site",
  },
  {
    emoji: "🎖️",
    name: "PX 구매 가이드",
    category: "국군 복지 쇼핑 정보 포털",
    desc: "수많은 영외/영내 마트 상품과 할인 정보 속에서, 장병과 군 가족들이 가장 합리적인 소비를 할 수 있도록 안내합니다.",
    href: "https://pxguide.zeromorow.chatgpt.site/",
  },
  {
    emoji: "🎙️",
    name: "큐노트",
    category: "스마트 프롬프터 & 스피치 서포터",
    desc: "무대와 카메라 앞 긴장을 덜고, 누구나 자신의 페이스대로 자연스럽고 당당하게 생각을 표현하도록 지원합니다.",
    href: "https://cuenote.zeromorow.chatgpt.site",
  },
  {
    emoji: "🤝",
    name: "마이맥 (Network CRM)",
    category: "인간 중심 개인 네트워크 솔루션",
    desc: "소중한 인연들과의 히스토리를 잊지 않고 챙기며, 따뜻하고 지속 가능한 신뢰의 자산으로 키워가도록 돕습니다.",
    href: "https://network-crm-theta.vercel.app/",
  },
  {
    emoji: "📅",
    name: "밀리데이 (Miliyday)",
    category: "군 복무 맞춤형 디데이 & 플래너",
    desc: "국방의 의무를 다하는 청년들과 기다리는 가족·연인의 소중한 시간을 따뜻한 응원과 설렘으로 채워줍니다.",
    href: "https://miliyday.vercel.app/",
  },
];

const brandIdentity = [
  { label: "브랜드 미션", value: "AI를 통해 사람의 일상을 더 편리하고 이롭게 만든다." },
  { label: "브랜드 비전", value: "누구나 AI의 혜택을 누릴 수 있는 세상 (Technology for People. AI for Everyone.)" },
  { label: "핵심 철학", value: "홍익인간(弘益人間) — 인간의 가치를 우선하고 일상과 공동체를 널리 이롭게 함" },
  { label: "브랜드 슬로건", value: "AI로 인간을 널리 이롭게! 홍랩 AI" },
  { label: "브랜드 약속", value: "사람의 작은 불편을 발견하고, 실제 작동하는 기술로 해결한다." },
  { label: "핵심 차별점", value: "철학을 구호에 그치지 않고 실제 운영되는 제품 포트폴리오로 증명한다." },
];

export default function BrandStoryPage() {
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
        name: "브랜드 스토리",
        item: `${siteUrl}/brand-story`,
      },
    ],
  };

  const storyJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "HongLab AI 브랜드 스토리",
    description: "AI로 인간을 널리 이롭게! 홍익인간의 철학을 기술로 실현하는 홍랩 AI",
    url: `${siteUrl}/brand-story`,
    mainEntity: {
      "@type": "Organization",
      name: "HongLabAI",
      slogan: "AI로 인간을 널리 이롭게! 홍랩 AI",
      url: siteUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="relative overflow-hidden px-6 pt-36 pb-28">
        {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 h-[450px] w-[550px] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]"
        />

        <div className="container relative mx-auto max-w-4xl space-y-20">
          {/* Header */}
          <div className="text-center sm:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-300/80 bg-accent/30 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-zinc-900 uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
              HONGLAB AI · BRAND STORY &amp; PHILOSOPHY
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 leading-[1.12] tracking-tight">
              AI로 인간을 널리 이롭게!
              <br />
              <span className="text-lime-700">홍랩 AI</span>
            </h1>
            <p className="mt-3 font-robot text-sm sm:text-base font-semibold text-zinc-500 italic">
              Technology for People. AI for Everyone.
            </p>
          </div>

          {/* Core Philosophy Highlight Card */}
          <div className="relative rounded-3xl border border-zinc-900/10 bg-gradient-to-br from-white via-white to-zinc-50 p-8 sm:p-12 shadow-[0_20px_50px_-20px_rgba(24,24,27,0.08)]">
            <span className="inline-block rounded-md bg-zinc-950 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-accent uppercase mb-4">
              Core Philosophy
            </span>
            <blockquote className="text-xl sm:text-2xl font-black text-zinc-950 leading-snug">
              &ldquo;기술의 발전이 곧 인간의 발전은 아닙니다.
              <br className="hidden sm:inline" />
              {" "}기술이 사람의 삶을 이롭게 할 때, 비로소 진정한 발전이 됩니다.&rdquo;
            </blockquote>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-zinc-700">
              홍랩 AI는 <strong className="font-bold text-zinc-950">&apos;AI를 화려하게 만드는 회사&apos;</strong>가 아니라,{" "}
              <strong className="font-bold text-zinc-950">&apos;AI로 사람의 삶을 더 이롭게 만드는 회사&apos;</strong>입니다.
              오래전 우리에게 있었던 <span className="font-semibold text-lime-800">&apos;홍익인간(弘益人間)&apos;</span>의 위대한 지혜를
              인공지능 시대의 새로운 약속으로 이어가며, 사람의 일상 속 작은 불편을 발견하고 실제 작동하는 제품으로 해결합니다.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-xl mb-4">
                ❓
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">인간 중심의 질문</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                기술은 하루가 다르게 똑똑해지는데 왜 일상은 여전히 불편할까? 거창한 기술 과시보다 누구의 시간을 아껴줄 수 있는지를 먼저 생각합니다.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-xl mb-4">
                🌱
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">홍익인간의 약속</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                모든 사람이 AI 전문가가 될 필요는 없습니다. 기술을 잘 몰라도 누구나 기술의 결실을 온전히 누릴 수 있는 세상을 만듭니다.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-xl mb-4">
                ⚡
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">작동하는 제품으로 증명</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                구호에 그치지 않고, 기획부터 설계·개발·배포까지 직접 연결하여 사용자 곁에서 실제로 운영되는 살아있는 소프트웨어로 답합니다.
              </p>
            </div>
          </div>

          {/* 5-Step StoryBrand Framework */}
          <div>
            <div className="mb-8">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                5-Step Framework
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                우리가 문제를 해결하고 가치를 만드는 5단계
              </h2>
            </div>

            <div className="space-y-3.5">
              {storySteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:border-lime-400 transition-colors"
                >
                  <div className="flex items-center gap-3 shrink-0 sm:w-36">
                    <span className="font-mono text-2xl font-black text-lime-700">{item.step}</span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-700">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proof of Philosophy: Operating Apps */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                  Proof of Philosophy
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  철학을 증명하는 실제 서비스들
                </h2>
              </div>
              <Link
                href="/apps"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-zinc-900 hover:text-lime-700 transition-colors"
              >
                전체 포트폴리오
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {proofApps.map((app) => (
                <a
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-2xl group-hover:scale-105 transition-transform">
                      {app.emoji}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-950 transition-colors">
                      서비스 열기 ↗
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 group-hover:text-lime-700 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 mb-2">{app.category}</p>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{app.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Brand Identity Matrix */}
          <div>
            <div className="mb-6">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                Brand Matrix
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                홍랩 AI 브랜드 정체성
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xs divide-y divide-zinc-100">
              {brandIdentity.map((item) => (
                <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 gap-2 sm:gap-4 hover:bg-zinc-50/70 transition-colors">
                  <div className="font-bold text-xs sm:text-sm text-zinc-950 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-strong shrink-0" />
                    {item.label}
                  </div>
                  <div className="sm:col-span-2 text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action Card */}
          <div className="rounded-3xl border border-transparent bg-zinc-950 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-accent/20 px-3 py-1 font-mono text-[11px] font-bold text-accent mb-3">
                Let&apos;s Build Together
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                당신의 아이디어에 사람 중심의 기술을 더합니다
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                사람의 일상을 편리하고 이롭게 만드는 AI 소프트웨어, 기획부터 설계와 출시까지 홍랩 AI와 함께 시작하세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/apps"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-zinc-700"
              >
                포트폴리오 둘러보기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs sm:text-sm font-bold text-zinc-950 shadow-md transition-all hover:bg-accent-strong active:scale-95"
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
