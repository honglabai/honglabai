"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/apps", label: "앱 포트폴리오" },
  { href: "/#services", label: "서비스" },
  { href: "/ai-board", label: "AI 활용", badge: "게시판" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의하기" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    firstMobileLinkRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav
      aria-label="주요 메뉴"
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "glass border-zinc-900/10 py-3 shadow-[0_12px_30px_-18px_rgba(24,24,27,0.25)]"
          : "border-transparent bg-paper/90 py-4 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 text-2xl font-black tracking-tighter"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950">
            <span className="font-robot text-lg text-accent">H</span>
          </span>
          <span className="font-robot tracking-wide text-zinc-950">
            HongLab<span className="text-zinc-400">AI</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              <span>{item.label}</span>
              {"badge" in item && item.badge ? (
                <span className="rounded bg-zinc-100 border border-zinc-200/80 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg bg-zinc-950 px-4 text-xs font-semibold text-white transition-colors duration-150 hover:bg-zinc-800"
          >
            프로젝트 문의
          </Link>
        </div>

        <button
          type="button"
          ref={menuButtonRef}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-900 transition-colors hover:bg-zinc-900/5 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-navigation"
          className="animate-fade-in-down absolute top-full left-0 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col space-y-2 p-6">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-950"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                {"badge" in item && item.badge ? (
                  <span className="rounded bg-zinc-100 border border-zinc-200/80 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
