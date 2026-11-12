"use client";

import { useState } from "react";
import type { TreeRoot } from "@/domain/board/types";
import { IconGrid, IconLayers, TreeIcon } from "./Icons";

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
  const [openTrees, setOpenTrees] = useState<Record<string, boolean>>(() =>
    trees.reduce<Record<string, boolean>>((acc, t) => {
      acc[t.id] = true;
      return acc;
    }, {
      "root-genai": true,
      "root-dx": true,
      "root-dev": true,
      "root-mlops": true,
      "root-motion": true,
    })
  );

  const toggleTree = (treeId: string) => {
    setOpenTrees((prev) => ({
      ...prev,
      [treeId]: !prev[treeId],
    }));
  };

  const isAllSelected = activeRootId === "all" && activeNodeId === "all";

  return (
    <aside className="w-full rounded-2xl border border-zinc-200/90 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-800">
            <IconLayers className="h-3.5 w-3.5 text-zinc-700" />
          </span>
          <h2 className="text-xs font-bold text-zinc-900 tracking-tight">
            기술 분류 트리 네비게이터
          </h2>
        </div>
        <span className="rounded border border-zinc-200/80 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-mono tabular-nums text-zinc-500">
          {trees.length} trees
        </span>
      </div>

      {/* View All Button */}
      <button
        type="button"
        onClick={() => {
          onSelectRoot("all");
          onSelectNode("all", "all");
        }}
        className={`mb-3 flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
          isAllSelected
            ? "bg-zinc-950 text-white"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
      >
        <span className="flex items-center gap-2">
          <IconGrid className={`h-4 w-4 ${isAllSelected ? "text-zinc-300" : "text-zinc-500"}`} />
          <span>전체 활용 사례</span>
        </span>
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-mono tabular-nums ${
            isAllSelected ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {totalPostsCount}
        </span>
      </button>

      {/* Multiple Tree Hierarchies */}
      <div className="space-y-2">
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
              className={`rounded-xl border transition-colors duration-150 ${
                isTreeActive
                  ? "border-zinc-300 bg-zinc-50/70"
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
                  className="flex flex-1 items-center gap-2.5 text-left min-w-0"
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isTreeActive ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700"}`}>
                    <TreeIcon id={tree.id} className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`truncate text-xs font-semibold ${
                        isTreeActive ? "text-zinc-950" : "text-zinc-700"
                      }`}
                    >
                      {tree.name}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-400 truncate">
                      {tree.englishName}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1.5 ml-2">
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono tabular-nums text-zinc-500">
                    {treePostCount}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTree(tree.id);
                    }}
                    aria-label={`${tree.name} 트리 펼치기/접기`}
                    className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-800"
                  >
                    <svg
                      className={`h-3 w-3 stroke-[2] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sub Nodes / Leaf Branches */}
              {isOpen && (
                <div className="border-t border-zinc-100 px-2 py-1.5 space-y-0.5">
                  {tree.nodes.map((node) => {
                    const isNodeActive =
                      activeRootId === tree.id && activeNodeId === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectNode(tree.id, node.id)}
                        className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors duration-150 ${
                          isNodeActive
                            ? "bg-zinc-950 font-semibold text-white"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isNodeActive ? "bg-white" : "bg-zinc-300 group-hover:bg-zinc-400"
                            }`}
                          />
                          <span className="truncate">{node.label}</span>
                        </div>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-mono tabular-nums ${
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
