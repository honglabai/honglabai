import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";
import { requireAdmin } from "@/server/auth";

export const dynamic = "force-dynamic";

const navigation = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/home", label: "홈페이지" },
  { href: "/admin/apps", label: "앱 관리" },
  { href: "/admin/inquiries", label: "문의" },
];

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { admin } = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-robot text-lg font-bold">HongLab<span className="text-primary-light">AI</span></Link>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary-light">{admin.role.toUpperCase()}</span>
          </div>
          <nav aria-label="관리자 메뉴" className="flex flex-wrap items-center gap-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">{item.label}</Link>
            ))}
            <Link href="/" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-primary/50 hover:text-white">공개 사이트 ↗</Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">로그아웃</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
