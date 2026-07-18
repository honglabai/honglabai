import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminRole = "owner" | "admin" | "editor" | "viewer";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  status: "active" | "suspended";
};

export async function getAuthenticatedAdmin() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("id,email,name,role,status")
    .eq("id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (adminError || !admin) {
    return null;
  }

  return {
    supabase,
    user,
    admin: admin as AdminUser,
  };
}

export async function requireAdmin() {
  const context = await getAuthenticatedAdmin();

  if (!context) {
    redirect("/admin/login");
  }

  return context;
}

export function canEdit(role: AdminRole) {
  return role === "owner" || role === "admin" || role === "editor";
}

export function canPublish(role: AdminRole) {
  return role === "owner" || role === "admin";
}
