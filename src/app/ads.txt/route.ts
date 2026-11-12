import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

const ADS_TXT_CONTENT = `# HongLabAI Authorized Digital Sellers (ads.txt)
# Google AdSense official authorization
google.com, pub-8675047967209162, DIRECT, f08c47fec0942fa0
`;

export async function GET() {
  return new NextResponse(ADS_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
