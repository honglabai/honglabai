"use client";

import Link from "next/link";
import type { BoardPost } from "@/domain/board/types";
import { IconCheck, IconEye, IconHeart, IconMessage, IconSearch } from "./Icons";

type BoardPostGridProps = {
  posts: BoardPost[];
  onSelectPost: (post: BoardPost) => void;
};

export default function BoardPostGrid({ posts, onSelectPost }: BoardPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
          <IconSearch className="h-5 w-5 text-zinc-600" />
        </div>
        <h3 className="text-sm font-bold text-zinc-900">검색된 활용 사례가 없습니다</h3>
        <p className="mt-1 text-xs text-zinc-500">
          다른 키워드로 검색하거나 좌측 트리 메뉴에서 다른 브랜치를 선택해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 transition-colors duration-150 hover:border-zinc-400"
        >
          {/* Accessible Full-Card Crawlable Link */}
          <Link
            href={`/ai-board/${post.slug}`}
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                onSelectPost(post);
              }
            }}
            aria-label={`${post.title} 상세 보기`}
            className="absolute inset-0 z-0 h-full w-full rounded-2xl cursor-pointer"
          />

          <div className="relative z-10 pointer-events-none">
            {/* Header: Tree Breadcrumb & Difficulty */}
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                {post.treeName}
              </span>
              <span className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-600">
                {post.difficulty}
              </span>
            </div>

            {/* Title & Summary */}
            <h3 className="text-sm font-bold text-zinc-950 sm:text-base leading-snug group-hover:text-zinc-800">
              {post.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 line-clamp-2">
              {post.summary}
            </p>

            {/* Key Takeaways snippet */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="mt-3 rounded-xl bg-zinc-50/80 p-2.5 border border-zinc-100">
                <p className="text-[10px] font-semibold text-zinc-500 mb-1">
                  핵심 체크포인트
                </p>
                <p className="text-xs text-zinc-700 truncate flex items-center gap-1.5">
                  <IconCheck className="h-3 w-3 text-zinc-600 shrink-0" />
                  <span className="truncate">{post.keyTakeaways[0]}</span>
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="relative z-10 pointer-events-none mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-800">{post.author}</span>
              <span className="text-[11px] font-mono text-zinc-400">{post.createdAt}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1" title="조회수">
                <IconEye className="h-3.5 w-3.5 text-zinc-400" />
                <span className="font-mono tabular-nums">{post.views}</span>
              </span>
              <span className="flex items-center gap-1" title="추천수">
                <IconHeart className="h-3.5 w-3.5 text-zinc-400" />
                <span className="font-mono tabular-nums">{post.likes}</span>
              </span>
              <span className="flex items-center gap-1 font-medium text-zinc-700" title="트리 댓글">
                <IconMessage className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-mono tabular-nums">{post.comments.length}</span>
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
