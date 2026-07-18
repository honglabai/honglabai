import type { Metadata } from "next";
import Link from "next/link";
import { archiveAppAction } from "@/app/admin/(protected)/apps/actions";
import { publicationLabels, productLabels } from "@/domain/apps/types";
import { canEdit, canPublish, requireAdmin } from "@/server/auth";
import { listAdminApps } from "@/server/apps";

export const metadata: Metadata = { title: "앱 관리" };

type PageProps = { searchParams: Promise<{ message?: string; error?: string }> };

export default async function AdminAppsPage({ searchParams }: PageProps) {
  const { admin } = await requireAdmin();
  const [apps, params] = await Promise.all([listAdminApps(), searchParams]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">Portfolio Management</p><h1 className="text-3xl font-black">앱 관리</h1></div>
        {canEdit(admin.role) ? <Link href="/admin/apps/new" className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white transition hover:bg-primary-dark">새 앱 작성</Link> : null}
      </div>
      {params.message ? <p className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">{params.message}</p> : null}
      {params.error ? <p className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-100">{params.error}</p> : null}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {apps.length === 0 ? (
          <div className="px-6 py-16 text-center"><p className="mb-2 text-lg font-bold">등록된 앱이 없습니다</p><p className="text-sm text-slate-500">첫 앱을 초안으로 작성해 보세요.</p></div>
        ) : (
          <div className="divide-y divide-white/10">
            {apps.map((app) => (
              <article key={app.id} className="grid gap-4 px-6 py-5 md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
                <div><h2 className="font-bold text-white">{app.name}</h2><p className="mt-1 text-sm text-slate-500">/apps/{app.slug}</p></div>
                <span className="text-sm text-slate-300">{productLabels[app.product_status]}</span>
                <span className="text-sm text-slate-300">{publicationLabels[app.publication_status]}</span>
                <div className="flex items-center gap-2">
                  {canEdit(admin.role) ? <Link href={`/admin/apps/${app.id}/edit`} className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-primary/50">편집</Link> : null}
                  {canPublish(admin.role) ? <form action={archiveAppAction}><input type="hidden" name="app_id" value={app.id} /><button type="submit" className="rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-400/10">보관</button></form> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
