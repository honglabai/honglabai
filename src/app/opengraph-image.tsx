import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HongLabAI - AI Software & Consulting";

// Default social card for every page that does not supply its own image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #1d4ed8 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 8, color: "#60a5fa", display: "flex" }}>HONGLAB</div>
        <div style={{ fontSize: 82, fontWeight: 800, marginTop: 12, display: "flex" }}>
          HongLab<span style={{ color: "#60a5fa" }}>AI</span>
        </div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#cbd5e1", display: "flex" }}>
          AI Software &amp; Consulting
        </div>
        <div style={{ fontSize: 28, marginTop: 16, color: "#94a3b8", display: "flex" }}>
          아이디어를 실제 제품으로 만듭니다
        </div>
      </div>
    ),
    size,
  );
}
