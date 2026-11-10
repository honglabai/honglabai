import "server-only";

import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { logger } from "@/server/logger";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppRecord } from "@/domain/apps/types";

const appSelect = "id,slug,name,tagline,summary,description,category,platforms,publication_status,product_status,featured,featured_rank,icon_url,hero_image_url,image_alt,app_store_url,play_store_url,web_url,seo_title,seo_description,published_at,created_at,updated_at";

export const STATIC_PORTFOLIO_APPS: AppRecord[] = [
  {
    id: "app-crossword",
    slug: "korean-crossword-puzzle",
    name: "지식 탐구 낱말퍼즐",
    tagline: "한국어 8대 지식 영역을 아우르는 반응형 낱말퍼즐 웹 앱",
    summary: "정치, 사회, 문화, 스포츠, 역사, 예술 등 8개 지식 분야와 2,480개 어휘를 수록한 단계별 관문형 십자말풀이 게임입니다.",
    description: "지식 탐구 낱말퍼즐은 한국어 8대 지식 영역(정치, 사회, 문화, 스포츠, 한국사, 세계사, 음악, 미술)을 기반으로 총 240개 보드와 2,480개의 어휘를 즐길 수 있는 반응형 십자말풀이 애플리케이션입니다. 한글 자모음 조합 가상 키패드, 실력 진단 테스트(Placement Test), 관문 승급 시스템, 오토 포커스 등 사용자 친화적인 퍼즐 경험을 제공합니다.",
    category: "퍼즐 & 에듀테크",
    platforms: ["Web", "Desktop", "Mobile"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 1,
    icon_url: null,
    hero_image_url: null,
    image_alt: "지식 탐구 낱말퍼즐 대표 이미지",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://korean-crossword-puzzle.vercel.app",
    seo_title: "지식 탐구 낱말퍼즐 - 한국어 8대 지식 영역 크로스워드",
    seo_description: "한국어 8대 지식 영역과 2,480개 어휘를 아우르는 반응형 십자말풀이 웹 게임",
    published_at: "2026-08-01T00:00:00.000Z",
    created_at: "2026-08-01T00:00:00.000Z",
    updated_at: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "app-sudoku",
    slug: "my-love-sudoku",
    name: "내사랑 스도쿠 (My Love Sudoku)",
    tagline: "한 칸씩 풀고, 한 단계씩 성장하는 RPG형 스도쿠",
    summary: "5개 월드와 50개 정규 스테이지, 3단계 별점 보상 및 논리적 힌트 엔진을 탑재한 반응형 스도쿠 게임입니다.",
    description: "내사랑 스도쿠(My Love Sudoku)는 5개 월드, 50개 정규 스테이지(보스전 포함)와 100% 유일해 검증 백트래킹 솔버를 갖춘 고품질 스도쿠 게임입니다. 초보자를 위한 단계별 가이드부터 Naked Single, Hidden Single 논리 추론 힌트, RPG형 레벨업 및 업적 배지 시스템, 오프라인 PWA 지원까지 완성도 높은 플레이 경험을 선사합니다.",
    category: "퍼즐 & 두뇌훈련",
    platforms: ["Web", "Desktop", "Mobile"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 2,
    icon_url: null,
    hero_image_url: null,
    image_alt: "내사랑 스도쿠 대표 이미지",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://my-love-sudoku.vercel.app",
    seo_title: "내사랑 스도쿠 - 논리적 힌트와 50개 스테이지의 두뇌 퍼즐",
    seo_description: "5개 월드, 50개 정규 스테이지와 RPG 성장 시스템을 갖춘 스도쿠 웹 게임",
    published_at: "2026-08-02T00:00:00.000Z",
    created_at: "2026-08-02T00:00:00.000Z",
    updated_at: "2026-08-02T00:00:00.000Z",
  },
  {
    id: "app-mbtitarot",
    slug: "mbtitarot",
    name: "MBTI 타로 (MBTI Tarot)",
    tagline: "성격 유형과 타로의 직관이 만나는 인터랙티브 운세 상담",
    summary: "16가지 MBTI 성격 유형에 맞춘 타로 카드 리딩과 심층 성향 해석을 제공하는 서비스입니다.",
    description: "MBTI 타로는 현대적인 성격 유형 이론(MBTI)과 전통 타로 리딩을 결합하여, 사용자의 성향에 최적화된 해석과 맞춤형 통찰을 제공하는 인터랙티브 웹 서비스입니다.",
    category: "라이프스타일 & 엔터테인먼트",
    platforms: ["Web", "Mobile"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 3,
    icon_url: null,
    hero_image_url: null,
    image_alt: "MBTI 타로 대표 이미지",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://mbtitarot.co.kr",
    seo_title: "MBTI 타로 - 성격 유형 맞춤 인터랙티브 타로 리딩",
    seo_description: "16가지 MBTI 성향에 최적화된 카드 리딩과 깊이 있는 운세 해석",
    published_at: "2026-08-03T00:00:00.000Z",
    created_at: "2026-08-03T00:00:00.000Z",
    updated_at: "2026-08-03T00:00:00.000Z",
  },
];

export async function listAdminApps() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return STATIC_PORTFOLIO_APPS;

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`앱 목록을 불러오지 못했습니다: ${error.message}`);
  return (data ?? []) as AppRecord[];
}

export async function getAdminAppById(id: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return STATIC_PORTFOLIO_APPS.find((app) => app.id === id) ?? null;

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(`앱을 불러오지 못했습니다: ${error.message}`);
  return data as AppRecord | null;
}

export async function getPublishedApps(options: { featured?: boolean; limit?: number } = {}) {
  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    let apps = [...STATIC_PORTFOLIO_APPS];
    if (options.featured) {
      apps = apps.filter((app) => app.featured).sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99));
    }
    if (options.limit) {
      apps = apps.slice(0, options.limit);
    }
    return apps;
  }

  let query = supabase
    .from("apps")
    .select(appSelect)
    .eq("publication_status", "published")
    .lte("published_at", new Date().toISOString())
    .is("deleted_at", null);

  if (options.featured) {
    query = query.eq("featured", true).order("featured_rank", { ascending: true, nullsFirst: false });
  } else {
    query = query.order("published_at", { ascending: false });
  }

  if (options.limit) query = query.limit(options.limit);
  const { data, error } = await query;

  if (error) {
    logger.error("apps.list_failed", { message: error.message });
    return [];
  }

  return (data ?? []) as AppRecord[];
}

export async function getPublishedAppBySlug(slug: string) {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return STATIC_PORTFOLIO_APPS.find((app) => app.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("apps")
    .select(appSelect)
    .eq("slug", slug)
    .eq("publication_status", "published")
    .lte("published_at", new Date().toISOString())
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    logger.error("apps.get_failed", { message: error.message });
    return null;
  }

  return data as AppRecord | null;
}
