import type { Metadata } from "next";
import AppCard from "@/components/AppCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublishedApps } from "@/server/apps";

export const metadata: Metadata = {
  title: "앱 포트폴리오",
  description: "HongLabAI가 기획하고 개발한 앱과 디지털 제품을 소개합니다.",
  alternates: { canonical: "/apps" },
};

export const revalidate = 60;

export default async function AppsPage() {
  const apps = await getPublishedApps();

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="relative overflow-hidden px-6 pt-36 pb-24">
        <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="container relative mx-auto">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.24em] text-zinc-500 uppercase">App Portfolio</p>
            <h1 className="mb-6 text-4xl font-black md:text-6xl">만들고 운영하는 앱을 한곳에서</h1>
            <p className="text-lg leading-relaxed text-zinc-500">HongLabAI가 기획하고 개발해 공개한 앱과 디지털 제품을 소개합니다.</p>
          </div>

          {apps.length ? (
            <section className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{apps.map((app) => <AppCard key={app.id} app={app} />)}</section>
          ) : (
            <section className="mx-auto max-w-4xl rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center md:p-16">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl text-zinc-400" aria-hidden="true">◫</div>
              <h2 className="mb-3 text-2xl font-bold">게시된 앱이 아직 없습니다</h2>
              <p className="mx-auto max-w-xl leading-relaxed text-zinc-500">관리자에서 앱을 작성하고 게시하면 이곳에 자동으로 표시됩니다.</p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
