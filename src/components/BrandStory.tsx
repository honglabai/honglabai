import Link from "next/link";

const storySteps = [
  {
    step: "01",
    tag: "문제 제기",
    title: "AI는 발전하는데 왜 일상은 여전히 불편할까?",
    description:
      "기술은 매일 눈부시게 똑똑해지지만, 평범한 사람들의 하루에는 번거로운 기록, 복잡한 정보 탐색, 낯선 디지털 도구로 인한 장벽이 여전히 남아 있습니다.",
  },
  {
    step: "02",
    tag: "고객 공감",
    title: "더 복잡한 기술이 아니라 더 쉬운 일상이 필요하다",
    description:
      "사람들이 진정으로 원하는 것은 거창한 기술 과시가 아닙니다. 오늘 하루의 시간과 에너지를 아껴주고 마음을 편안하게 덜어주는 따뜻하고 직관적인 도구입니다.",
  },
  {
    step: "03",
    tag: "해결책 제시",
    title: "작은 불편을 발견하고, 작동하는 제품으로 해결한다",
    description:
      "홍랩AI는 말이나 구호에 머물지 않습니다. 파크골프 점수 관리부터 국군 복지 상품 가이드, 스마트 발표 도구까지 현장의 결핍을 발견해 실제 작동하는 소프트웨어로 만듭니다.",
  },
  {
    step: "04",
    tag: "정체성 변화",
    title: "기술에 끌려가지 않고 기술로 더 많은 일을 해내는 사람으로",
    description:
      "사용자는 AI를 두려워하거나 소외되지 않고, 자신의 페이스대로 기술을 활용하여 더 창의적이고 가치 있는 일에 집중하는 주체적인 주인공으로 변화합니다.",
  },
  {
    step: "05",
    tag: "행복한 결말",
    title: "누구나 기술의 혜택을 누리고 자신의 삶에 더 집중하는 세상",
    description:
      "AI 전문가가 아니어도, 나이와 배경에 관계없이 누구나 기술의 결실을 편안하게 누리는 세상. 홍랩AI가 꿈꾸고 구현하는 내일의 풍경입니다.",
  },
];

const philosophyApps = [
  {
    emoji: "⛳",
    name: "가자, 파골!",
    tagline: "파크골프 점수 관리 & 편의 서비스",
    desc: "작은 글씨와 복잡한 수기 점수판 대신, 어르신과 동호인 모두가 경기 자체의 즐거움에만 몰입할 수 있도록 돕습니다.",
    href: "https://pagol.zeromorow.chatgpt.site",
  },
  {
    emoji: "🎖️",
    name: "PX 구매 가이드",
    tagline: "합리적인 국군 복지 쇼핑 가이드",
    desc: "수많은 영외/영내 마트 상품과 할인 정보 속에서, 국군 장병과 가족들이 가장 합리적인 소비를 할 수 있도록 안내합니다.",
    href: "https://pxguide.zeromorow.chatgpt.site/",
  },
  {
    emoji: "🎙️",
    name: "큐노트",
    tagline: "스마트 프롬프터 & 스피치 서포터",
    desc: "무대나 카메라 앞의 긴장감을 덜고, 누구나 자신의 호흡과 속도에 맞춰 자연스럽고 당당하게 생각을 표현하도록 돕습니다.",
    href: "https://cuenote.zeromorow.chatgpt.site",
  },
  {
    emoji: "🤝",
    name: "마이맥 (Network CRM)",
    tagline: "인간 중심 개인 네트워크 관리",
    desc: "기계적인 연락처 목록을 넘어, 소중한 인연들과의 히스토리를 잊지 않고 건강한 신뢰 관계로 키워가도록 돕습니다.",
    href: "https://network-crm-theta.vercel.app/",
  },
  {
    emoji: "📅",
    name: "밀리데이 (Miliyday)",
    tagline: "군 복무 맞춤형 디데이 & 스케줄러",
    desc: "국방의 의무를 다하는 청년들과 기다리는 연인·가족의 소중한 시간을 따뜻한 응원과 설렘으로 채워줍니다.",
    href: "https://miliyday.vercel.app/",
  },
];

export default function BrandStory() {
  return (
    <section id="brand-story" className="relative bg-paper py-24 md:py-32 overflow-hidden border-t border-zinc-200/80">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]"
      />

      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <p
            data-reveal
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-300/80 bg-accent/30 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-zinc-900 uppercase backdrop-blur-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
            HONGLAB AI · BRAND STORY &amp; PHILOSOPHY
          </p>

          <h2
            data-reveal
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.2] mb-6"
          >
            AI로, 사람을 널리 이롭게.
            <br />
            <span className="text-lime-700">홍익인간(弘益人間)</span>의 철학을 기술로 실현합니다.
          </h2>

          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal"
          >
            기술의 발전이 곧 인간의 발전은 아닙니다.
            <br className="hidden sm:inline" />
            기술이 사람의 삶을 이롭게 할 때, 비로소 진정한 발전이 됩니다.
          </p>
        </div>

        {/* Central Philosophy Highlight Banner */}
        <div
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          className="relative mx-auto max-w-4xl rounded-3xl border border-zinc-900/10 bg-gradient-to-br from-white via-white to-zinc-50 p-8 sm:p-12 shadow-[0_20px_50px_-20px_rgba(24,24,27,0.08)] mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between border-b border-zinc-100 pb-8 mb-8">
            <div>
              <span className="inline-block rounded-md bg-zinc-950 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-accent uppercase">
                Core Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 mt-2">
                &ldquo;사람의 작은 불편을 발견하고, 작동하는 기술로 해결한다.&rdquo;
              </h3>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <span className="font-robot text-xs font-bold text-zinc-500 uppercase tracking-widest block">
                Brand Slogan
              </span>
              <span className="text-sm font-semibold text-zinc-900 italic">
                Technology for People. AI for Everyone.
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
            홍랩AI는 <strong className="font-bold text-zinc-950">&apos;AI를 화려하게 만드는 회사&apos;</strong>가 아니라,{" "}
            <strong className="font-bold text-zinc-950">&apos;AI로 사람의 삶을 더 이롭게 만드는 회사&apos;</strong>입니다.
            새로운 앱과 시스템을 기획할 때마다 우리는 언제나 하나의 질문을 먼저 던집니다.
            <br className="hidden sm:inline" />
            <span className="mt-2 block font-semibold text-lime-800">
              &ldquo;이 서비스는 누구의 어떤 불편을 덜어주며, 그 사람의 삶을 어떻게 이롭게 하는가?&rdquo;
            </span>
          </p>
        </div>

        {/* StoryBrand 5-Step Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3
              data-reveal
              className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight"
            >
              우리가 문제를 해결하고 가치를 만드는 5단계
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              복잡한 기술의 시대를 살아가는 사람들의 여정에 홍랩AI가 동행하는 방식
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
            {storySteps.map((step, idx) => (
              <div
                key={step.step}
                data-reveal
                style={{ "--reveal-delay": `${idx * 80}ms` } as React.CSSProperties}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-300 group-hover:text-accent-strong transition-colors">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-bold text-zinc-600">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-950 mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Proven By Real Operating Products */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
                Proof of Philosophy
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                철학을 구호에 그치지 않고, 실제 서비스로 증명합니다
              </h3>
            </div>
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-900 hover:text-lime-700 transition-colors"
            >
              전체 포트폴리오 둘러보기
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyApps.map((app, idx) => (
              <a
                key={app.name}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ "--reveal-delay": `${idx * 70}ms` } as React.CSSProperties}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-zinc-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-2xl shadow-inner group-hover:scale-105 transition-transform">
                      {app.emoji}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-zinc-950 transition-colors">
                      서비스 바로가기
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-950 group-hover:text-lime-700 transition-colors">
                    {app.name}
                  </h4>
                  <p className="text-xs font-semibold text-zinc-500 mb-3">
                    {app.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              </a>
            ))}

            {/* Sixth card: Brand Story Hub CTA Card */}
            <div
              data-reveal
              style={{ "--reveal-delay": "350ms" } as React.CSSProperties}
              className="relative flex flex-col justify-between rounded-3xl border border-transparent bg-zinc-950 p-7 text-white shadow-xl"
            >
              <div>
                <span className="inline-block rounded-full bg-accent/20 px-3 py-1 font-mono text-[11px] font-bold text-accent mb-4">
                  Brand Identity
                </span>
                <h4 className="text-xl font-bold mb-2">
                  &ldquo;AI 전문가가 아니어도, 누구나 기술의 혜택을.&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  홍랩AI의 미션, 비전, 핵심 가치와 기술 거버넌스 전모를 공식 브랜드 스토리에서 확인하세요.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-md transition-all hover:bg-accent-strong active:scale-95"
              >
                회사 소개 &amp; 브랜드 스토리 전문 읽기
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
