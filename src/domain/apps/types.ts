export const publicationStatuses = ["draft", "in_review", "published", "archived"] as const;
export const productStatuses = ["coming_soon", "beta", "live", "maintenance", "discontinued"] as const;
export const platformOptions = ["Web", "iOS", "Android", "Desktop"] as const;

export type PublicationStatus = (typeof publicationStatuses)[number];
export type ProductStatus = (typeof productStatuses)[number];

export type AppRecord = {
  id: string;
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
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const publicationLabels: Record<PublicationStatus, string> = {
  draft: "초안",
  in_review: "검토 중",
  published: "게시",
  archived: "보관",
};

export const productLabels: Record<ProductStatus, string> = {
  coming_soon: "출시 예정",
  beta: "베타",
  live: "운영 중",
  maintenance: "점검 중",
  discontinued: "서비스 종료",
};
