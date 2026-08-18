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

  const title = app.seo_title || app.name;
  const description = app.seo_description || app.summary || app.tagline;
  const images = app.hero_image_url ? [{ url: app.hero_image_url, alt: app.image_alt }] : undefined;

  return {
    title,
    description,
    // Absolute canonical prevents duplicate-content splits between the
    // vercel.app origin and any custom domain added later.
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/apps/${app.slug}`,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.map((image) => image.url),
    },
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

  // SoftwareApplication markup so each portfolio entry can surface as a rich
  // result rather than a generic page.
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.summary || app.tagline,
    applicationCategory: app.category,
    operatingSystem: app.platforms.join(", ") || undefined,
    url: app.web_url ?? undefined,
    image: app.hero_image_url ?? undefined,
    author: { "@type": "Organization", name: "HongLabAI" },
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="px-6 pt-36 pb-24">
        <article className="container mx-auto max-w-4xl">
          <Link href="/apps" className="mb-8 inline-flex text-sm text-zinc-900 transition-colors hover:text-zinc-950">
            ← 포트폴리오로 돌아가기
          </Link>
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            {app.hero_image_url ? <div className="relative aspect-[16/8] w-full"><Image src={app.hero_image_url} alt={app.image_alt} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-cover object-top" /></div> : null}
            <div className="p-8 md:p-12">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              {app.icon_url ? <div className="relative h-24 w-24 overflow-hidden rounded-3xl"><Image src={app.icon_url} alt={`${app.name} 아이콘`} fill sizes="96px" className="object-cover" /></div> : <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-950 font-robot text-4xl font-bold text-accent">{app.name.slice(0, 1)}</div>}
              <div>
                <p className="mb-2 text-sm font-bold tracking-widest text-zinc-500 uppercase">{productLabels[app.product_status]} · {app.platforms.join(" · ")}</p>
                <h1 className="text-3xl font-black md:text-5xl">{app.name}</h1>
                <p className="mt-3 text-lg text-zinc-500">{app.tagline}</p>
              </div>
            </div>
            <p className="mb-8 whitespace-pre-wrap text-lg leading-relaxed text-zinc-600">{app.description || app.summary}</p>
            <div className="flex flex-wrap gap-3">{links.map(([label, url], index) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={`rounded-xl px-5 py-3 font-bold transition ${index === 0 ? "bg-accent text-zinc-950 hover:bg-accent-strong" : "border border-zinc-200 text-zinc-950 hover:border-zinc-950"}`}>{label} ↗</a>)}</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
