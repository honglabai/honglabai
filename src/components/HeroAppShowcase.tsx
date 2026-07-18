"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroBrandFallback from "@/components/HeroBrandFallback";
import { productLabels, type AppRecord } from "@/domain/apps/types";

type HeroAppShowcaseProps = {
  apps: AppRecord[];
};

export default function HeroAppShowcase({ apps }: HeroAppShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safeIndex = apps.length > 0 ? Math.min(activeIndex, apps.length - 1) : 0;
  const app = apps[safeIndex] ?? null;

  useEffect(() => {
    if (apps.length < 2 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % apps.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [apps.length, isPaused]);

  useEffect(() => {
    if (apps.length < 2) return;

    const nextImageUrl = apps[(safeIndex + 1) % apps.length]?.hero_image_url;
    if (!nextImageUrl) return;

    const preloadImage = new window.Image();
    preloadImage.src = nextImageUrl;
  }, [apps, safeIndex]);

  if (!app) return <HeroBrandFallback />;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-cyan-400/5 to-secondary/20 blur-2xl" aria-hidden="true" />
      <Link
        href={`/apps/${app.slug}`}
        aria-label={`${app.name} 포트폴리오 자세히 보기`}
        className="group relative block overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/75 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-2 px-2 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-auto font-mono text-[10px] tracking-widest text-slate-500 uppercase">Featured product</span>
        </div>

        <div className="relative h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/25 via-slate-900 to-secondary/25 sm:h-[360px] lg:h-[430px]" aria-live="polite">
          {app.hero_image_url ? (
            <Image
              src={app.hero_image_url}
              alt={app.image_alt || `${app.name} 앱 화면`}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <div>
                <span className="font-robot text-7xl font-black text-white/90 sm:text-9xl">{app.name.slice(0, 1)}</span>
                <p className="mt-5 text-sm tracking-[0.22em] text-primary-light uppercase">{app.category}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />
        </div>

        <div className="flex items-end justify-between gap-5 px-2 pt-5 pb-2 sm:px-3 sm:pt-6">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary-light">{productLabels[app.product_status]}</span>
              <span className="text-slate-500">{app.platforms.join(" · ")}</span>
            </div>
            <h2 className="truncate text-2xl font-black text-white sm:text-3xl">{app.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400 sm:text-base">{app.tagline}</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition group-hover:border-primary group-hover:bg-primary" aria-hidden="true">↗</span>
        </div>
      </Link>
      {apps.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2" aria-label="히어로 포트폴리오 선택">
          {apps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${item.name} 표시`}
              aria-current={index === safeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${index === safeIndex ? "w-8 bg-primary" : "w-2 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
