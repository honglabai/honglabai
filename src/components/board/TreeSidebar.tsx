"use client";

import { useState } from "react";
import type { TreeRoot } from "@/domain/board/types";

type TreeSidebarProps = {
  trees: TreeRoot[];
  activeRootId: string;
  activeNodeId: string;
  onSelectRoot: (rootId: string) => void;
  onSelectNode: (rootId: string, nodeId: string) => void;
  totalPostsCount: number;
};

export default function TreeSidebar({
  trees,
  activeRootId,
  activeNodeId,
  onSelectRoot,
  onSelectNode,
  totalPostsCount,
}: TreeSidebarProps) {
  // Track open/closed state of tree roots
  const [openTrees, setOpenTrees] = useState<Record<string, boolean>>({
    "root-genai": true,
    "root-dx": true,
    "root-dev": true,
    "root-mlops": true,
  });

  const toggleTree = (treeId: string) => {
    setOpenTrees((prev) => ({
      ...prev,
      [treeId]: !prev[treeId],
    }));
  };

  const isAllSelected = activeRootId === "all" && activeNodeId === "all";

  return (
    <aside className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-xs text-accent font-bold">
            ⌥
          </span>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
            AI 활용 트리 네비게이터
          </h2>
        </div>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-600">
          총 {trees.length}개 트리
        </span>
      </div>

      {/* View All Button */}
      <button
        type="button"
        onClick={() => {
          onSelectRoot("all");
          onSelectNode("all", "all");
        }}
        className={`mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
          isAllSelected
            ? "bg-zinc-950 text-white shadow-sm"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-sm">🌐</span>
          <span>전체 활용 사례 보기</span>
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            isAllSelected ? "bg-accent text-zinc-950" : "bg-zinc-200 text-zinc-700"
          }`}
        >
          {totalPostsCount}
        </span>
      </button>

      {/* Multiple Tree Hierarchies */}
      <div className="space-y-3">
        {trees.map((tree) => {
          const isOpen = !!openTrees[tree.id];
          const isTreeActive = activeRootId === tree.id;
          const treePostCount = tree.nodes.reduce(
            (acc, node) => acc + node.postIds.length,
            0
          );

          return (
            <div
              key={tree.id}
              className={`rounded-xl border transition-colors ${
                isTreeActive
                  ? "border-zinc-300 bg-zinc-50/60"
                  : "border-zinc-100 bg-white hover:border-zinc-200"
              }`}
            >
              {/* Tree Root Header */}
              <div className="flex items-center justify-between p-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectRoot(tree.id);
                    onSelectNode(tree.id, "all");
                  }}
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  <span className="text-base select-none">{tree.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`truncate text-xs font-bold ${
                        isTreeActive ? "text-zinc-950" : "text-zinc-700"
                      }`}
                    >
                      {tree.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium truncate">
                      {tree.englishName}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1.5 ml-2">
                  <span className="rounded-full bg-zinc-100 px-1.5 py-0.2 text-[10px] font-bold text-zinc-500">
                    {treePostCount}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTree(tree.id);
                    }}
                    aria-label={`${tree.name} 트리 펼치기/접기`}
                    className="flex h-6 w-6 items-center justify-center rounded text-xs text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-800"
                  >
                    {isOpen ? "−" : "+"}
                  </button>
                </div>
              </div>

              {/* Sub Nodes / Leaf Branches */}
              {isOpen && (
                <div className="border-t border-zinc-100 px-2 py-1.5 space-y-1">
                  {tree.nodes.map((node) => {
                    const isNodeActive =
                      activeRootId === tree.id && activeNodeId === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectNode(tree.id, node.id)}
                        className={`group relative flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                          isNodeActive
                            ? "bg-zinc-950 font-bold text-white shadow-xs"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isNodeActive ? "bg-accent" : "bg-zinc-300 group-hover:bg-zinc-400"
                            }`}
                          />
                          <span className="truncate">{node.label}</span>
                        </div>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] ${
                            isNodeActive
                              ? "bg-zinc-800 text-zinc-200"
                              : "text-zinc-400 group-hover:text-zinc-600"
                          }`}
                        >
                          {node.postIds.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
