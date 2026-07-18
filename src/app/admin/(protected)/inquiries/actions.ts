"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/server/auth";

const allowedStatuses = new Set(["new", "in_progress", "resolved", "spam"]);

export async function updateInquiryStatusAction(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const inquiryId = formData.get("inquiry_id");
  const status = formData.get("status");
  if (typeof inquiryId !== "string" || typeof status !== "string" || !allowedStatuses.has(status)) return;

  const { data: previous } = await supabase.from("inquiries").select("*").eq("id", inquiryId).maybeSingle();
  const { data: updated, error } = await supabase.from("inquiries").update({ status }).eq("id", inquiryId).select("*").single();
  if (error) throw new Error(`문의 상태를 변경하지 못했습니다: ${error.message}`);

  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "inquiry.status_updated",
    entity_type: "inquiry",
    entity_id: inquiryId,
    before_data: previous,
    after_data: updated,
  });
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
}
