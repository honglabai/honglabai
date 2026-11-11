// Canonical site origin, no trailing slash. In production, canonicalizes to
// https://honglabai.com unless overridden by an explicit SITE_URL environment variable.
export function getSiteUrl() {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.NODE_ENV === "production") {
    return "https://honglabai.com";
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
