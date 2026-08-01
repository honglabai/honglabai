"use client";

import Image from "next/image";
import { useState } from "react";

type MediaUploaderProps = {
  label: string;
  fieldName: "icon_url" | "hero_image_url";
  initialUrl?: string | null;
  previewShape?: "square" | "wide";
};

export default function MediaUploader({ label, fieldName, initialUrl, previewShape = "wide" }: MediaUploaderProps) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const result = (await response.json()) as { url?: string; message?: string };
      if (!response.ok || !result.url) throw new Error(result.message || "업로드에 실패했습니다.");
      setUrl(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <input type="hidden" name={fieldName} value={url} />
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        {url ? (
          <div className={`relative mb-4 overflow-hidden rounded-lg bg-black/40 ${previewShape === "square" ? "h-28 w-28" : "aspect-[16/7] w-full"}`}>
            <Image src={url} alt={`${label} 미리보기`} fill sizes={previewShape === "square" ? "112px" : "(max-width: 768px) 100vw, 500px"} className={`object-cover ${previewShape === "wide" ? "object-top" : ""}`} />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-primary/50">
            {uploading ? "업로드 중..." : "이미지 선택"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
                event.currentTarget.value = "";
              }}
            />
          </label>
          {url ? <button type="button" onClick={() => setUrl("")} className="text-sm text-slate-400 hover:text-white">이미지 제거</button> : null}
          <span className="text-xs text-slate-400">JPG·PNG·WebP·GIF, 최대 5MB</span>
        </div>
        {error ? <p aria-live="polite" className="mt-3 text-sm text-red-300">{error}</p> : null}
      </div>
    </div>
  );
}
