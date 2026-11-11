"use client";

import type { BoardPost } from "@/domain/board/types";

type BoardPostGridProps = {
  posts: BoardPost[];
  onSelectPost: (post: BoardPost) => void;
};

export default function BoardPostGrid({ posts, onSelectPost }: BoardPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
          🔍
        </div>
        <h3 className="text-base font-bold text-zinc-950">검색된 활용 사례가 없습니다</h3>
        <p className="mt-1 text-xs text-zinc-500">
          다른 키워드로 검색하거나 좌측 트리 메뉴에서 다른 브랜치를 선택해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {posts.map((post) => {
        const difficultyBadgeClass =
          post.difficulty === "실무 아키텍처"
            ? "bg-purple-100 text-purple-800 border-purple-200"
            : post.difficulty === "고급"
            ? "bg-rose-100 text-rose-800 border-rose-200"
            : post.difficulty === "중급"
            ? "bg-amber-100 text-amber-800 border-amber-200"
            : "bg-emerald-100 text-emerald-800 border-emerald-200";

        return (
          <article
            key={post.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
          >
            {/* Accessible Full-Card Clickable Button */}
            <button
              type="button"
              onClick={() => onSelectPost(post)}
              aria-label={`${post.title} 상세 보기`}
              className="absolute inset-0 z-0 h-full w-full rounded-2xl cursor-pointer"
            />

            <div className="relative z-10 pointer-events-none">
              {/* Header: Tree Breadcrumb & Difficulty */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
                  {post.treeName}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${difficultyBadgeClass}`}
                >
                  {post.difficulty}
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-bold text-zinc-950 transition-colors group-hover:text-lime-700 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 line-clamp-2">
                {post.summary}
              </p>

              {/* Key Takeaways snippet */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mt-3 rounded-lg bg-zinc-50 p-2.5 border border-zinc-100">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    핵심 체크포인트
                  </p>
                  <p className="text-xs text-zinc-700 truncate flex items-center gap-1.5">
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>{post.keyTakeaways[0]}</span>
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="relative z-10 pointer-events-none mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-800">{post.author}</span>
                <span className="text-[10px] text-zinc-400">{post.createdAt}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-400">
                <span className="flex items-center gap-1" title="조회수">
                  👁️ {post.views}
                </span>
                <span className="flex items-center gap-1" title="추천수">
                  ❤️ {post.likes}
                </span>
                <span className="flex items-center gap-1 font-bold text-zinc-700" title="트리 댓글">
                  💬 {post.comments.length}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
