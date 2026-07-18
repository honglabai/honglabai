"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LoginState = { error: string };
export type MagicLinkState = { error: string; message: string };

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || password.length < 8) {
    return { error: "이메일과 8자 이상의 비밀번호를 입력해 주세요." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase 환경 변수가 설정되지 않았습니다." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error || !data.user) {
    return { error: "로그인 정보가 올바르지 않습니다." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "활성 관리자 계정으로 등록되지 않은 사용자입니다." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function requestMagicLinkAction(
  _previousState: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  const email = formData.get("email");
  if (typeof email !== "string" || !email.trim()) {
    return { error: "관리자 이메일을 입력해 주세요.", message: "" };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase 환경 변수가 설정되지 않았습니다.", message: "" };

  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${siteUrl}/auth/callback?next=/admin`,
    },
  });

  if (error) return { error: "로그인 링크를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.", message: "" };
  return { error: "", message: "등록된 관리자라면 이메일로 일회용 로그인 링크가 전송됩니다." };
}
