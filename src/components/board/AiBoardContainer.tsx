"use client";

import { useMemo, useState } from "react";
import type { BoardPost, DifficultyLevel, TreeRoot } from "@/domain/board/types";
import { INITIAL_POSTS, INITIAL_TREES } from "@/domain/board/data";
import TreeSidebar from "./TreeSidebar";
import VisualTreeMap from "./VisualTreeMap";
import BoardPostGrid from "./BoardPostGrid";
import PostDetailModal from "./PostDetailModal";
import CreatePostModal from "./CreatePostModal";

export default function AiBoardContainer() {
  const [trees, setTrees] = useState<TreeRoot[]>(INITIAL_TREES);
  const [posts, setPosts] = useState<BoardPost[]>(INITIAL_POSTS);

  // Navigation & Filter States
  const [activeRootId, setActiveRootId] = useState<string>("all");
  const [activeNodeId, setActiveNodeId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"board" | "treeMap">("board");

  // Modals
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter posts based on tree, search, and difficulty
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Root Tree Filter
      if (activeRootId !== "all" && post.rootTreeId !== activeRootId) {
        return false;
      }

      // 2. Sub-Node Filter
      if (activeNodeId !== "all" && post.treeId !== activeNodeId) {
        return false;
      }

      // 3. Difficulty Filter
      if (selectedDifficulty !== "all" && post.difficulty !== selectedDifficulty) {
        return false;
      }

      // 4. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(q);
        const inSummary = post.summary.toLowerCase().includes(q);
        const inContent = post.content.toLowerCase().includes(q);
        const inTags = post.tags.some((t) => t.toLowerCase().includes(q));
        const inAuthor = post.author.toLowerCase().includes(q);
        return inTitle || inSummary || inContent || inTags || inAuthor;
      }

      return true;
    });
  }, [posts, activeRootId, activeNodeId, selectedDifficulty, searchQuery]);

  const handleSelectRoot = (rootId: string) => {
    setActiveRootId(rootId);
    setActiveNodeId("all");
  };

  const handleSelectNode = (rootId: string, nodeId: string) => {
    setActiveRootId(rootId);
    setActiveNodeId(nodeId);
  };

  const handleUpdatePost = (updated: BoardPost) => {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPost(updated);
  };

  const handleCreatePost = (newPost: BoardPost) => {
    setPosts((prev) => [newPost, ...prev]);

    // Update tree nodes so post is indexed in tree
    setTrees((prevTrees) =>
      prevTrees.map((tree) => {
        if (tree.id === newPost.rootTreeId) {
          return {
            ...tree,
            nodes: tree.nodes.map((node) => {
              if (node.id === newPost.treeId) {
                return {
                  ...node,
                  postIds: [...node.postIds, newPost.id],
                };
              }
              return node;
            }),
          };
        }
        return tree;
      })
    );

    // Switch active view to new post's category
    setActiveRootId(newPost.rootTreeId);
    setActiveNodeId(newPost.treeId);
  };

  // Find active titles for breadcrumb
  const currentRoot = trees.find((t) => t.id === activeRootId);
  const currentNode = currentRoot?.nodes.find((n) => n.id === activeNodeId);

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Root Tree Tabs */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-zinc-950">
              <span className="h-2 w-2 rounded-full bg-lime-600 animate-pulse" />
              HongLabAI 기술 지식 베이스
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              AI 활용 트리 구조 게시판
            </h1>
            <p className="mt-2 text-sm text-zinc-600 max-w-2xl leading-relaxed">
              프롬프트 제어, 하이브리드 RAG, 자율 에이전트, 비즈니스 DX 자동화, MLOps까지 여러 갈래의 AI 활용 체계를 계층형 트리 보드로 탐색하고 질문을 나눌 수 있습니다.
            </p>
          </div>

          {/* Action Button: Create New Post */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-accent shadow-md transition hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-95"
            >
              <span className="text-base font-black">+</span>
              <span>사례 / 질문 작성하기</span>
            </button>
          </div>
        </div>

        {/* Root Tree Quick Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-6">
          <button
            type="button"
            onClick={() => handleSelectRoot("all")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeRootId === "all"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950"
            }`}
          >
            전체 트리 ({posts.length})
          </button>

          {trees.map((tree) => {
            const count = tree.nodes.reduce((acc, n) => acc + n.postIds.length, 0);
            const isActive = activeRootId === tree.id;

            return (
              <button
                key={tree.id}
                type="button"
                onClick={() => handleSelectRoot(tree.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-zinc-950 text-accent shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950"
                }`}
              >
                <span>{tree.icon}</span>
                <span>{tree.name}</span>
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-zinc-800 text-zinc-200" : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: View Mode, Difficulty, Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs">
        {/* Left: View Mode Toggle */}
        <div className="inline-flex rounded-xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setViewMode("board")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              viewMode === "board"
                ? "bg-white text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <span>📋</span>
            <span>게시판 보드 뷰</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("treeMap")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              viewMode === "treeMap"
                ? "bg-white text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <span>🌳</span>
            <span>인터랙티브 트리 맵</span>
          </button>
        </div>

        {/* Right: Filters & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 focus:outline-none focus:border-zinc-950"
          >
            <option value="all">전체 난이도</option>
            <option value="입문">입문</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
            <option value="실무 아키텍처">실무 아키텍처</option>
          </select>

          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="제목, 내용, 태그 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950"
            />
            <span className="absolute left-2.5 top-2 text-xs text-zinc-400">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1.5 text-xs text-zinc-400 hover:text-zinc-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "treeMap" ? (
        /* Visual Tree Map View */
        <VisualTreeMap
          trees={trees}
          posts={posts}
          onSelectPost={(post) => setSelectedPost(post)}
          onSelectNode={(rootId, nodeId) => {
            setViewMode("board");
            handleSelectNode(rootId, nodeId);
          }}
        />
      ) : (
        /* Standard Tree Explorer + Board Grid */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left Column: Interactive Tree Sidebar */}
          <div className="lg:col-span-1">
            <TreeSidebar
              trees={trees}
              activeRootId={activeRootId}
              activeNodeId={activeNodeId}
              onSelectRoot={handleSelectRoot}
              onSelectNode={handleSelectNode}
              totalPostsCount={posts.length}
            />
          </div>

          {/* Right Column: Board Posts Grid */}
          <div className="lg:col-span-3 space-y-4">
            {/* Active Breadcrumb indicator */}
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 border border-zinc-200/80 text-xs text-zinc-500 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-900">
                  {currentRoot ? currentRoot.name : "전체 트리"}
                </span>
                {currentNode && (
                  <>
                    <span className="text-zinc-300">›</span>
                    <span className="font-semibold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-md border border-lime-200">
                      {currentNode.label}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[11px] font-semibold text-zinc-400">
                게시글 {filteredPosts.length}건
              </span>
            </div>

            {/* Post Cards Grid */}
            <BoardPostGrid
              posts={filteredPosts}
              onSelectPost={(post) => setSelectedPost(post)}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onUpdatePost={handleUpdatePost}
      />

      <CreatePostModal
        isOpen={isCreateOpen}
        trees={trees}
        onClose={() => setIsCreateOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}
