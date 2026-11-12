"use client";

import { useEffect, useState } from "react";
import type { BoardPost, TreeComment } from "@/domain/board/types";

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

  // Add Root Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: TreeComment = {
      id: createCommentId("c"),
      author: commentAuthor.trim() || "익명 개발자",
      authorRole: "게스트",
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

  // Add Nested Reply (Tree Branch Comment)
  const handleAddReply = (targetCommentId: string) => {
    if (!replyText.trim()) return;

    const newReply: TreeComment = {
      id: createCommentId("r"),
      author: replyAuthor.trim() || "익명 개발자",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Accessible Backdrop Button */}
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-post-title"
        className="relative z-10 flex flex-col max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-zinc-200"
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span className="text-lime-700 font-bold">{post.rootTreeName}</span>
            <span>›</span>
            <span>{post.treeName}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
          {/* Post Header */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-bold text-accent">
                {post.difficulty}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                게시일 {post.createdAt} · 조회 {post.views}회
              </span>
            </div>

            <h2 id="modal-post-title" className="text-2xl sm:text-3xl font-black text-zinc-950 leading-tight">
              {post.title}
            </h2>

            <div className="mt-4 flex items-center justify-between border-y border-zinc-100 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-accent">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-950">{post.author}</p>
                  <p className="text-[11px] text-zinc-400">{post.authorRole}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLikePost}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
                  hasLiked
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950"
                }`}
              >
                <span>❤️</span>
                <span>추천 {post.likes}</span>
              </button>
            </div>
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="rounded-2xl border border-lime-200 bg-lime-50/50 p-4 sm:p-5">
              <h3 className="mb-2 text-xs font-bold tracking-wider text-lime-900 uppercase flex items-center gap-1.5">
                <span>📌</span>
                <span>핵심 실무 체크리스트 (Key Takeaways)</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-700">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-lime-600 font-bold shrink-0">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-sm max-w-none text-zinc-700 leading-relaxed space-y-4">
            {post.content.split("\n\n").map((para, idx) => (
              <p key={idx} className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Architecture Flow Diagram */}
          {post.architectureFlow && post.architectureFlow.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-900 p-5 text-white">
              <h3 className="mb-3 text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span>🔄</span>
                <span>실전 아키텍처 흐름도 (Architecture Flow)</span>
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto py-2">
                {post.architectureFlow.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-initial rounded-xl bg-zinc-800 border border-zinc-700 px-3.5 py-2.5 text-center text-xs font-semibold text-zinc-200 shadow-sm whitespace-nowrap">
                      {step}
                    </div>
                    {idx < post.architectureFlow!.length - 1 && (
                      <span className="text-accent text-sm font-bold rotate-90 sm:rotate-0">
                        ➔
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippet */}
          {post.codeSnippet && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 text-zinc-200">
              <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <span className="text-xs font-mono font-bold uppercase text-accent">
                  {post.codeSnippet.language}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700"
                >
                  {copied ? "✓ 복사됨" : "코드 복사"}
                </button>
              </div>
              <pre className="overflow-x-auto text-xs font-mono leading-relaxed text-lime-300">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Tree Comments & Discussion Section */}
          <div className="border-t border-zinc-200 pt-8 mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-black text-zinc-950 flex items-center gap-2">
                <span>💬</span>
                <span>트리 구조 기술 토론 ({post.comments.length})</span>
              </h3>
              <span className="text-xs text-zinc-400">
                댓글 및 하위 답글이 계층형 트리로 연결됩니다
              </span>
            </div>

            {/* Root Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-3 flex gap-3">
                <input
                  type="text"
                  placeholder="작성자명 (예: 김개발)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-1/3 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-950"
                />
                <span className="text-xs text-zinc-400 self-center">
                  의견 또는 질문을 자유롭게 남겨보세요
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="이 아키텍처에 대한 피드백이나 질문을 남겨주세요..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              />
              <div className="mt-2.5 flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-accent transition hover:bg-zinc-800 disabled:opacity-40"
                >
                  댓글 등록
                </button>
              </div>
            </form>

            {/* Hierarchical Comments Tree */}
            <div className="space-y-6">
              {post.comments.length === 0 ? (
                <p className="py-6 text-center text-xs text-zinc-400">
                  아직 작성된 댓글이 없습니다. 첫 번째 토론을 시작해보세요!
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    {/* Parent Comment */}
                    <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700">
                            {comment.author.slice(0, 1)}
                          </span>
                          <span className="text-xs font-bold text-zinc-900">
                            {comment.author}
                          </span>
                          {comment.authorRole && (
                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">
                              {comment.authorRole}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-400">{comment.createdAt}</span>
                      </div>

                      <p className="text-xs text-zinc-700 leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-zinc-50 pt-2 text-xs">
                        <span className="text-[11px] text-zinc-400">❤️ {comment.likes}</span>
                        <button
                          type="button"
                          onClick={() => setReplyingToId(comment.id === replyingToId ? null : comment.id)}
                          className="font-bold text-zinc-600 hover:text-zinc-950 text-xs"
                        >
                          {replyingToId === comment.id ? "취소" : "↳ 답글 달기"}
                        </button>
                      </div>
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === comment.id && (
                      <div className="ml-6 sm:ml-10 rounded-2xl border border-blue-200 bg-blue-50/40 p-3.5 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="작성자명"
                            value={replyAuthor}
                            onChange={(e) => setReplyAuthor(e.target.value)}
                            className="w-1/3 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900"
                          />
                          <span className="text-[11px] text-blue-800 font-semibold self-center">
                            {comment.author}님에게 트리 답글 작성
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          placeholder="답글 내용을 입력하세요..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-200/50"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText.trim()}
                            className="rounded-lg bg-zinc-950 px-4 py-1.5 text-xs font-bold text-white hover:bg-zinc-800 disabled:opacity-40"
                          >
                            답글 등록
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Nested Child Replies (Tree Branches) */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 sm:ml-10 space-y-2.5 border-l-2 border-zinc-200 pl-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-400 font-mono text-xs">↳</span>
                                <span className="text-xs font-bold text-zinc-900">
                                  {reply.author}
                                </span>
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
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-3 flex justify-between items-center text-xs text-zinc-500">
          <span>HongLabAI 지식 아카이브</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-white hover:bg-zinc-800"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
