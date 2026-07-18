"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/apps", label: "앱 포트폴리오" },
  { href: "/#services", label: "서비스" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의하기" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="주요 메뉴"
      className={`fixed top-0 left-0 z-50 w-full border-b border-white/5 transition-all duration-300 ${
        isScrolled
          ? "glass py-3 shadow-lg shadow-blue-900/20"
          : "bg-dark/90 py-4 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tighter"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/30">
            <span className="font-robot text-lg text-white">H</span>
          </span>
          <span className="font-robot tracking-wide text-white">
            HongLab<span className="text-primary-light">AI</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-gray-300 transition-colors hover:text-primary-light"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-primary to-primary-dark px-5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            프로젝트 시작
          </Link>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
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
          className="animate-fade-in-down absolute top-full left-0 w-full border-b border-gray-800 bg-dark/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col space-y-2 p-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
