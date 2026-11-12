import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_POSTS } from "@/domain/board/data";
import { getSiteUrl } from "@/lib/site-url";

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

  // Related posts from same tree
  const relatedPosts = INITIAL_POSTS.filter(
    (p) => p.rootTreeId === post.rootTreeId && p.id !== post.id
  ).slice(0, 3);

  // Schema.org TechArticle Structured Data for Google Rich Results & E-E-A-T
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

      {/* Structured Data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main id="main-content" className="relative overflow-hidden px-4 sm:px-6 pt-32 pb-24">
        {/* Ambient background light */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />

        <article className="container relative mx-auto max-w-4xl space-y-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="브레드크럼" className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              홈
            </Link>
            <span>›</span>
            <Link href="/ai-board" className="hover:text-zinc-900 transition-colors">
              AI 활용 게시판
            </Link>
            <span>›</span>
            <span className="text-lime-700 font-bold">{post.rootTreeName}</span>
            <span>›</span>
            <span className="text-zinc-700">{post.treeName}</span>
          </nav>

          {/* Article Header */}
          <header className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-zinc-950 px-3.5 py-1 text-xs font-bold text-accent">
                {post.difficulty}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                트리 브랜치: {post.treeName}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                게시일 {post.createdAt} · 조회 {post.views}회
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-600 border-l-4 border-lime-400 pl-4 py-1">
              {post.summary}
            </p>

            {/* Author Byline */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-base font-black text-accent shadow-xs">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-950">{post.author}</p>
                  <p className="text-xs text-zinc-400 font-medium">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                <span className="flex items-center gap-1">👁️ 조회 {post.views}</span>
                <span className="flex items-center gap-1">❤️ 추천 {post.likes}</span>
                <span className="flex items-center gap-1 font-bold text-zinc-800">💬 댓글 {post.comments.length}</span>
              </div>
            </div>
          </header>

          {/* AdSense In-Content Responsive Slot Placeholder */}
          <div
            className="my-6 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-4 text-center text-xs text-zinc-400"
            data-ad-slot="content-top"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              스폰서 광고 영역 (Google AdSense)
            </span>
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <section className="rounded-2xl border border-lime-200 bg-lime-50/50 p-6 sm:p-8">
              <h2 className="text-sm font-bold tracking-wider text-lime-900 uppercase flex items-center gap-2 mb-3">
                <span>📌</span>
                <span>실무 핵심 요약 (Key Engineering Takeaways)</span>
              </h2>
              <ul className="space-y-2 text-sm text-zinc-700">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="text-lime-600 font-bold shrink-0">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Main Content Body */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-8">
            <div className="prose prose-base sm:prose-lg max-w-none text-zinc-800 leading-relaxed space-y-5">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line leading-relaxed text-zinc-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Architecture Flow */}
            {post.architectureFlow && post.architectureFlow.length > 0 && (
              <section className="rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-white space-y-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span>🔄</span>
                  <span>엔지니어링 아키텍처 흐름도 (Architecture Workflow)</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 overflow-x-auto py-2">
                  {post.architectureFlow.map((step, idx) => (
                    <div key={step} className="flex items-center gap-2.5 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-initial rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-center text-xs sm:text-sm font-semibold text-zinc-200 shadow-sm whitespace-nowrap">
                        {step}
                      </div>
                      {idx < post.architectureFlow!.length - 1 && (
                        <span className="text-accent text-base font-bold rotate-90 sm:rotate-0">
                          ➔
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Code Snippet */}
            {post.codeSnippet && (
              <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 text-zinc-200">
                <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-mono font-bold uppercase text-accent">
                    {post.codeSnippet.language} 예제 코드
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">HongLabAI Verified</span>
                </div>
                <pre className="overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-lime-300">
                  <code>{post.codeSnippet.code}</code>
                </pre>
              </section>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* AdSense In-Content Bottom Slot Placeholder */}
          <div
            className="my-6 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-4 text-center text-xs text-zinc-400"
            data-ad-slot="content-bottom"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              스폰서 광고 영역 (Google AdSense)
            </span>
          </div>

          {/* Hierarchical Tree Comments & Discussion */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-black text-zinc-950 mb-2 flex items-center gap-2">
              <span>💬</span>
              <span>트리 구조 기술 토론 ({post.comments.length})</span>
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              해당 주제에 관한 질의응답 및 피드백은 계층형 트리 댓글로 정리됩니다.
            </p>

            <div className="space-y-4">
              {post.comments.length === 0 ? (
                <p className="py-8 text-center text-xs text-zinc-400">
                  작성된 기술 토론이 아직 없습니다. 메인 보드에서 첫 번째 질문을 남겨보세요!
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700">
                            {comment.author.slice(0, 1)}
                          </span>
                          <span className="text-xs font-bold text-zinc-900">{comment.author}</span>
                          {comment.authorRole && (
                            <span className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                              {comment.authorRole}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 sm:ml-10 space-y-2.5 border-l-2 border-zinc-200 pl-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-xl border border-zinc-100 bg-white p-3.5 shadow-2xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-400 font-mono text-xs">↳</span>
                                <span className="text-xs font-bold text-zinc-900">{reply.author}</span>
                                {reply.authorRole && (
                                  <span className="rounded bg-accent/30 px-1.5 py-0.2 text-[10px] font-bold text-zinc-800">
                                    {reply.authorRole}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line pl-4">
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

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
              <Link
                href="/ai-board"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-xs font-bold text-accent transition hover:bg-zinc-800"
              >
                <span>← 전체 AI 활용 트리 게시판으로 돌아가기</span>
              </Link>
            </div>
          </section>

          {/* Related Articles in Same Tree */}
          {relatedPosts.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-zinc-950">
                같은 트리 브랜치의 추천 아티클
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/ai-board/${rel.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:border-zinc-300"
                  >
                    <div>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600">
                        {rel.difficulty}
                      </span>
                      <h3 className="mt-2 text-sm font-bold text-zinc-950 group-hover:text-lime-700 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>
                    <span className="mt-4 text-xs font-bold text-lime-700">
                      읽어보기 →
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
