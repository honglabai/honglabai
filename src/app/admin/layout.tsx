import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "관리자",
    template: "%s | HongLabAI 관리자",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
