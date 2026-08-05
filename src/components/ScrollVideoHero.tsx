"use client";

import { useEffect, useRef, useState } from "react";

type ScrollVideoHeroProps = {
  src: string;
  poster: string;
  eyebrow: string;
  headline: React.ReactNode;
  description: string;
  children?: React.ReactNode;
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

    return () => {
      document.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      video.removeEventListener("loadedmetadata", onLoaded);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[280svh] bg-dark">
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />

        {/* Legibility scrim. Darkest where the copy sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark to-transparent" />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl">
            <p
              data-reveal
              className="font-robot mb-5 text-xs tracking-[0.28em] text-primary-light uppercase sm:text-sm"
            >
              {eyebrow}
            </p>
            <h1
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="text-4xl leading-[1.12] font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {headline}
            </h1>
            <p
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {description}
            </p>
            <div
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              {children}
            </div>
          </div>
        </div>

        {/* Scroll affordance — the section only makes sense if you scroll. */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[11px] tracking-[0.3em] text-slate-400 uppercase">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
