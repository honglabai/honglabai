import type { Metadata } from "next";

export const metadata: Metadata = { title: "홈페이지 관리" };

export default function AdminHomePage() {
  return (
    <div>
      <p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">Homepage Content</p>
      <h1 className="mb-4 text-3xl font-black">홈페이지 관리</h1>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="mb-3 text-xl font-bold">추천 앱 자동 반영</h2>
        <p className="max-w-2xl leading-relaxed text-slate-400">앱 관리에서 ‘추천 앱’과 ‘게시’를 선택하면 홈페이지 추천 포트폴리오 영역에 노출 순서대로 자동 반영됩니다. 히어로 문구 편집과 버전 관리는 다음 콘텐츠 관리 단계에서 확장합니다.</p>
      </div>
    </div>
  );
}
