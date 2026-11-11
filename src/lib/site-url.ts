// Canonical site origin, no trailing slash. In production, canonicalizes to
// https://www.honglabai.com (matching the Vercel primary production domain)
// unless overridden by an explicit SITE_URL environment variable.
export function getSiteUrl() {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) {
    // If Vercel still emits the .vercel.app internal hostname, prefer the custom domain
    if (vercelProd.includes("vercel.app")) {
      return "https://www.honglabai.com";
    }
    return `https://${vercelProd.replace(/\/$/, "")}`;
  }

  if (process.env.NODE_ENV === "production") {
    return "https://www.honglabai.com";
  }

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
