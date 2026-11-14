"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppCard from "@/components/AppCard";
import type { AppRecord } from "@/domain/apps/types";

type FeaturedAppsProps = {
  apps: AppRecord[];
};

export default function FeaturedApps({ apps }: FeaturedAppsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const hasCarousel = apps.length > 4;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 6);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 6);

    // Identify which card is closest to the left edge of the visible track
    const items = el.querySelectorAll<HTMLElement>("[data-carousel-item]");
    if (items.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      items.forEach((item, idx) => {
        const diff = Math.abs(item.offsetLeft - el.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setCurrentIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    if (!hasCarousel) return;
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const raf = requestAnimationFrame(updateScrollState);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [hasCarousel, updateScrollState, apps.length]);

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-carousel-item]");
    if (items[index]) {
      const targetLeft = items[index].offsetLeft - el.offsetLeft;
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  };

  const handleScroll = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-carousel-item]");
    if (items.length < 2) return;

    const step = items[1].offsetLeft - items[0].offsetLeft;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    const isAtStart = el.scrollLeft <= 6;

    if (direction === "next") {
      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      if (isAtStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -step, behavior: "smooth" });
      }
    }
  };

  if (apps.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div aria-hidden="true" className="grain absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div data-reveal className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-widest text-zinc-500 uppercase">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
              추천 포트폴리오
            </p>
            <h2 className="text-3xl font-black text-zinc-950 md:text-5xl">운영 중인 앱</h2>
          </div>
          <Link
            href="/apps"
            className="inline-flex min-h-11 items-center text-sm font-bold text-zinc-900 underline decoration-accent-strong decoration-2 underline-offset-4 hover:decoration-zinc-950"
          >
            전체 포트폴리오 보기 →
          </Link>
        </div>

        {hasCarousel ? (
          <div data-reveal className="space-y-6">
            {/* Carousel Container with Overlaid Arrow Navigation */}
            <div className="group/carousel relative">
              {/* Previous '<' Button (Overlaid on mobile & desktop) */}
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                aria-label="이전 앱 보기"
                title={canScrollPrev ? "이전 앱 보기" : "마지막 앱으로 이동"}
                className="group/btn absolute left-2 sm:left-3 md:-left-4 lg:-left-5 top-[38%] z-20 -translate-y-1/2 flex h-8 w-8 sm:h-11 sm:w-11 md:h-13 md:w-13 items-center justify-center rounded-full border border-zinc-200/90 bg-white/90 sm:bg-white/95 text-zinc-900 shadow-[0_8px_20px_-6px_rgba(24,24,27,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white active:scale-90"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] transition-transform duration-200 group-hover/btn:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Single-Row Scrollable Cards Track - FULL WIDTH */}
              <div
                ref={scrollRef}
                className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex gap-4 sm:gap-6">
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      data-carousel-item
                      className="h-full w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                    >
                      <AppCard app={app} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next '>' Button (Overlaid on mobile & desktop) */}
              <button
                type="button"
                onClick={() => handleScroll("next")}
                aria-label="다음 앱 보기"
                title={canScrollNext ? "다음 앱 보기" : "첫 번째 앱으로 이동"}
                className="group/btn absolute right-2 sm:right-3 md:-right-4 lg:-right-5 top-[38%] z-20 -translate-y-1/2 flex h-8 w-8 sm:h-11 sm:w-11 md:h-13 md:w-13 items-center justify-center rounded-full border border-zinc-200/90 bg-white/90 sm:bg-white/95 text-zinc-900 shadow-[0_8px_20px_-6px_rgba(24,24,27,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white active:scale-90"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {apps.map((app, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => scrollToCard(index)}
                    aria-label={`${index + 1}번째 앱: ${app.name} 보기`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive ? "w-7 bg-zinc-950" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((app, index) => (
              <div
                key={app.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="h-full"
              >
                <AppCard app={app} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
