"use client";

import { useEffect, useState } from "react";
import type { BoardPost, TreeComment } from "@/domain/board/types";
import {
  IconActivity,
  IconArrowRight,
  IconCheck,
  IconClose,
  IconCopy,
  IconHeart,
  IconMessage,
} from "./Icons";

function createCommentId(prefix: "c" | "r") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

type PostDetailModalProps = {
  post: BoardPost | null;
  onClose: () => void;
  onUpdatePost: (updatedPost: BoardPost) => void;
};

export default function PostDetailModal({
  post,
  onClose,
  onUpdatePost,
}: PostDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleCopyCode = () => {
    if (!post.codeSnippet) return;
    navigator.clipboard.writeText(post.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLikePost = () => {
    if (hasLiked) return;
    setHasLiked(true);
    onUpdatePost({
      ...post,
      likes: post.likes + 1,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: TreeComment = {
      id: createCommentId("c"),
      author: commentAuthor.trim() || "게스트 개발자",
      authorRole: "기여자",
      content: commentText.trim(),
      createdAt: "방금 전",
      likes: 0,
      replies: [],
    };

    onUpdatePost({
      ...post,
      comments: [newComment, ...post.comments],
    });

    setCommentText("");
    setCommentAuthor("");
  };

  const handleAddReply = (targetCommentId: string) => {
    if (!replyText.trim()) return;

    const newReply: TreeComment = {
      id: createCommentId("r"),
      author: replyAuthor.trim() || "게스트 개발자",
      authorRole: "답글 작성자",
      content: replyText.trim(),
      createdAt: "방금 전",
      likes: 0,
    };

    const updatedComments = post.comments.map((c) => {
      if (c.id === targetCommentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    });

    onUpdatePost({
      ...post,
      comments: updatedComments,
    });

    setReplyingToId(null);
    setReplyText("");
    setReplyAuthor("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Accessible Backdrop */}
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs cursor-default"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-post-title"
        className="relative z-10 flex flex-col max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl border border-zinc-200/90"
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <span className="text-zinc-800 font-semibold">{post.rootTreeName}</span>
            <span className="text-zinc-300">/</span>
            <span>{post.treeName}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          {/* Post Header */}
          <div>
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span className="rounded border border-zinc-200/90 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                {post.difficulty}
              </span>
              <span className="text-xs font-mono tabular-nums text-zinc-400">
                {post.createdAt} · 조회 {post.views}
              </span>
            </div>

            <h2 id="modal-post-title" className="text-xl sm:text-2xl font-bold text-zinc-950 leading-snug">
              {post.title}
            </h2>

            <div className="mt-4 flex items-center justify-between border-y border-zinc-100 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">{post.author}</p>
                  <p className="text-[11px] text-zinc-400">{post.authorRole}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLikePost}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  hasLiked
                    ? "border-zinc-300 bg-zinc-100 text-zinc-900"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <IconHeart className={`h-3.5 w-3.5 ${hasLiked ? "fill-zinc-900 text-zinc-900" : "text-zinc-400"}`} />
                <span className="font-mono tabular-nums">추천 {post.likes}</span>
              </button>
            </div>
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4">
              <h3 className="mb-2.5 text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-zinc-600" />
                <span>핵심 실무 체크포인트</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-600">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-sm max-w-none text-zinc-700 leading-relaxed space-y-4">
            {post.content.split("\n\n").map((para, idx) => (
              <p key={idx} className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Architecture Flow Diagram */}
          {post.architectureFlow && post.architectureFlow.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-200">
              <h3 className="mb-3 text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                <IconActivity className="h-3.5 w-3.5 text-zinc-400" />
                <span>실전 아키텍처 흐름도</span>
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto py-1">
                {post.architectureFlow.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-initial rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-center text-xs font-mono text-zinc-300 shadow-2xs whitespace-nowrap">
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
            </div>
          )}

          {/* Code Snippet */}
          {post.codeSnippet && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-200">
              <div className="mb-2.5 flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono font-medium text-zinc-400">
                  {post.codeSnippet.language}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <IconCopy className="h-3 w-3" />
                  <span>{copied ? "복사 완료" : "코드 복사"}</span>
                </button>
              </div>
              <pre className="overflow-x-auto text-xs font-mono leading-relaxed text-zinc-200">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-500"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Tree Comments & Discussion Section */}
          <div className="border-t border-zinc-100 pt-6 mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                <IconMessage className="h-4 w-4 text-zinc-700" />
                <span>기술 토론 및 피드백</span>
                <span className="font-mono tabular-nums text-xs text-zinc-400 font-normal">
                  ({post.comments.length})
                </span>
              </h3>
            </div>

            {/* Root Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6 rounded-xl border border-zinc-200/90 bg-zinc-50/60 p-3.5 space-y-2.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="작성자명"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-1/3 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
                />
                <span className="text-[11px] text-zinc-400 self-center">
                  기술적 질문이나 피드백을 자유롭게 남겨보세요
                </span>
              </div>
              <textarea
                rows={2}
                placeholder="아키텍처 또는 구현 관련 의견 작성..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="rounded-lg bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-40"
                >
                  댓글 등록
                </button>
              </div>
            </form>

            {/* Hierarchical Comments Tree */}
            <div className="space-y-3">
              {post.comments.length === 0 ? (
                <p className="py-4 text-center text-xs text-zinc-400 font-mono">
                  등록된 토론 내용이 없습니다.
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    {/* Parent Comment */}
                    <div className="rounded-xl border border-zinc-200/70 bg-white p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold text-zinc-700">
                            {comment.author.slice(0, 1)}
                          </span>
                          <span className="text-xs font-semibold text-zinc-900">
                            {comment.author}
                          </span>
                          {comment.authorRole && (
                            <span className="rounded bg-zinc-100 px-1.5 py-0.2 text-[10px] text-zinc-500">
                              {comment.authorRole}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">{comment.createdAt}</span>
                      </div>

                      <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between border-t border-zinc-50 pt-2 text-xs">
                        <span className="text-[11px] font-mono tabular-nums text-zinc-400">
                          추천 {comment.likes}
                        </span>
                        <button
                          type="button"
                          onClick={() => setReplyingToId(comment.id === replyingToId ? null : comment.id)}
                          className="font-medium text-zinc-600 hover:text-zinc-950 text-xs"
                        >
                          {replyingToId === comment.id ? "취소" : "답글 작성"}
                        </button>
                      </div>
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === comment.id && (
                      <div className="ml-5 sm:ml-8 rounded-xl border border-zinc-200 bg-zinc-50 p-3 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="작성자명"
                            value={replyAuthor}
                            onChange={(e) => setReplyAuthor(e.target.value)}
                            className="w-1/3 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900"
                          />
                          <span className="text-[11px] text-zinc-600 self-center">
                            {comment.author}님에게 답글
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          placeholder="답글 내용을 입력하세요..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="rounded-lg px-2.5 py-1 text-xs text-zinc-500 hover:bg-zinc-200/50"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText.trim()}
                            className="rounded-lg bg-zinc-950 px-3 py-1 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-40"
                          >
                            답글 등록
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Nested Child Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-5 sm:ml-8 space-y-2 border-l border-zinc-200 pl-3">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-zinc-900">
                                  {reply.author}
                                </span>
                                {reply.authorRole && (
                                  <span className="rounded bg-zinc-100 px-1.5 py-0.2 text-[10px] text-zinc-500">
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
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-3 flex justify-between items-center text-xs text-zinc-500">
          <span className="font-mono text-[11px]">HongLabAI Architecture Board</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
