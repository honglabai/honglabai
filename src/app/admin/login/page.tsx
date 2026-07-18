import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import MagicLinkForm from "@/components/admin/MagicLinkForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAuthenticatedAdmin } from "@/server/auth";

export const metadata: Metadata = { title: "로그인" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAuthenticatedAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30">
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-primary-light uppercase">HongLabAI Admin</p>
        <h1 className="mb-3 text-3xl font-black">관리자 로그인</h1>
        <p className="mb-8 text-sm leading-relaxed text-slate-400">가입 화면은 공개하지 않습니다. Supabase Auth에 생성되고 관리자 테이블에 승인된 계정만 접근할 수 있습니다.</p>
        <LoginForm configured={isSupabaseConfigured()} />
        <div className="my-7 flex items-center gap-3 text-xs text-slate-600"><span className="h-px flex-1 bg-white/10" /><span>또는</span><span className="h-px flex-1 bg-white/10" /></div>
        <MagicLinkForm configured={isSupabaseConfigured()} />
      </div>
    </main>
  );
}
