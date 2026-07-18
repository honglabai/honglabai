import Link from "next/link";
import { SectionId } from "@/types";

export default function Hero() {
  return (
    <section
      id={SectionId.HERO}
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] animate-pulse rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[600px] w-[600px] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto grid h-full grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center space-y-8 pb-10 text-center lg:order-1 lg:pb-0 lg:text-left">
          <div className="space-y-4">
            <div className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-primary-light">
              AI TECHNOLOGY PARTNER
            </div>
            <h1 className="text-5xl leading-tight font-black text-white lg:text-7xl">
              상상을 뛰어넘는 <br />
              지능형 솔루션
            </h1>
            <p className="font-robot bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-6xl tracking-wider text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] lg:text-8xl">
              HongLabAI
            </p>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-400 lg:mx-0 lg:text-xl">
              HongLabAI는 최첨단 인공지능 기술과 소프트웨어 엔지니어링을 결합하여
              비즈니스 아이디어를 실제 제품으로 만듭니다.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/apps"
              className="rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary-dark"
            >
              앱 포트폴리오 보기
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              무료 상담 신청
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm font-medium text-gray-500 lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Portfolio Ready
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              AI · Web · App
            </div>
          </div>
        </div>

        <div className="relative order-1 flex h-[400px] w-full items-center justify-center lg:order-2 lg:h-[800px] lg:justify-end">
          <div className="h-full w-full transition-opacity duration-1000 ease-in-out lg:absolute lg:right-[-10%] lg:h-[120%] lg:w-[120%]">
            <iframe
              src="https://my.spline.design/nexbotrobotcharacterconcept-rmEPucruDtWTh3PuUUKPteKq/"
              title="HongLabAI 3D robot"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="border-0"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(15,23,42,1)] lg:shadow-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
