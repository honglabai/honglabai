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
      <div className="relative z-10 container mx-auto px-6">
        <div data-reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              실무 운영 제품군
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl">운영 중인 앱 포트폴리오</h2>
          </div>
          <Link
            href="/apps"
            className="inline-flex items-center text-xs font-semibold text-zinc-700 transition-colors hover:text-zinc-950"
          >
            전체 포트폴리오 확인하기 →
          </Link>
        </div>

        {hasCarousel ? (
          <div data-reveal className="space-y-6">
            {/* Carousel Row: Prev Button <, Cards Track, Next Button > */}
            <div className="relative flex items-center gap-2 sm:gap-4 md:gap-5">
              {/* Previous '<' Button */}
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                aria-label="이전 앱 보기"
                title={canScrollPrev ? "이전 앱 보기" : "마지막 앱으로 이동"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors duration-150 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950 sm:h-11 sm:w-11"
              >
                <svg
                  className="h-5 w-5 stroke-[2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Single-Row Scrollable Cards Track */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

              {/* Next '>' Button */}
              <button
                type="button"
                onClick={() => handleScroll("next")}
                aria-label="다음 앱 보기"
                title={canScrollNext ? "다음 앱 보기" : "첫 번째 앱으로 이동"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors duration-150 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950 sm:h-11 sm:w-11"
              >
                <svg
                  className="h-5 w-5 stroke-[2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {apps.map((app, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => scrollToCard(index)}
                    aria-label={`${index + 1}번째 앱: ${app.name} 보기`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      isActive ? "w-5 bg-zinc-900" : "w-1.5 bg-zinc-200 hover:bg-zinc-300"
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
