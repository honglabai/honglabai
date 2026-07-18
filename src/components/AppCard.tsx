import Image from "next/image";
import Link from "next/link";
import { productLabels, type AppRecord } from "@/domain/apps/types";

export default function AppCard({ app }: { app: AppRecord }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-primary/40">
      <Link href={`/apps/${app.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-tr from-primary/20 to-secondary/20">
          {app.hero_image_url ? (
            <Image
              src={app.hero_image_url}
              alt={app.image_alt}
              fill
              sizes="(max-width: 639px) 100vw, 352px"
              className={`${app.hero_image_url === app.icon_url ? "object-contain p-8" : "object-cover"} transition duration-500 group-hover:scale-105`}
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center font-robot text-5xl font-bold text-white/30">{app.name.slice(0, 1)}</div>
          )}
        </div>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-light">{productLabels[app.product_status]}</span>
            <span className="text-xs text-gray-500">{app.platforms.join(" · ")}</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">{app.name}</h2>
          <p className="line-clamp-2 leading-relaxed text-gray-400">{app.tagline || app.summary}</p>
        </div>
      </Link>
    </article>
  );
}
