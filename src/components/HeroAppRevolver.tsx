"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { productLabels, type AppRecord } from "@/domain/apps/types";

type HeroAppRevolverProps = {
  apps: AppRecord[];
};

export default function HeroAppRevolver({ apps }: HeroAppRevolverProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate horizontally every 3.5 seconds
  useEffect(() => {
    if (isPaused || !apps.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % apps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, apps.length]);

  if (!apps || apps.length === 0) return null;

  const count = apps.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  return (
    <div
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="HongLabAI 출시 앱 3D 캐러셀"
    >
      {/* Top Floating Badge */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 shadow-[0_8px_20px_-6px_rgba(24,24,27,0.12)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
        </span>
        <span className="text-xs font-bold text-zinc-900">실시간 서비스 중</span>
        <span className="text-[10px] font-medium text-zinc-400">· 클릭 시 새 창 열림</span>
      </div>

      {/* 3D Rotating Cards Stage (Actual Portfolio Cards) */}
      <div
        className="relative flex h-[490px] w-[280px] xl:h-[520px] xl:w-[310px] items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {apps.map((app, index) => {
            const offset = (index - activeIndex + count) % count;
            const isFront = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === count - 1;
            const isBack = !isFront && !isRight && !isLeft;

            // 3D Horizontal Rotation Transform Calculation
            let transform = "";
            let opacity = 0;
            let zIndex = 10;
            let boxShadow = "0 10px 25px -5px rgba(24,24,27,0.1)";
            let pointerEvents: "auto" | "none" = "none";

            if (isFront) {
              transform = "translate3d(0px, 0px, 50px) rotateY(0deg) scale(1)";
              opacity = 1;
              zIndex = 30;
              boxShadow = "0 25px 50px -12px rgba(24,24,27,0.22)";
              pointerEvents = "auto";
            } else if (isRight) {
              transform = "translate3d(75px, 0px, -50px) rotateY(-32deg) scale(0.88)";
              opacity = 0.78;
              zIndex = 20;
              boxShadow = "0 15px 30px -10px rgba(24,24,27,0.15)";
              pointerEvents = "auto";
            } else if (isLeft) {
              transform = "translate3d(-75px, 0px, -50px) rotateY(32deg) scale(0.88)";
              opacity = 0.78;
              zIndex = 20;
              boxShadow = "0 15px 30px -10px rgba(24,24,27,0.15)";
              pointerEvents = "auto";
            } else if (isBack) {
              transform = "translate3d(0px, 0px, -130px) rotateY(180deg) scale(0.72)";
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            const targetUrl = app.web_url || `/apps/${app.slug}`;

            return (
              <div
                key={app.id}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1)]"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  boxShadow,
                  pointerEvents,
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    // If not front card, clicking it first rotates it to the front
                    if (!isFront) {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200/90 bg-white transition hover:border-lime-500"
                  title={`${app.name} 바로가기 (새 창에서 열기)`}
                >
                  {/* Top Image: Full 3:4 Aspect Ratio (Actual Portfolio Layout) */}
                  <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gradient-to-tr from-zinc-100 to-zinc-200">
                    {app.hero_image_url ? (
                      <Image
                        src={app.hero_image_url}
                        alt={app.image_alt || app.name}
                        fill
                        unoptimized={true}
                        priority={isFront || isRight || isLeft}
                        sizes="(max-width: 1200px) 100vw, 640px"
                        className="object-cover object-top transition duration-500 group-hover:scale-105"
                        style={{ imageRendering: "-webkit-optimize-contrast" }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-robot text-4xl font-bold text-zinc-300">
                        {app.name.slice(0, 1)}
                      </div>
                    )}

                    {/* Gradient shading overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3 rounded-full bg-zinc-950/75 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      {app.category}
                    </div>

                    {/* New Tab Action Pill */}
                    <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-zinc-950 shadow-md transition group-hover:scale-110">
                      <span className="text-xs font-black">↗</span>
                    </div>
                  </div>

                  {/* Card Body: Identical to Actual Portfolio AppCard */}
                  <div className="flex flex-1 flex-col justify-between p-4 xl:p-5 bg-white">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-lime-200 px-2.5 py-0.5 text-xs font-bold text-zinc-900">
                          {productLabels[app.product_status] || "운영 중"}
                        </span>
                        <span className="text-xs text-zinc-500">{app.platforms.join(" · ")}</span>
                      </div>
                      <h3 className="line-clamp-1 text-lg xl:text-xl font-bold text-zinc-950 transition-colors group-hover:text-lime-700">
                        {app.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-600">
                        {app.tagline || app.summary}
                      </p>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5">
                      <span className="text-[11px] font-medium text-zinc-400">새 창에서 실행</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-zinc-950 transition group-hover:bg-accent group-hover:shadow-sm">
                        접속하기 →
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation & Pagination Controls */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="이전 앱 보기"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-sm font-bold text-zinc-700 shadow-sm backdrop-blur-sm transition hover:border-zinc-950 hover:bg-white active:scale-95"
        >
          ‹
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5 px-1">
          {apps.map((app, idx) => (
            <button
              key={app.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`${app.name} 카드 선택`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-accent-strong"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="다음 앱 보기"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-sm font-bold text-zinc-700 shadow-sm backdrop-blur-sm transition hover:border-zinc-950 hover:bg-white active:scale-95"
        >
          ›
        </button>
      </div>
    </div>
  );
}
