export type TreeComment = {
  id: string;
  author: string;
  authorRole?: string;
  content: string;
  createdAt: string;
  likes: number;
  parentId?: string | null;
  replies?: TreeComment[];
};

export type DifficultyLevel = "입문" | "중급" | "고급" | "실무 아키텍처";

export type BoardPost = {
  id: string;
  slug: string;
  rootTreeId: string;
  rootTreeName: string;
  treeId: string;
  treeName: string;
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  codeSnippet?: {
    language: string;
    code: string;
    description?: string;
  };
  architectureFlow?: string[];
  tags: string[];
  difficulty: DifficultyLevel;
  author: string;
  authorRole: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: TreeComment[];
};

export type TreeNode = {
  id: string;
  label: string;
  description: string;
  postIds: string[];
  children?: TreeNode[];
};

export type TreeRoot = {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  badge: string;
  description: string;
  themeColor: {
    accent: string;
    border: string;
    bg: string;
    text: string;
  };
  nodes: TreeNode[];
};
