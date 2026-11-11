import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HongLabAI | AI 소프트웨어 개발 & LLM 기술 컨설팅",
    short_name: "HongLabAI",
    description:
      "AI 기술과 소프트웨어 엔지니어링으로 비즈니스 아이디어를 실제 제품으로 만듭니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#b4d431",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
