import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "소개",
  description: "HongLabAI가 제품을 설계하고 개발하는 원칙을 소개합니다.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["문제부터 정의", "기술을 선택하기 전에 사용자와 비즈니스가 해결해야 할 문제를 먼저 정리합니다."],
  ["작게 검증", "핵심 흐름을 빠르게 구현하고 실제 피드백을 반영하며 제품을 확장합니다."],
  ["운영까지 설계", "출시뿐 아니라 보안, 성능, 데이터, 유지보수까지 제품의 일부로 다룹니다."],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="px-6 pt-36 pb-24">
        <div className="container mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-bold tracking-[0.24em] text-zinc-500 uppercase">About HongLabAI</p>
          <h1 className="mb-8 max-w-3xl text-4xl leading-tight font-black md:text-6xl">아이디어가 실제로 작동하는 제품이 될 때까지</h1>
          <p className="mb-14 max-w-3xl text-lg leading-relaxed text-zinc-500">
            HongLabAI는 AI 기술과 소프트웨어 엔지니어링을 결합해 검증 가능한 디지털 제품을 만듭니다.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-zinc-200 bg-white p-7">
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
