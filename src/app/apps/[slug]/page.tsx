import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { productLabels } from "@/domain/apps/types";
import { getPublishedAppBySlug } from "@/server/apps";

type AppDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: AppDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getPublishedAppBySlug(slug);

  if (!app) return { title: "앱을 찾을 수 없습니다", robots: { index: false, follow: false } };

  return {
    title: app.seo_title || app.name,
    description: app.seo_description || app.summary || app.tagline,
    openGraph: app.hero_image_url ? { images: [{ url: app.hero_image_url, alt: app.image_alt }] } : undefined,
  };
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = await getPublishedAppBySlug(slug);
  if (!app) notFound();

  const links = [
    ["App Store", app.app_store_url],
    ["Google Play", app.play_store_url],
    ["웹·데모", app.web_url],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main className="px-6 pt-36 pb-24">
        <article className="container mx-auto max-w-4xl">
          <Link href="/apps" className="mb-8 inline-flex text-sm text-primary-light transition-colors hover:text-white">
            ← 포트폴리오로 돌아가기
          </Link>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {app.hero_image_url ? <div className="relative aspect-[16/8] w-full"><Image src={app.hero_image_url} alt={app.image_alt} fill priority sizes="(max-width: 1024px) 100vw, 896px" className={`object-cover ${app.slug === "alrimee" ? "object-top" : ""}`} unoptimized /></div> : null}
            <div className="p-8 md:p-12">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              {app.icon_url ? <div className="relative h-24 w-24 overflow-hidden rounded-3xl"><Image src={app.icon_url} alt={`${app.name} 아이콘`} fill sizes="96px" className="object-cover" unoptimized /></div> : <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-primary to-secondary font-robot text-4xl font-bold">{app.name.slice(0, 1)}</div>}
              <div>
                <p className="mb-2 text-sm font-bold tracking-widest text-secondary uppercase">{productLabels[app.product_status]} · {app.platforms.join(" · ")}</p>
                <h1 className="text-3xl font-black md:text-5xl">{app.name}</h1>
                <p className="mt-3 text-lg text-gray-400">{app.tagline}</p>
              </div>
            </div>
            <p className="mb-8 whitespace-pre-wrap text-lg leading-relaxed text-gray-300">{app.description || app.summary}</p>
            <div className="flex flex-wrap gap-3">{links.map(([label, url], index) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={`rounded-xl px-5 py-3 font-bold transition ${index === 0 ? "bg-primary text-white hover:bg-primary-dark" : "border border-white/10 text-white hover:border-primary/50"}`}>{label} ↗</a>)}</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
