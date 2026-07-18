import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AppForm from "@/components/admin/AppForm";
import { canEdit, requireAdmin } from "@/server/auth";
import { getAdminAppById } from "@/server/apps";

export const metadata: Metadata = { title: "앱 편집" };
type PageProps = { params: Promise<{ id: string }> };

export default async function EditAppPage({ params }: PageProps) {
  const { admin } = await requireAdmin();
  if (!canEdit(admin.role)) redirect("/admin/apps");
  const { id } = await params;
  const app = await getAdminAppById(id);
  if (!app) notFound();
  return <div><p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">Edit Portfolio App</p><h1 className="mb-8 text-3xl font-black">{app.name} 편집</h1><AppForm app={app} /></div>;
}
