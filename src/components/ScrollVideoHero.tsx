"use client";

import { useEffect, useRef, useState } from "react";
import HeroAppRevolver from "@/components/HeroAppRevolver";
import type { AppRecord } from "@/domain/apps/types";

type ScrollVideoHeroProps = {
  src: string;
  poster: string;
  eyebrow: string;
  headline: React.ReactNode;
  description: string;
  children?: React.ReactNode;
  apps?: AppRecord[];
};

// Scroll-driven video: the section is taller than the viewport, the video is
// pinned inside it, and scroll progress through the section maps to
// currentTime. The video never auto-plays — the user's scroll is the transport.
//
// ponytail: seeking is driven from rAF rather than the scroll event so we set
// currentTime at most once per frame. Without that, fast trackpad scrolling
// queues dozens of seeks and the decoder falls behind.
export default function ScrollVideoHero({
  src,
  poster,
  eyebrow,
  headline,
  description,
  children,
  apps,
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Respect reduced-motion: leave the poster frame, skip the scroll binding.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let duration = 0;
    let frame = 0;
    let last = -1;

    const onLoaded = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      setIsReady(true);
    };

    const sync = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0 || duration <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const target = progress * duration;

      // Skip sub-frame deltas and never stack seeks — Safari stalls if a new
      // seek begins while one is in flight.
      if (Math.abs(target - last) < 0.02 || video.seeking) return;
      last = target;
      video.currentTime = target;
    };

    // Coalesce bursts of scroll events into one seek per frame, but fall back to
    // seeking immediately when rAF is unavailable (background tabs pause it).
    const schedule = () => {
      if (frame) return;
      if (typeof requestAnimationFrame === "function" && !document.hidden) {
        frame = requestAnimationFrame(sync);
      } else {
        sync();
      }
    };

    // The body carries `overflow-x: hidden`, which makes it the scrolling box —
    // its scroll events never reach `window`. Listening on document (capture)
    // catches the event wherever it originates, so this works regardless of
    // which element ends up scrolling.
    document.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    sync();

    // Fetch the rest of the clip once the browser is idle. Scrubbing needs the
    // frames, but not before the page has painted.
    const warm = () => {
      video.preload = "auto";
      video.load();
    };
    const canIdle = typeof window.requestIdleCallback === "function";
    const idle = canIdle
      ? window.requestIdleCallback(warm, { timeout: 3000 })
      : window.setTimeout(warm, 1500);

    return () => {
      document.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      video.removeEventListener("loadedmetadata", onLoaded);
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[280svh] bg-paper">
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        {/* Full-bleed video. Kept at full opacity — the earlier 45% wash was
            too dim to read. Legibility comes from a scrim placed only behind
            the copy instead of dimming the whole frame.

            preload is "metadata" so the 1MB clip does not compete with first
            paint; the effect below upgrades it once the page is idle, which
            keeps scrubbing smooth without delaying LCP. */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Copy-side scrim. Multi-stop and eased: a two-stop gradient reaching
            transparent early leaves a visible vertical seam down the middle of
            the frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgb(247 248 251 / 0.96) 0%, rgb(247 248 251 / 0.88) 18%, rgb(247 248 251 / 0.62) 38%, rgb(247 248 251 / 0.3) 58%, rgb(247 248 251 / 0.1) 76%, rgb(247 248 251 / 0) 92%)",
          }}
        />
        {/* The horizontal scrim only darkens the left side, which is enough on
            wide screens but leaves the copy sitting on bright frames once the
            layout narrows. Add a flat veil below lg. */}
        <div aria-hidden="true" className="absolute inset-0 bg-white/55 lg:hidden" />

        {/* Top and bottom falloff so the nav and the next section meet the
            video without a hard seam. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-paper via-paper/40 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-paper via-paper/50 to-transparent" />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 xl:gap-12">
            <div className="max-w-xl">
              <p
                className="font-robot mb-5 inline-flex items-center gap-2 text-xs tracking-[0.28em] text-zinc-500 uppercase sm:text-sm"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
                {eyebrow}
              </p>
              <h1
                className="text-4xl leading-[1.12] font-black tracking-tight text-zinc-950 drop-shadow-[0_1px_10px_rgba(255,255,255,0.85)] sm:text-5xl lg:text-6xl"
              >
                {headline}
              </h1>
              <p
                className="mt-6 text-base leading-relaxed text-zinc-700 drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)] sm:text-lg"
              >
                {description}
              </p>
              <div
                className="mt-9 flex flex-col gap-4 sm:flex-row"
              >
                {children}
              </div>
            </div>

            {/* Right section: 3D Horizontal Rotating App Deck (User specified area) */}
            {apps && apps.length > 0 && (
              <div className="hidden lg:flex flex-col items-center justify-center w-[280px] xl:w-[320px] shrink-0 pt-2">
                <HeroAppRevolver apps={apps} />
              </div>
            )}
          </div>
        </div>

        {/* Scroll affordance — the section only makes sense if you scroll.
            Hidden on short viewports, where it lands on top of the copy. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 transition-opacity duration-700 [@media(min-height:760px)]:flex ${isReady ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[11px] tracking-[0.3em] text-zinc-500 uppercase">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-zinc-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
