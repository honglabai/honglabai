"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateAppForm } from "@/domain/apps/validation";
import { canEdit, canPublish, requireAdmin } from "@/server/auth";
import type { Tables } from "@/types/database";

export type AppFormState = { error: string };

export async function saveAppAction(_previousState: AppFormState, formData: FormData): Promise<AppFormState> {
  const { supabase, user, admin } = await requireAdmin();

  if (!canEdit(admin.role)) {
    return { error: "이 계정에는 앱을 수정할 권한이 없습니다." };
  }

  const result = validateAppForm(formData);
  if (!result.ok) return { error: result.error };

  const appIdValue = formData.get("app_id");
  const appId = typeof appIdValue === "string" && appIdValue ? appIdValue : null;
  let previous: Tables<"apps"> | null = null;

  if (appId) {
    const { data, error } = await supabase.from("apps").select("*").eq("id", appId).is("deleted_at", null).maybeSingle();
    if (error || !data) return { error: "수정할 앱을 찾을 수 없습니다." };
    previous = data;
  }

  if (!canPublish(admin.role)) {
    if (result.data.publication_status === "published" || previous?.publication_status === "published") {
      return { error: "게시된 앱 편집과 게시 상태 변경은 Owner 또는 Admin만 가능합니다." };
    }
  }

  const publishedAt = result.data.publication_status === "published"
    ? (typeof previous?.published_at === "string" ? previous.published_at : new Date().toISOString())
    : null;
  const payload = {
    ...result.data,
    published_at: publishedAt,
    updated_by: user.id,
    version: typeof previous?.version === "number" ? previous.version + 1 : 1,
  };

  const mutation = appId
    ? supabase.from("apps").update(payload).eq("id", appId).select("*").single()
    : supabase.from("apps").insert({ ...payload, created_by: user.id }).select("*").single();
  const { data: saved, error } = await mutation;

  if (error || !saved) {
    const message = error?.code === "23505" ? "이미 사용 중인 slug입니다." : (error?.message ?? "앱 저장에 실패했습니다.");
    return { error: message };
  }

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: appId ? "app.updated" : "app.created",
    entity_type: "app",
    entity_id: saved.id,
    before_data: previous,
    after_data: saved,
  });

  revalidatePath("/");
  revalidatePath("/apps");
  revalidatePath(`/apps/${saved.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/apps");
  redirect(`/admin/apps?message=${encodeURIComponent(appId ? "앱이 수정되었습니다." : "앱이 생성되었습니다.")}`);
}

export async function archiveAppAction(formData: FormData) {
  const { supabase, user, admin } = await requireAdmin();
  if (!canPublish(admin.role)) redirect("/admin/apps?error=권한이 없습니다.");

  const appId = formData.get("app_id");
  if (typeof appId !== "string" || !appId) redirect("/admin/apps?error=앱 ID가 필요합니다.");

  const { data: previous } = await supabase.from("apps").select("*").eq("id", appId).maybeSingle();
  if (!previous) redirect("/admin/apps?error=앱을 찾을 수 없습니다.");

  const { error } = await supabase
    .from("apps")
    .update({ publication_status: "archived", deleted_at: new Date().toISOString(), updated_by: user.id })
    .eq("id", appId);

  if (error) redirect(`/admin/apps?error=${encodeURIComponent(error.message)}`);

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "app.archived",
    entity_type: "app",
    entity_id: appId,
    before_data: previous,
  });

  revalidatePath("/");
  revalidatePath("/apps");
  revalidatePath("/admin/apps");
  redirect("/admin/apps?message=앱이 보관되었습니다.");
}
