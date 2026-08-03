import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

// Distributed, atomic rate limit backed by the check_rate_limit Postgres RPC.
// Replaces the previous in-memory Map, which reset on cold start and did not
// share state across serverless instances (i.e. did not actually limit).
//
// ponytail: fails OPEN when the limiter RPC errors — availability over
// strictness. This is defense-in-depth; auth also relies on Supabase's own
// throttling and the admin_users gate. Flip the early return to
// { allowed: false } if you want fail-closed on the paid/LLM routes.
export async function checkRateLimit(
  client: SupabaseClient<Database>,
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const { data, error } = await client.rpc("check_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: Math.ceil(windowMs / 1000),
  });

  const row = data?.[0];
  if (error || !row) {
    console.error("rate limit check failed", error?.message);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: row.allowed, retryAfterSeconds: row.retry_after_seconds };
}
