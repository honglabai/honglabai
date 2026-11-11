import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { INITIAL_POSTS } from "@/domain/board/data";
import { getPublishedApps } from "@/server/apps";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const apps = await getPublishedApps();
  const buildDate = new Date().toUTCString();

  const boardItemsXml = INITIAL_POSTS.map((post) => {
    const pubDate = new Date(post.createdAt).toUTCString();
    const link = `${siteUrl}/ai-board/${post.slug}`;
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <author>honglabai@gmail.com (${escapeXml(post.author)})</author>
      <category><![CDATA[${post.treeName || post.rootTreeName}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("\n");

  const appItemsXml = apps.map((app) => {
    const pubDate = new Date(app.published_at || app.created_at || new Date()).toUTCString();
    const link = `${siteUrl}/apps/${app.slug}`;
    const title = `${app.name} - ${app.tagline || app.summary || "앱 포트폴리오"}`;
    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${app.summary || app.description || ""}]]></description>
      <author>honglabai@gmail.com (HongLabAI)</author>
      <category><![CDATA[${app.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("\n");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HongLabAI | AI 소프트웨어 개발 &amp; LLM 기술 컨설팅</title>
    <link>${siteUrl}</link>
    <description>AI 소프트웨어 개발, 생성형 AI·LLM 도입 컨설팅, RAG 및 비즈니스 업무 자동화 솔루션</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${boardItemsXml}
${appItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
