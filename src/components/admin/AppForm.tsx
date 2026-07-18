"use client";

import { useActionState } from "react";
import { saveAppAction, type AppFormState } from "@/app/admin/(protected)/apps/actions";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  platformOptions,
  productLabels,
  productStatuses,
  publicationLabels,
  publicationStatuses,
  type AppRecord,
} from "@/domain/apps/types";

const initialState: AppFormState = { error: "" };
const inputClass = "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition focus:border-primary";

export default function AppForm({ app }: { app?: AppRecord | null }) {
  const [state, formAction, pending] = useActionState(saveAppAction, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {app ? <input type="hidden" name="app_id" value={app.id} /> : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold">기본 정보</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-300">앱 이름<input name="name" defaultValue={app?.name} maxLength={100} required className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300">slug<input name="slug" defaultValue={app?.slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="my-app" required className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">한 줄 소개<input name="tagline" defaultValue={app?.tagline} maxLength={160} className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">목록 요약<textarea name="summary" defaultValue={app?.summary} maxLength={600} rows={3} className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">상세 설명<textarea name="description" defaultValue={app?.description} maxLength={10000} rows={8} className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300">카테고리<input name="category" defaultValue={app?.category ?? "기타"} maxLength={60} className={`mt-2 ${inputClass}`} /></label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-300">플랫폼</legend>
            <div className="flex min-h-12 flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              {platformOptions.map((platform) => (
                <label key={platform} className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="platforms" value={platform} defaultChecked={app?.platforms.includes(platform)} />{platform}</label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold">상태와 노출</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-300">제품 상태<select name="product_status" defaultValue={app?.product_status ?? "coming_soon"} className={`mt-2 ${inputClass}`}>{productStatuses.map((status) => <option key={status} value={status}>{productLabels[status]}</option>)}</select></label>
          <label className="text-sm font-medium text-slate-300">게시 상태<select name="publication_status" defaultValue={app?.publication_status ?? "draft"} className={`mt-2 ${inputClass}`}>{publicationStatuses.map((status) => <option key={status} value={status}>{publicationLabels[status]}</option>)}</select></label>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300"><input type="checkbox" name="featured" defaultChecked={app?.featured} />홈페이지 추천 앱</label>
          <label className="text-sm font-medium text-slate-300">추천 노출 순서<input type="number" name="featured_rank" min={0} step={1} defaultValue={app?.featured_rank ?? ""} className={`mt-2 ${inputClass}`} /></label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold">이미지</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <MediaUploader label="앱 아이콘" fieldName="icon_url" initialUrl={app?.icon_url} previewShape="square" />
          <MediaUploader label="대표 이미지" fieldName="hero_image_url" initialUrl={app?.hero_image_url} />
          <label className="text-sm font-medium text-slate-300 md:col-span-2">대표 이미지 대체 텍스트<input name="image_alt" defaultValue={app?.image_alt} maxLength={200} className={`mt-2 ${inputClass}`} /></label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold">외부 링크와 SEO</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-300">App Store URL<input type="url" name="app_store_url" defaultValue={app?.app_store_url ?? ""} placeholder="https://" className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300">Google Play URL<input type="url" name="play_store_url" defaultValue={app?.play_store_url ?? ""} placeholder="https://" className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">웹·데모 URL<input type="url" name="web_url" defaultValue={app?.web_url ?? ""} placeholder="https://" className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300">SEO 제목<input name="seo_title" defaultValue={app?.seo_title} maxLength={70} className={`mt-2 ${inputClass}`} /></label>
          <label className="text-sm font-medium text-slate-300">SEO 설명<input name="seo_description" defaultValue={app?.seo_description} maxLength={180} className={`mt-2 ${inputClass}`} /></label>
        </div>
      </section>

      {state.error ? <p aria-live="polite" className="rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-100">{state.error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={pending} className="rounded-xl bg-primary px-7 py-3 font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50">{pending ? "저장 중..." : app ? "변경사항 저장" : "앱 만들기"}</button>
      </div>
    </form>
  );
}
