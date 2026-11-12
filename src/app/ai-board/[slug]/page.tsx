import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_POSTS } from "@/domain/board/data";
import { getSiteUrl } from "@/lib/site-url";
import {
  IconActivity,
  IconArrowRight,
  IconCheck,
  IconEye,
  IconHeart,
  IconMessage,
} from "@/components/board/Icons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return INITIAL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const siteUrl = getSiteUrl();

  return {
    title: `${post.title} | HongLabAI`,
    description: post.summary,
    keywords: [post.title, ...post.tags, "HongLabAI", "홍랩에이아이", "AI 활용 게시판"],
    alternates: {
      canonical: `${siteUrl}/ai-board/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | HongLabAI`,
      description: post.summary,
      type: "article",
      url: `${siteUrl}/ai-board/${post.slug}`,
      siteName: "HongLabAI (홍랩에이아이)",
      locale: "ko_KR",
      publishedTime: post.createdAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | HongLabAI`,
      description: post.summary,
      images: [`${siteUrl}/opengraph-image`],
    },
  };
}

export default async function BoardPostPage({ params }: Props) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();

  const relatedPosts = INITIAL_POSTS.filter(
    (p) => p.rootTreeId === post.rootTreeId && p.id !== post.id
  ).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.summary,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "HongLabAI",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    datePublished: `${post.createdAt}T00:00:00+09:00`,
    dateModified: `${post.createdAt}T00:00:00+09:00`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/ai-board/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

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
        name: "AI 활용 게시판",
        item: `${siteUrl}/ai-board`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.rootTreeName,
        item: `${siteUrl}/ai-board`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `${siteUrl}/ai-board/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main id="main-content" className="relative px-4 sm:px-6 pt-28 pb-24">
        <article className="container mx-auto max-w-4xl space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="브레드크럼" className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              홈
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/ai-board" className="hover:text-zinc-900 transition-colors">
              AI 활용 기술 보드
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-800 font-semibold">{post.rootTreeName}</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-600">{post.treeName}</span>
          </nav>

          {/* Article Header */}
          <header className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded border border-zinc-200/90 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                {post.difficulty}
              </span>
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
                {post.treeName}
              </span>
              <span className="text-xs font-mono tabular-nums text-zinc-400">
                {post.createdAt} · 조회 {post.views}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight leading-snug">
              {post.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 border-l-2 border-zinc-300 pl-3">
              {post.summary}
            </p>

            {/* Author Byline */}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-950">{post.author}</p>
                  <p className="text-[11px] text-zinc-400">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <IconEye className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-mono tabular-nums">{post.views}</span>
                </span>
                <span className="flex items-center gap-1">
                  <IconHeart className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-mono tabular-nums">{post.likes}</span>
                </span>
                <span className="flex items-center gap-1 font-medium text-zinc-700">
                  <IconMessage className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="font-mono tabular-nums">{post.comments.length}</span>
                </span>
              </div>
            </div>
          </header>

          {/* AdSense In-Content Responsive Slot Placeholder */}
          <div
            className="my-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-3.5 text-center text-xs text-zinc-400 font-mono"
            data-ad-slot="content-top"
          >
            <span className="text-[10px] text-zinc-400">
              스폰서 광고 영역 (Google AdSense)
            </span>
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <section className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 sm:p-6">
              <h2 className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 mb-2.5">
                <IconCheck className="h-4 w-4 text-zinc-700" />
                <span>실무 핵심 요약 (Key Engineering Takeaways)</span>
              </h2>
              <ul className="space-y-1.5 text-xs text-zinc-600">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Main Content Body */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-6">
            <div className="prose prose-sm sm:prose-base max-w-none text-zinc-700 leading-relaxed space-y-4">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line leading-relaxed text-zinc-700 text-xs sm:text-sm">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Architecture Flow */}
            {post.architectureFlow && post.architectureFlow.length > 0 && (
              <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-200 space-y-3">
                <h3 className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                  <IconActivity className="h-3.5 w-3.5 text-zinc-400" />
                  <span>엔지니어링 아키텍처 흐름도 (Architecture Workflow)</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto py-1">
                  {post.architectureFlow.map((step, idx) => (
                    <div key={step} className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-initial rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-center text-xs font-mono text-zinc-300 shadow-2xs whitespace-nowrap">
                        {step}
                      </div>
                      {idx < post.architectureFlow!.length - 1 && (
                        <span className="text-zinc-600 text-xs shrink-0 rotate-90 sm:rotate-0">
                          <IconArrowRight className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Code Snippet */}
            {post.codeSnippet && (
              <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 text-zinc-200">
                <div className="mb-2.5 flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-medium text-zinc-400">
                    {post.codeSnippet.language} 예제 코드
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">HongLabAI Verified</span>
                </div>
                <pre className="overflow-x-auto text-xs font-mono leading-relaxed text-zinc-200">
                  <code>{post.codeSnippet.code}</code>
                </pre>
              </section>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* AdSense In-Content Bottom Slot Placeholder */}
          <div
            className="my-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-3.5 text-center text-xs text-zinc-400 font-mono"
            data-ad-slot="content-bottom"
          >
            <span className="text-[10px] text-zinc-400">
              스폰서 광고 영역 (Google AdSense)
            </span>
          </div>

          {/* Hierarchical Tree Comments & Discussion */}
          <section className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8">
            <h2 className="text-base font-bold text-zinc-950 mb-1 flex items-center gap-1.5">
              <IconMessage className="h-4 w-4 text-zinc-700" />
              <span>기술 토론 및 피드백</span>
              <span className="font-mono tabular-nums text-xs text-zinc-400 font-normal">
                ({post.comments.length})
              </span>
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              해당 아키텍처에 관한 기술 질의와 피드백입니다.
            </p>

            <div className="space-y-3">
              {post.comments.length === 0 ? (
                <p className="py-6 text-center text-xs text-zinc-400 font-mono">
                  작성된 기술 토론이 아직 없습니다.
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-200 text-[10px] font-bold text-zinc-700">
                            {comment.author.slice(0, 1)}
                          </span>
                          <span className="text-xs font-semibold text-zinc-900">{comment.author}</span>
                          {comment.authorRole && (
                            <span className="rounded bg-zinc-200/80 px-1.5 py-0.2 text-[10px] text-zinc-600">
                              {comment.authorRole}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-5 sm:ml-8 space-y-2 border-l border-zinc-200 pl-3">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-lg border border-zinc-100 bg-white p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-zinc-900">{reply.author}</span>
                                {reply.authorRole && (
                                  <span className="rounded bg-zinc-100 px-1.5 py-0.2 text-[10px] text-zinc-600">
                                    {reply.authorRole}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-zinc-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-100 text-center">
              <Link
                href="/ai-board"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>← 전체 AI 활용 기술 보드로 이동</span>
              </Link>
            </div>
          </section>

          {/* Related Articles in Same Tree */}
          {relatedPosts.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold text-zinc-900">
                동일 분류 트리의 다른 아티클
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/ai-board/${rel.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-4 transition-colors hover:border-zinc-400"
                  >
                    <div>
                      <span className="rounded border border-zinc-200/80 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600">
                        {rel.difficulty}
                      </span>
                      <h3 className="mt-2 text-xs font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>
                    <span className="mt-3 text-xs font-medium text-zinc-700 group-hover:text-zinc-950">
                      자세히 보기 →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
