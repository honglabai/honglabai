import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "브랜드 스토리 & 회사 소개 | HongLabAI (홍랩AI)",
  description:
    "AI로, 사람을 널리 이롭게. 홍익인간(弘益人間)의 철학을 기술로 실현하는 홍랩AI의 공식 브랜드 스토리, 서비스 철학, AI 엔지니어링 원칙 및 비즈니스 거버넌스를 소개합니다.",
  keywords: [
    "HongLabAI 브랜드 스토리",
    "홍랩에이아이",
    "홍랩AI 철학",
    "홍익인간 AI",
    "AI로 사람을 널리 이롭게",
    "Technology for People",
    "AI for Everyone",
    "AI 엔지니어링",
    "홍은선 대표",
    "LLM 컨설팅",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "브랜드 스토리 & 회사 소개 | HongLabAI",
    description:
      "AI로, 사람을 널리 이롭게. 홍익인간(弘益人間)의 철학으로 작은 불편을 발견하고 실제 작동하는 제품으로 해결하는 홍랩AI의 이야기입니다.",
    url: "/about",
    siteName: "HongLabAI (홍랩에이아이)",
    locale: "ko_KR",
  },
};

const brandIdentityList = [
  { label: "브랜드 미션", value: "AI를 통해 사람의 일상을 더 편리하고 이롭게 만든다." },
  { label: "브랜드 비전", value: "누구나 AI의 혜택을 누릴 수 있는 세상 (Technology for People. AI for Everyone.)" },
  { label: "핵심 철학", value: "홍익인간(弘益人間) — 인간의 가치를 우선하고 일상과 공동체를 이롭게 함" },
  { label: "브랜드 슬로건", value: "AI로, 사람을 널리 이롭게. (아이디어를 작동하는 제품으로.)" },
  { label: "브랜드 약속", value: "작은 불편을 발견하고, 작동하는 기술로 해결한다." },
  { label: "브랜드 성격", value: "인간 중심 · 실용적 · 신뢰성 · 접근성 · 혁신" },
  { label: "핵심 차별점", value: "철학을 구호에 그치지 않고 실제 운영되는 제품 포트폴리오로 증명한다." },
];

const storySteps = [
  {
    num: "01",
    label: "문제 제기",
    headline: "AI는 발전하는데 왜 일상은 여전히 불편할까?",
    desc: "기술은 글을 쓰고 그림을 그리며 복잡한 연산까지 해내지만, 평범한 일상에는 여전히 번거롭고 어려운 순간들이 남아 있습니다.",
  },
  {
    num: "02",
    label: "고객 공감",
    headline: "더 복잡한 기술이 아니라 더 쉬운 일상이 필요하다",
    desc: "사람들이 진짜 필요로 하는 것은 화려한 기술 과시가 아닌, 오늘 하루를 몇 번의 터치만으로도 편안하게 만들어 주는 도구입니다.",
  },
  {
    num: "03",
    label: "해결책 제시",
    headline: "작은 불편을 발견하고, 작동하는 제품으로 해결한다",
    desc: "홍익인간(弘益人間)의 철학으로 현장의 작은 결핍을 관찰하고, 기획부터 개발·배포까지 직접 연결하여 실제 작동하는 소프트웨어로 답합니다.",
  },
  {
    num: "04",
    label: "정체성 변화",
    headline: "기술에 끌려가지 않고 기술로 더 많은 일을 해내는 사람으로",
    desc: "기술에 소외되거나 두려워하지 않고, AI의 든든한 지원을 받으며 자신의 잠재력과 창의성을 마음껏 펼치는 주인공으로 거듭납니다.",
  },
  {
    num: "05",
    label: "행복한 결말",
    headline: "누구나 기술의 혜택을 누리고 자신의 삶에 더 집중하는 세상",
    desc: "모든 사람이 AI 전문가가 될 필요는 없습니다. 누구나 기술의 결실을 누리고 더 가치 있고 행복한 일상에 집중할 수 있는 세상을 만듭니다.",
  },
];

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
    title: "실제 프로덕션 코드 기반 검증",
    description: "단순 개념 설명이나 번역 문서가 아닌, 실제 프로덕션 환경에서 작동 테스트를 마친 안전한 구현 코드와 아키텍처만을 다룹니다.",
  },
  {
    number: "02",
    title: "객관적 벤치마크 및 지표 제시",
    description: "레이턴시, 토큰 소모량, 정확도 지표(Accuracy/Recall) 등 정량적으로 측정 가능한 벤치마크 결과를 투명하게 공유합니다.",
  },
  {
    number: "03",
    title: "재현 가능성(Reproducibility) 보장",
    description: "공유되는 모든 튜토리얼은 표준 오픈소스 라이브러리와 최신 프레임워크 기반으로 다른 엔지니어가 즉시 재현할 수 있도록 단계별로 기술합니다.",
  },
];

export default function AboutPage() {
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
        name: "회사 소개 및 브랜드 스토리",
        item: `${siteUrl}/about`,
      },
    ],
  };

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About HongLabAI · Brand Story & Philosophy",
    description: "HongLabAI 브랜드 스토리, 홍익인간 기술 철학 및 비즈니스 거버넌스",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "HongLabAI",
      url: siteUrl,
      slogan: "AI로, 사람을 널리 이롭게. (Technology for People. AI for Everyone.)",
      founder: {
        "@type": "Person",
        name: "홍은선",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="relative overflow-hidden px-6 pt-36 pb-28">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" />

        <div className="container relative mx-auto max-w-4xl space-y-20">
          {/* Header */}
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
              HONGLAB AI · BRAND STORY &amp; PHILOSOPHY
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 leading-[1.15] tracking-tight">
              AI로, 사람을 널리 이롭게.
              <br />
              <span className="text-lime-700">홍익인간(弘益人間)</span>의 철학을
              <br className="sm:hidden" /> 기술로 실현합니다.
            </h1>
            <p className="mt-4 font-robot text-sm sm:text-base font-semibold text-zinc-500 italic">
              Technology for People. AI for Everyone.
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-700">
              홍랩에이아이(HongLabAI)는 &apos;AI를 화려하게 만드는 회사&apos;가 아니라, &apos;AI로 사람의 삶을 더 이롭게 만드는 회사&apos;입니다.
              단순한 기술의 진보를 넘어, 사람의 일상에 존재하는 작은 결핍과 번거로움을 발견하고 이를 실제 작동하는 소프트웨어 제품으로 해결합니다.
            </p>
          </div>

          {/* Section: Official Brand Story */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-sm space-y-8">
            <div className="border-b border-zinc-100 pb-6">
              <span className="inline-block rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-zinc-950 mb-3">
                Official Brand Narrative
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                기술의 중심에는 언제나 사람이 있습니다
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700">
              <p>
                기술은 하루가 다르게 눈부시게 발전하고 있습니다. 인공지능은 이제 글을 쓰고, 그림을 그리고, 복잡한 비즈니스 로직과 수학적 문제까지 척척 해결합니다.
              </p>

              <div className="rounded-2xl border-l-4 border-accent-strong bg-zinc-50 p-5 sm:p-6 my-6">
                <p className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                  &ldquo;그런데 한 가지 질문이 남습니다. 기술은 이렇게 똑똑해졌는데, 왜 우리의 일상에는 여전히 불편한 순간이 많을까요?&rdquo;
                </p>
              </div>

              <p>
                누군가는 가족·친구들과 즐겁게 파크골프를 즐기면서도 복잡하고 작은 점수판에 기록하는 일조차 번거롭게 느낍니다.
                누군가는 영외 마트에서 더 알뜰하고 합리적인 소비를 하고 싶지만, 흩어진 수많은 상품 정보를 일일이 찾아봐야 합니다.
                또 누군가는 많은 사람들 앞에서 자신의 생각을 당당하게 전하고 싶지만, 무대 앞의 긴장감과 익숙하지 않은 도구 때문에 어려움을 겪습니다.
              </p>

              <p>
                어쩌면 우리가 정말 필요로 하는 것은 더 복잡하고 거창한 기술이 아니라,{" "}
                <strong className="font-bold text-zinc-950">
                  우리의 하루를 조금 더 쉽고 편안하게 만들어 주는 따뜻한 기술
                </strong>
                인지도 모릅니다.
              </p>

              <p>
                홍랩AI는 바로 이 질문을 가장 중요하게 생각합니다. 오래전 우리에게는{" "}
                <strong className="font-bold text-lime-800">&apos;홍익인간(弘益人間)&apos;</strong>이라는 위대한 철학이 있었습니다.
                인간의 가치를 최우선으로 삼고, 인간사회와 공동체를 널리 이롭게 한다는 지혜입니다.
              </p>

              <p>
                홍랩AI는 이 오래된 철학을 인공지능 시대의 새로운 약속으로 이어가고자 합니다.
                AI가 얼마나 뛰어난 기술인지를 과시하는 것보다,{" "}
                <strong className="font-bold text-zinc-950">그 기술로 누구의 불편을 덜어줄 수 있는지</strong>를 먼저 생각합니다.
                어떤 사람에게 소중한 시간을 돌려줄 수 있을지, 어떤 어려움을 해결할 수 있을지, 누군가의 새로운 도전을 어떻게 도울 수 있을지를 끊임없이 묻습니다.
              </p>

              <div className="rounded-2xl bg-paper p-6 border border-zinc-200/80 my-6">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Proof of Philosophy</p>
                <p className="font-semibold text-zinc-950">
                  그리고 홍랩AI는 그 질문에 말이 아닌 <span className="text-lime-700 underline underline-offset-4 decoration-accent-strong">실제 작동하는 제품</span>으로 답합니다.
                </p>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-600">
                  <li>• <strong>가자, 파골!</strong> : 파크골프 점수 기록을 더 간단하게 만들어 경기 자체의 즐거움을 되찾아 드립니다.</li>
                  <li>• <strong>PX 구매 가이드</strong> : 복잡한 국군 복지 상품·할인 정보를 손쉽게 찾아 합리적인 소비를 돕습니다.</li>
                  <li>• <strong>큐노트</strong> : 자신의 호흡에 맞춘 스마트 프롬프터로 누구나 자연스럽게 자신의 생각을 전하도록 돕습니다.</li>
                  <li>• <strong>마이맥</strong> : 소중한 인연들과의 히스토리를 체계적으로 관리하여 신뢰의 자산을 키우도록 돕습니다.</li>
                </ul>
              </div>

              <p>
                서로 다른 서비스지만 지향하는 목표는 하나입니다.{" "}
                <strong className="font-bold text-zinc-950">&ldquo;사람의 작은 불편을 발견하고, 기술로 해결하는 것.&rdquo;</strong>
              </p>

              <p>
                우리는 기술이 사람을 대신하는 차가운 미래보다,{" "}
                <strong className="font-bold text-zinc-950">기술이 사람의 능력과 가능성을 더 크게 확장하는 따뜻한 미래</strong>를 지향합니다.
                기술을 잘 모르는 사람도 필요한 일을 쉽게 해결하고, 반복되는 수작업에 빼앗기던 시간을 되찾고, 나이와 경험에 관계없이 새로운 가능성에 당당히 도전할 수 있는 세상.
              </p>

              <p className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
                &ldquo;우리가 꿈꾸는 미래는 모든 사람이 AI 전문가가 되는 세상이 아닙니다.
                AI 전문가가 아니어도 누구나 기술의 혜택을 온전히 누릴 수 있는 세상입니다.&rdquo;
              </p>
            </div>
          </div>

          {/* Section: Brand Identity Matrix */}
          <div>
            <div className="mb-6">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                Core Identity
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                홍랩AI 브랜드 정체성
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                철학을 구호에 그치지 않고 제품 설계와 서비스 운영의 명확한 판단 기준으로 삼습니다.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xs">
              <div className="divide-y divide-zinc-100">
                {brandIdentityList.map((item) => (
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
          </div>

          {/* Section: 5-Step StoryBrand Process */}
          <div>
            <div className="mb-8">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                Problem &amp; Resolution
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                좋은 브랜드 스토리를 만드는 5단계 법칙
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                고객의 결핍에서 시작하여 기술을 통한 주체적 변화와 행복한 결말로 이어지는 여정입니다.
              </p>
            </div>

            <div className="space-y-4">
              {storySteps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:border-lime-400 transition-colors"
                >
                  <div className="flex items-center gap-3 shrink-0 sm:w-36">
                    <span className="font-mono text-2xl font-black text-lime-700">{step.num}</span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-700">
                      {step.label}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-zinc-950 mb-1">{step.headline}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Research & Technical Domains */}
          <div>
            <div className="mb-6">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-zinc-900">
                Engineering Capabilities
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                주요 핵심 기술 및 연구 분야
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {domains.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed text-zinc-600">
              <div>
                <span className="font-bold text-zinc-900">상호명:</span> 홍랩에이아이 (HongLabAI)
              </div>
              <div>
                <span className="font-bold text-zinc-900">대표자:</span> 홍은선
              </div>
              <div>
                <span className="font-bold text-zinc-900">사업자 등록번호:</span> 571-22-02410
              </div>
              <div>
                <span className="font-bold text-zinc-900">대표 이메일:</span>{" "}
                <a href="mailto:honglabai@gmail.com" className="text-zinc-950 underline hover:text-lime-700">
                  honglabai@gmail.com
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-zinc-900">사업장 주소:</span> 서울특별시 광진구 능동로 120 (화양동) 건국대학교 창의관
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-zinc-900">주요 사업:</span> AI 소프트웨어 개발, 클라우드 아키텍처 컨설팅, 웹·모바일 디지털 제품 기획 및 제작
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-4 text-xs font-semibold text-zinc-500">
              <Link href="/privacy" className="hover:text-zinc-950 underline">개인정보처리방침</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-zinc-950 underline">서비스 이용약관</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-zinc-950 underline">프로젝트 문의</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
