import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/server/logger";
import type { Database } from "@/types/database";

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

// What to do when the limiter itself is broken (RPC error / no rows):
//   "open"   — let the request through. Availability first. Use where the only
//              cost of abuse is noise (contact form) and other guards exist.
//   "closed" — reject. Use where each request spends money or a scarce quota,
//              so an outage cannot turn into an unbounded bill.
export type RateLimitFailureMode = "open" | "closed";

const FAILURE_RETRY_SECONDS = 60;

// Distributed, atomic rate limit backed by the check_rate_limit Postgres RPC.
// Replaces the previous in-memory Map, which reset on cold start and did not
// share state across serverless instances (i.e. did not actually limit).
export async function checkRateLimit(
  client: SupabaseClient<Database>,
  key: string,
  limit: number,
  windowMs: number,
  onFailure: RateLimitFailureMode = "open",
): Promise<RateLimitResult> {
  const { data, error } = await client.rpc("check_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: Math.ceil(windowMs / 1000),
  });

  const row = data?.[0];
  if (error || !row) {
    // A broken limiter must never be silent — this is the alert signal.
    logger.error("rate_limit.rpc_failed", { key, limit, onFailure, message: error?.message });

    return onFailure === "closed"
      ? { allowed: false, retryAfterSeconds: FAILURE_RETRY_SECONDS }
      : { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: row.allowed, retryAfterSeconds: row.retry_after_seconds };
}
