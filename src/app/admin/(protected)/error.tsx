"use client";

import Link from "next/link";
import { useEffect } from "react";

// Admin-scoped boundary: renders inside the protected layout so the operator
// keeps the nav and can retry without losing their session context.
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Admin route error", error);
  }, [error]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <h1 className="mb-3 text-2xl font-black text-white">관리자 화면을 불러오지 못했습니다</h1>
      <p className="mb-6 text-sm text-slate-400">일시적인 오류일 수 있습니다. 다시 시도하거나 대시보드로 이동해 주세요.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          다시 시도
        </button>
        <Link
          href="/admin"
          className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-300 transition-colors hover:border-primary/50 hover:text-white"
        >
          대시보드로 이동
        </Link>
      </div>
      {error.digest ? <p className="mt-6 text-xs text-slate-600">오류 코드: {error.digest}</p> : null}
    </section>
  );
}
