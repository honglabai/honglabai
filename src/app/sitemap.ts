import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getPublishedApps } from "@/server/apps";

// Regenerate hourly so a newly published app appears without a redeploy.
export const revalidate = 3600;

const staticRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/apps", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/ai-board", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const apps = await getPublishedApps();
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...apps.map((app) => ({
      url: `${siteUrl}/apps/${app.slug}`,
      lastModified: new Date(app.updated_at ?? app.published_at ?? now),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
