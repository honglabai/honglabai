"use client";

import { useEffect } from "react";

// Replaces the root layout when it crashes, so it must render <html>/<body>
// itself and cannot rely on global styles from the layout.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Root layout error", error);
  }, [error]);

  return (
    <html lang="ko">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f7f8fb", color: "#18181b", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.75rem" }}>문제가 발생했습니다</h1>
          <p style={{ color: "#52525b", margin: "0 0 1.5rem" }}>페이지를 불러오지 못했습니다. 다시 시도해 주세요.</p>
          <button
            type="button"
            onClick={reset}
            style={{ background: "#d4f24b", color: "#18181b", border: 0, borderRadius: "0.5rem", padding: "0.75rem 1.5rem", fontWeight: 700, cursor: "pointer" }}
          >
            다시 시도
          </button>
          {error.digest ? <p style={{ color: "#a1a1aa", fontSize: "0.75rem", marginTop: "1.5rem" }}>오류 코드: {error.digest}</p> : null}
        </div>
      </body>
    </html>
  );
}
