import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AppForm from "@/components/admin/AppForm";
import { canEdit, requireAdmin } from "@/server/auth";

export const metadata: Metadata = { title: "새 앱 작성" };

export default async function NewAppPage() {
  const { admin } = await requireAdmin();
  if (!canEdit(admin.role)) redirect("/admin/apps");
  return <div><p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">New Portfolio App</p><h1 className="mb-8 text-3xl font-black">새 앱 작성</h1><AppForm /></div>;
}
