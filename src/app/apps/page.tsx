import type { Metadata } from "next";
import AppCard from "@/components/AppCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublishedApps } from "@/server/apps";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "앱 포트폴리오 | 자체 개발 및 운영 AI·모바일 앱",
  description:
    "쿠폰즈, 한국어 십자말풀이, 마이러브 스도쿠, MBTI 타로 운세 등 HongLabAI가 직접 기획·설계·개발하여 서비스 중인 AI 및 모바일 앱 포트폴리오입니다.",
  alternates: { canonical: "/apps" },
  openGraph: {
    type: "website",
    title: "앱 포트폴리오 | HongLabAI",
    description:
      "HongLabAI가 기획하고 개발하여 실제로 서비스 중인 디지털 제품 및 AI 앱 포트폴리오를 둘러보세요.",
    url: "/apps",
  },
};

export const revalidate = 60;

export default async function AppsPage() {
  const apps = await getPublishedApps();
  const siteUrl = getSiteUrl();

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "앱 포트폴리오",
        item: `${siteUrl}/apps`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "HongLabAI 앱 포트폴리오",
    description: "HongLabAI가 기획하고 개발한 앱과 디지털 제품 목록입니다.",
    url: `${siteUrl}/apps`,
    hasPart: apps.map((app) => ({
      "@type": "SoftwareApplication",
      name: app.name,
      description: app.summary || app.tagline,
      applicationCategory: app.category,
      url: `${siteUrl}/apps/${app.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="relative overflow-hidden px-6 pt-36 pb-24">
        <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="container relative mx-auto">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.24em] text-zinc-500 uppercase">App Portfolio</p>
            <h1 className="mb-6 text-4xl font-black md:text-6xl">만들고 운영하는 앱을 한곳에서</h1>
            <p className="text-lg leading-relaxed text-zinc-500">
              HongLabAI가 기획하고 개발해 실제 공개 및 운영 중인 앱과 디지털 제품을 소개합니다.
            </p>
          </div>

          {apps.length ? (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </section>
          ) : (
            <section className="mx-auto max-w-4xl rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center md:p-16">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl text-zinc-400"
                aria-hidden="true"
              >
                ◫
              </div>
              <h2 className="mb-3 text-2xl font-bold">게시된 앱이 아직 없습니다</h2>
              <p className="mx-auto max-w-xl leading-relaxed text-zinc-500">
                관리자에서 앱을 작성하고 게시하면 이곳에 자동으로 표시됩니다.
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
