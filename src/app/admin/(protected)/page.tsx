import Link from "next/link";
import { requireAdmin } from "@/server/auth";

export default async function AdminDashboardPage() {
  const { supabase, admin } = await requireAdmin();
  const [{ count: publishedCount }, { count: draftCount }, { count: inquiryCount }] = await Promise.all([
    supabase.from("apps").select("id", { count: "exact", head: true }).eq("publication_status", "published").is("deleted_at", null),
    supabase.from("apps").select("id", { count: "exact", head: true }).in("publication_status", ["draft", "in_review"]).is("deleted_at", null),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const stats = [
    ["게시 중인 앱", publishedCount ?? 0, "/admin/apps"],
    ["작성·검토 중", draftCount ?? 0, "/admin/apps"],
    ["새 문의", inquiryCount ?? 0, "/admin/inquiries"],
  ] as const;

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">Admin Dashboard</p>
        <h1 className="mb-3 text-3xl font-black md:text-4xl">안녕하세요, {admin.name || admin.email}</h1>
        <p className="max-w-2xl text-slate-400">앱 게시 현황과 새 문의를 확인하고 포트폴리오 콘텐츠를 관리할 수 있습니다.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={href} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/40 hover:bg-white/[0.06]">
            <p className="mb-4 text-sm text-slate-400">{label}</p>
            <p className="font-robot text-4xl font-bold text-white">{value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
