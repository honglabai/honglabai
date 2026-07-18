"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = { error: "" };

export default function LoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-300">
          관리자 이메일
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={!configured || pending}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-300">
          비밀번호
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={8}
          required
          disabled={!configured || pending}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary disabled:opacity-50"
        />
      </div>
      {state.error ? (
        <p aria-live="polite" className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {state.error}
        </p>
      ) : null}
      {!configured ? (
        <p className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm leading-relaxed text-amber-100">
          먼저 Supabase 프로젝트 URL과 publishable key를 환경 변수에 연결해 주세요.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!configured || pending}
        className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "확인 중..." : "관리자 로그인"}
      </button>
    </form>
  );
}
