import Image from "next/image";
import Link from "next/link";
import { productLabels, type AppRecord } from "@/domain/apps/types";

export default function AppCard({ app }: { app: AppRecord }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-[0_20px_40px_-18px_rgba(24,24,27,0.12)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_50px_-20px_rgba(24,24,27,0.18)]">
      <Link href={`/apps/${app.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-tr from-zinc-100 to-zinc-200">
          {app.hero_image_url ? (
            <Image
              src={app.hero_image_url}
              alt={app.image_alt}
              fill
              unoptimized={true}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover object-top transition duration-300 group-hover:scale-105"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-robot text-5xl font-bold text-zinc-300">{app.name.slice(0, 1)}</div>
          )}
        </div>
        <div className="p-5 xl:p-6">
          <div className="mb-3 flex items-center justify-between gap-3 xl:mb-4">
            <span className="rounded-full bg-lime-200 px-2.5 py-0.5 text-xs font-bold text-zinc-900">{productLabels[app.product_status]}</span>
            <span className="text-xs text-zinc-500">{app.platforms.join(" · ")}</span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-zinc-950 xl:text-2xl">{app.name}</h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 xl:text-base">{app.tagline || app.summary}</p>
        </div>
      </Link>
    </article>
  );
}
