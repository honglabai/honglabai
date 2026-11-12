import Image from "next/image";
import Link from "next/link";
import { productLabels, type AppRecord } from "@/domain/apps/types";

export default function AppCard({ app }: { app: AppRecord }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white transition-colors duration-150 hover:border-zinc-400">
      <Link href={`/apps/${app.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
          {app.hero_image_url ? (
            <Image
              src={app.hero_image_url}
              alt={app.image_alt}
              fill
              unoptimized={true}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover object-top"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-4xl font-bold text-zinc-300">
              {app.name.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="rounded-md border border-zinc-200/70 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                {productLabels[app.product_status]}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[140px]">
                {app.platforms.join(" · ")}
              </span>
            </div>
            <h2 className="mb-1.5 text-base font-bold text-zinc-950 sm:text-lg group-hover:text-zinc-800">
              {app.name}
            </h2>
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
              {app.tagline || app.summary}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-semibold text-zinc-700">
            <span>자세히 보기</span>
            <span aria-hidden="true" className="text-zinc-400 transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
