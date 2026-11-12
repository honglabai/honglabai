"use client";

import Link from "next/link";
import type { BoardPost, TreeRoot } from "@/domain/board/types";
import { IconNetwork, TreeIcon } from "./Icons";

type VisualTreeMapProps = {
  trees: TreeRoot[];
  posts: BoardPost[];
  onSelectPost: (post: BoardPost) => void;
  onSelectNode: (rootId: string, nodeId: string) => void;
};

export default function VisualTreeMap({
  trees,
  posts,
  onSelectPost,
  onSelectNode,
}: VisualTreeMapProps) {
  const getPostsForNode = (nodePostIds: string[]) => {
    return posts.filter((p) => nodePostIds.includes(p.id));
  };

  return (
    <div className="space-y-6 py-2">
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
              <IconNetwork className="h-4 w-4 text-zinc-700" />
              <span>기술 분류 트리 맵 (Knowledge Architecture Tree)</span>
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              분야별 아키텍처 노드가 계층형으로 연결되어 있습니다. 각 노드를 클릭하면 해당 기술 아티클로 이동합니다.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" /> 루트 분류
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> 서브 브랜치
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" /> 아티클
            </span>
          </div>
        </div>

        {/* Multiple Trees Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trees.map((tree, treeIdx) => {
            return (
              <div
                key={tree.id}
                className="relative rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4 sm:p-5"
              >
                {/* Tree Root Pillar */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-800">
                      <TreeIcon id={tree.id} className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-400">
                          TREE #{treeIdx + 1}
                        </span>
                        <span className="rounded bg-zinc-200/80 px-1.5 py-0.2 text-[10px] font-medium text-zinc-700">
                          {tree.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-950">
                        {tree.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-xs text-zinc-600 line-clamp-2">
                  {tree.description}
                </p>

                {/* Tree Branches & Leaves */}
                <div className="space-y-3">
                  {tree.nodes.map((node) => {
                    const nodePosts = getPostsForNode(node.postIds);

                    return (
                      <div
                        key={node.id}
                        className="relative rounded-lg border border-zinc-200/70 bg-white p-3"
                      >
                        {/* Branch Node Header */}
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-100">
                          <button
                            type="button"
                            onClick={() => onSelectNode(tree.id, node.id)}
                            className="flex items-center gap-1.5 text-left group"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                            <span className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                              {node.label}
                            </span>
                          </button>
                          <span className="text-[10px] font-mono tabular-nums text-zinc-400">
                            {nodePosts.length} posts
                          </span>
                        </div>

                        {/* Leaf Posts (Nested Children) */}
                        <div className="pl-3 space-y-1 border-l border-zinc-200 ml-0.5">
                          {nodePosts.map((post) => (
                            <Link
                              key={post.id}
                              href={`/ai-board/${post.slug}`}
                              onClick={(e) => {
                                if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                                  e.preventDefault();
                                  onSelectPost(post);
                                }
                              }}
                              className="group flex w-full items-start gap-1.5 rounded p-1 text-left transition-colors hover:bg-zinc-100"
                            >
                              <span className="text-zinc-300 text-xs font-mono">
                                └
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="truncate text-xs font-medium text-zinc-700 group-hover:text-zinc-950">
                                  {post.title}
                                </p>
                                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                  <span>{post.difficulty}</span>
                                  <span>·</span>
                                  <span>조회 {post.views}</span>
                                  <span>·</span>
                                  <span>댓글 {post.comments.length}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
