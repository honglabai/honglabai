"use client";

import { useEffect, useState } from "react";
import type { BoardPost, DifficultyLevel, TreeRoot } from "@/domain/board/types";
import { IconClose, IconPlus } from "./Icons";

function createPostId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `post-${crypto.randomUUID()}`;
  }
  return `post-${Math.random().toString(36).slice(2, 10)}`;
}

type CreatePostModalProps = {
  isOpen: boolean;
  trees: TreeRoot[];
  onClose: () => void;
  onCreatePost: (newPost: BoardPost) => void;
};

export default function CreatePostModal({
  isOpen,
  trees,
  onClose,
  onCreatePost,
}: CreatePostModalProps) {
  const [selectedRootId, setSelectedRootId] = useState(trees[0]?.id || "root-genai");
  const [selectedNodeId, setSelectedNodeId] = useState(
    trees[0]?.nodes[0]?.id || "node-prompt"
  );
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("중급");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const currentRoot = trees.find((t) => t.id === selectedRootId) || trees[0];
  const availableNodes = currentRoot?.nodes || [];

  const handleRootChange = (rootId: string) => {
    setSelectedRootId(rootId);
    const newRoot = trees.find((t) => t.id === rootId);
    if (newRoot && newRoot.nodes.length > 0) {
      setSelectedNodeId(newRoot.nodes[0].id);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const currentNode = availableNodes.find((n) => n.id === selectedNodeId);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const id = createPostId();

    const newPost: BoardPost = {
      id,
      slug: id,
      rootTreeId: selectedRootId,
      rootTreeName: currentRoot?.name || "AI 활용 트리",
      treeId: selectedNodeId,
      treeName: currentNode?.label || "일반 활용",
      title: title.trim(),
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      keyTakeaways: ["실무 적용 검토 완료", "동일 트리 브랜치 사용자 공유"],
      tags: tags.length > 0 ? tags : ["AI활용", "실무가이드"],
      difficulty,
      author: author.trim() || "홍랩 파트너",
      authorRole: "기여자",
      createdAt: "오늘",
      views: 1,
      likes: 1,
      comments: [],
    };

    onCreatePost(newPost);
    onClose();

    setTitle("");
    setSummary("");
    setContent("");
    setTagsInput("");
    setAuthor("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
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
        aria-labelledby="modal-create-post-title"
        className="relative z-10 flex flex-col max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl border border-zinc-200/90"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-800">
              <IconPlus className="h-3.5 w-3.5" />
            </span>
            <h3 id="modal-create-post-title" className="text-sm font-bold text-zinc-900">
              새로운 AI 활용 기술 사례 등록
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Tree Category Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-root-tree" className="block text-xs font-semibold text-zinc-700 mb-1">
                상위 분류 트리
              </label>
              <select
                id="create-root-tree"
                value={selectedRootId}
                onChange={(e) => handleRootChange(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              >
                {trees.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.englishName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="create-sub-node" className="block text-xs font-semibold text-zinc-700 mb-1">
                하위 서브 브랜치
              </label>
              <select
                id="create-sub-node"
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              >
                {availableNodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-author" className="block text-xs font-semibold text-zinc-700 mb-1">
                작성자
              </label>
              <input
                id="create-author"
                type="text"
                placeholder="홍길동 엔지니어"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              />
            </div>

            <div>
              <label htmlFor="create-difficulty" className="block text-xs font-semibold text-zinc-700 mb-1">
                난이도
              </label>
              <select
                id="create-difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
              >
                <option value="입문">입문</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
                <option value="실무 아키텍처">실무 아키텍처</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="create-title" className="block text-xs font-semibold text-zinc-700 mb-1">
              게시글 제목 <span className="text-zinc-400">*</span>
            </label>
            <input
              id="create-title"
              type="text"
              required
              placeholder="예: [실전] LangGraph 상태 머신 기반 에이전트 구축 가이드"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="create-summary" className="block text-xs font-semibold text-zinc-700 mb-1">
              핵심 요약 (한 줄 설명)
            </label>
            <input
              id="create-summary"
              type="text"
              placeholder="게시글 목록에 표시될 간략한 요약입니다."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="create-content" className="block text-xs font-semibold text-zinc-700 mb-1">
              상세 내용 <span className="text-zinc-400">*</span>
            </label>
            <textarea
              id="create-content"
              required
              rows={5}
              placeholder="문제 상황, 해결 방법, 아키텍처 구조, 도입 효과 등을 기술하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="create-tags" className="block text-xs font-semibold text-zinc-700 mb-1">
              태그 (쉼표로 구분)
            </label>
            <input
              id="create-tags"
              type="text"
              placeholder="Agent, ToolCalling, Nodejs, LangGraph"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
            />
          </div>

          {/* Footer CTA */}
          <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="rounded-lg bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-40"
            >
              등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
