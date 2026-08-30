"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // ponytail: console until an error tracker is wired (see plan P1-5).
    console.error("Unhandled route error", error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-paper px-6 text-center text-zinc-950">
      <div>
        <p className="mb-3 font-robot text-sm tracking-[0.3em] text-zinc-500">ERROR</p>
        <h1 className="mb-4 text-4xl font-black">문제가 발생했습니다</h1>
        <p className="mb-8 text-zinc-500">일시적인 오류일 수 있습니다. 다시 시도해 주세요.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex rounded-lg bg-accent px-6 py-3 font-bold transition-colors hover:bg-accent-strong"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-zinc-200 px-6 py-3 font-bold text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950"
          >
            홈페이지로 이동
          </Link>
        </div>
        {error.digest ? <p className="mt-6 text-xs text-zinc-500">오류 코드: {error.digest}</p> : null}
      </div>
    </main>
  );
}
