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
      <main id="main-content" className="relative px-6 pt-32 pb-24">
        <div className="container relative mx-auto">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-2 text-xs font-semibold text-zinc-500">프로덕션 제품 라인업</p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">자체 개발 및 운영 앱 포트폴리오</h1>
            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
              HongLabAI가 기획하고 엔지니어링하여 실제로 운영 중인 디지털 제품군입니다.
            </p>
          </div>

          {apps.length ? (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </section>
          ) : (
            <section className="mx-auto max-w-4xl rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center md:p-14">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl text-zinc-400 font-mono"
                aria-hidden="true"
              >
                0
              </div>
              <h2 className="mb-2 text-xl font-bold text-zinc-900">게시된 앱이 아직 없습니다</h2>
              <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-500">
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
