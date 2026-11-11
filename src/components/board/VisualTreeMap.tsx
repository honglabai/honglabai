"use client";

import type { BoardPost, TreeRoot } from "@/domain/board/types";

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
    <div className="space-y-8 py-2">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-zinc-950 flex items-center gap-2">
              <span>🌳</span>
              <span>AI 활용 멀티 트리 맵 (Interactive Knowledge Trees)</span>
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              여러 갈래의 AI 활용 영역이 트리 구조로 분기되어 연결되어 있습니다. 노드를 클릭하면 상세 기술 문서로 바로 이동합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-lime-500" /> 핵심 노드
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> 모듈 브랜치
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-zinc-400" /> 리프 아티클
            </span>
          </div>
        </div>

        {/* Multiple Trees Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trees.map((tree, treeIdx) => {
            return (
              <div
                key={tree.id}
                className="relative rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 transition hover:border-zinc-300"
              >
                {/* Tree Root Pillar */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-xs border border-zinc-200/80">
                      {tree.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          트리 #{treeIdx + 1}
                        </span>
                        <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[10px] font-bold text-zinc-700">
                          {tree.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-zinc-950">
                        {tree.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="mb-5 text-xs text-zinc-600 line-clamp-2">
                  {tree.description}
                </p>

                {/* Tree Branches & Leaves */}
                <div className="space-y-4">
                  {tree.nodes.map((node) => {
                    const nodePosts = getPostsForNode(node.postIds);

                    return (
                      <div
                        key={node.id}
                        className="relative rounded-xl border border-zinc-200/70 bg-white p-3.5 shadow-2xs"
                      >
                        {/* Branch Node Header */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100">
                          <button
                            type="button"
                            onClick={() => onSelectNode(tree.id, node.id)}
                            className="flex items-center gap-2 text-left group"
                          >
                            <span className="h-2 w-2 rounded-full bg-blue-500 transition group-hover:scale-125" />
                            <span className="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                              {node.label}
                            </span>
                          </button>
                          <span className="text-[10px] font-semibold text-zinc-400">
                            {nodePosts.length}건
                          </span>
                        </div>

                        {/* Leaf Posts (Nested Children) */}
                        <div className="pl-3.5 space-y-1.5 border-l-2 border-zinc-200/80 ml-1">
                          {nodePosts.map((post) => (
                            <button
                              key={post.id}
                              type="button"
                              onClick={() => onSelectPost(post)}
                              className="group flex w-full items-start gap-2 rounded-lg p-1.5 text-left transition hover:bg-zinc-100/80"
                            >
                              <span className="text-zinc-300 group-hover:text-lime-600 transition-colors text-xs font-mono">
                                └
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="truncate text-xs font-medium text-zinc-700 group-hover:text-zinc-950 group-hover:underline">
                                  {post.title}
                                </p>
                                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-zinc-400">
                                  <span className="font-semibold text-zinc-500">
                                    {post.difficulty}
                                  </span>
                                  <span>·</span>
                                  <span>조회 {post.views}</span>
                                  <span>·</span>
                                  <span>댓글 {post.comments.length}</span>
                                </div>
                              </div>
                            </button>
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
