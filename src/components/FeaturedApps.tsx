import Link from "next/link";
import AppCard from "@/components/AppCard";
import type { AppRecord } from "@/domain/apps/types";

type FeaturedAppsProps = {
  apps: AppRecord[];
};

export default function FeaturedApps({ apps }: FeaturedAppsProps) {
  if (apps.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div aria-hidden="true" className="grain absolute inset-0" />
      <div className="relative z-10 container mx-auto px-6">
        <div data-reveal className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><p className="mb-3 text-sm font-bold tracking-widest text-secondary-light uppercase">추천 포트폴리오</p><h2 className="text-3xl font-black text-white md:text-5xl">운영 중인 앱</h2></div>
          <Link href="/apps" className="inline-flex min-h-11 items-center text-sm font-bold text-primary-light hover:text-white">전체 포트폴리오 보기 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, index) => (
            <div
              key={app.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              className="h-full"
            >
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
