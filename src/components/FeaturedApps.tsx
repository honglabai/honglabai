import Link from "next/link";
import AppCard from "@/components/AppCard";
import type { AppRecord } from "@/domain/apps/types";

type FeaturedAppsProps = {
  apps: AppRecord[];
};

export default function FeaturedApps({ apps }: FeaturedAppsProps) {
  if (apps.length === 0) return null;

  return (
    <section className="relative bg-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><p className="mb-3 text-sm font-bold tracking-widest text-secondary uppercase">Featured Portfolio</p><h2 className="text-3xl font-black text-white md:text-5xl">운영 중인 앱</h2></div>
          <Link href="/apps" className="text-sm font-bold text-primary-light hover:text-white">전체 포트폴리오 보기 →</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-[repeat(2,minmax(0,22rem))] sm:justify-center xl:grid-cols-[repeat(3,minmax(0,22rem))]">{apps.map((app) => <AppCard key={app.id} app={app} />)}</div>
      </div>
    </section>
  );
}
