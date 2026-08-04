import Link from "next/link";
import HeroAppShowcase from "@/components/HeroAppShowcase";
import type { AppRecord } from "@/domain/apps/types";
import { SectionId } from "@/types";

type HeroProps = {
  featuredApps: AppRecord[];
};

export default function Hero({ featuredApps }: HeroProps) {
  return (
    <section
      id={SectionId.HERO}
      className="relative flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden py-20 pt-28 lg:py-20 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] motion-safe:animate-pulse" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[600px] w-[600px] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="order-1 flex flex-col justify-center text-center lg:text-left">
          <div>
            <p className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-primary-light uppercase sm:text-sm">
              AI · Web · App Product Studio
            </p>
            <p className="font-robot mb-4 text-sm tracking-[0.24em] text-slate-400 uppercase">
              HongLabAI
            </p>
            <h1 className="break-keep text-balance text-4xl leading-[1.15] font-black text-white sm:text-5xl lg:max-w-3xl lg:text-6xl 2xl:text-7xl">
              아이디어를 실제로 사용하는 앱으로 만듭니다.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              AI, 웹, 모바일 제품을 기획부터 개발, 출시와 운영까지 연결합니다.
              기술 시연에 그치지 않고 사용자가 계속 찾는 제품을 만듭니다.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/apps"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-7 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark sm:text-lg"
            >
              만든 앱 둘러보기
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 sm:text-lg"
            >
              앱 제작 문의하기
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-400 lg:justify-start">
            <li className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2">
              기획부터 출시·운영까지
            </li>
            <li className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2">
              AI · iOS · Android · Web
            </li>
          </ul>
        </div>

        <div className="relative order-2 mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <HeroAppShowcase apps={featuredApps} />
        </div>
      </div>
    </section>
  );
}
