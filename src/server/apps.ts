import "server-only";

import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppRecord } from "@/domain/apps/types";

const appSelect = "id,slug,name,tagline,summary,description,category,platforms,publication_status,product_status,featured,featured_rank,icon_url,hero_image_url,image_alt,app_store_url,play_store_url,web_url,seo_title,seo_description,published_at,created_at,updated_at";

export async function listAdminApps() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`앱 목록을 불러오지 못했습니다: ${error.message}`);
  return (data ?? []) as AppRecord[];
}

export async function getAdminAppById(id: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(`앱을 불러오지 못했습니다: ${error.message}`);
  return data as AppRecord | null;
}

export async function getPublishedApps(options: { featured?: boolean; limit?: number } = {}) {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("apps")
    .select(appSelect)
    .eq("publication_status", "published")
    .lte("published_at", new Date().toISOString())
    .is("deleted_at", null);

  if (options.featured) {
    query = query.eq("featured", true).order("featured_rank", { ascending: true, nullsFirst: false });
  } else {
    query = query.order("published_at", { ascending: false });
  }

  if (options.limit) query = query.limit(options.limit);
  const { data, error } = await query;

  if (error) {
    console.error("Published apps query failed", error.message);
    return [];
  }

  return (data ?? []) as AppRecord[];
}

export async function getPublishedAppBySlug(slug: string) {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .eq("slug", slug)
    .eq("publication_status", "published")
    .lte("published_at", new Date().toISOString())
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    console.error("Published app query failed", error.message);
    return null;
  }

  return data as AppRecord | null;
}
