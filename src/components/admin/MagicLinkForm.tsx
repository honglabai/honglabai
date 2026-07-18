"use client";

import { useActionState } from "react";
import { requestMagicLinkAction, type MagicLinkState } from "@/app/admin/login/actions";

const initialState: MagicLinkState = { error: "", message: "" };

export default function MagicLinkForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(requestMagicLinkAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <label htmlFor="magic-link-email" className="block text-sm font-medium text-slate-300">
        이메일로 일회용 링크 받기
        <input
          id="magic-link-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={!configured || pending}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary disabled:opacity-50"
        />
      </label>
      {state.error ? <p aria-live="polite" className="text-sm text-red-300">{state.error}</p> : null}
      {state.message ? <p aria-live="polite" className="text-sm text-emerald-300">{state.message}</p> : null}
      <button type="submit" disabled={!configured || pending} className="w-full rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-100 transition hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50">
        {pending ? "전송 중..." : "로그인 링크 보내기"}
      </button>
    </form>
  );
}
