import {
  platformOptions,
  productStatuses,
  publicationStatuses,
  type ProductStatus,
  type PublicationStatus,
} from "@/domain/apps/types";

export type AppInput = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  category: string;
  platforms: string[];
  publication_status: PublicationStatus;
  product_status: ProductStatus;
  featured: boolean;
  featured_rank: number | null;
  icon_url: string | null;
  hero_image_url: string | null;
  image_alt: string;
  app_store_url: string | null;
  play_store_url: string | null;
  web_url: string | null;
  seo_title: string;
  seo_description: string;
};

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalUrl(formData: FormData, key: string) {
  const value = text(formData, key);
  return value || null;
}

function isHttpsUrl(value: string | null) {
  if (!value) return true;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAppForm(formData: FormData):
  | { ok: true; data: AppInput }
  | { ok: false; error: string } {
  const publicationStatus = text(formData, "publication_status") as PublicationStatus;
  const productStatus = text(formData, "product_status") as ProductStatus;
  const platforms = formData
    .getAll("platforms")
    .filter((value): value is string => typeof value === "string" && platformOptions.includes(value as (typeof platformOptions)[number]));
  const rankValue = text(formData, "featured_rank");

  const data: AppInput = {
    slug: text(formData, "slug").toLowerCase(),
    name: text(formData, "name"),
    tagline: text(formData, "tagline"),
    summary: text(formData, "summary"),
    description: text(formData, "description"),
    category: text(formData, "category") || "기타",
    platforms,
    publication_status: publicationStatus,
    product_status: productStatus,
    featured: formData.get("featured") === "on",
    featured_rank: rankValue ? Number(rankValue) : null,
    icon_url: optionalUrl(formData, "icon_url"),
    hero_image_url: optionalUrl(formData, "hero_image_url"),
    image_alt: text(formData, "image_alt"),
    app_store_url: optionalUrl(formData, "app_store_url"),
    play_store_url: optionalUrl(formData, "play_store_url"),
    web_url: optionalUrl(formData, "web_url"),
    seo_title: text(formData, "seo_title"),
    seo_description: text(formData, "seo_description"),
  };

  if (!data.name || !data.slug) {
    return { ok: false, error: "앱 이름과 slug는 필수입니다." };
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    return { ok: false, error: "slug는 소문자 영문, 숫자, 하이픈만 사용할 수 있습니다." };
  }

  if (!publicationStatuses.includes(data.publication_status) || !productStatuses.includes(data.product_status)) {
    return { ok: false, error: "앱 상태 값이 올바르지 않습니다." };
  }

  if ([data.app_store_url, data.play_store_url, data.web_url].some((url) => !isHttpsUrl(url))) {
    return { ok: false, error: "외부 링크는 올바른 HTTPS 주소여야 합니다." };
  }

  if (data.featured_rank !== null && (!Number.isInteger(data.featured_rank) || data.featured_rank < 0)) {
    return { ok: false, error: "추천 순서는 0 이상의 정수여야 합니다." };
  }

  if (data.publication_status === "published") {
    if (!data.tagline || !data.summary || !data.description || !data.category || data.platforms.length === 0) {
      return { ok: false, error: "게시하려면 소개, 설명, 카테고리와 플랫폼을 모두 입력해야 합니다." };
    }

    if (!data.icon_url || !data.hero_image_url || !data.image_alt) {
      return { ok: false, error: "게시하려면 아이콘, 대표 이미지와 대체 텍스트가 필요합니다." };
    }

    if (!data.seo_title || !data.seo_description) {
      return { ok: false, error: "게시하려면 SEO 제목과 설명이 필요합니다." };
    }

    if (!data.app_store_url && !data.play_store_url && !data.web_url) {
      return { ok: false, error: "게시하려면 앱스토어 또는 웹 링크가 하나 이상 필요합니다." };
    }
  }

  return { ok: true, data };
}
