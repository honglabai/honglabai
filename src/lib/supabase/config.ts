export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  // Supabase is disconnected as requested. Return null to ensure no remote database connection.
  return null;
}

export function isSupabaseConfigured() {
  return getSupabaseConfig() !== null;
}
