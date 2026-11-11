import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Consolidate domain authority (SEO): 301 permanent redirect from www to apex domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.honglabai.com" }],
        destination: "https://honglabai.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "honglabai.com",
      },
      {
        protocol: "https",
        hostname: "www.honglabai.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
      {
        protocol: "https",
        hostname: "mbtitarot.co.kr",
      },
    ],
  },
};

export default nextConfig;
