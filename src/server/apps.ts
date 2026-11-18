import "server-only";

import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { logger } from "@/server/logger";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppRecord } from "@/domain/apps/types";

const appSelect = "id,slug,name,tagline,summary,description,category,platforms,publication_status,product_status,featured,featured_rank,icon_url,hero_image_url,image_alt,app_store_url,play_store_url,web_url,seo_title,seo_description,published_at,created_at,updated_at";

export const STATIC_PORTFOLIO_APPS: AppRecord[] = [
  {
    id: "app-couponz",
    slug: "couponz",
    name: "쿠폰즈 (Couponz)",
    tagline: "쿠폰과 기프티콘을 만료일 순서로 관리하는 로컬 우선 지갑",
    summary: "받은 기프티콘과 쿠폰을 만료일 순으로 스마트하게 정리하고, 오프라인 매장에서도 즉시 바코드를 제시할 수 있는 프라이빗 지갑 서비스입니다.",
    description: "쿠폰즈(Couponz)는 메신저와 갤러리에 흩어진 모바일 쿠폰과 기프티콘을 만료일 순서로 한곳에서 깔끔하게 관리하는 로컬 우선(Local-First) 스마트 지갑입니다. 민감한 기프티콘 바코드와 번호를 외부 서버 전송 없이 기기 내 로컬 금고(Vault)에 안전하게 암호화 보관하며, 네트워크 연결이 없는 오프라인 매장에서도 즉시 바코드를 꺼내어 사용할 수 있습니다. 만료 임박 자동 알림, 사용 완료 상태 추적, 간편 복구키 지원 등 실생활에 꼭 필요한 편리함을 제공합니다.",
    category: "유틸리티 & 라이프스타일",
    platforms: ["Web", "Mobile", "PWA"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 1,
    icon_url: "/uploads/couponz-portfolio.webp",
    hero_image_url: "/uploads/couponz-portfolio.webp",
    image_alt: "쿠폰즈 모바일 지갑 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://cupons-seven.vercel.app",
    seo_title: "쿠폰즈 - 쿠폰·기프티콘 만료일 관리 로컬 우선 스마트 지갑",
    seo_description: "흩어진 기프티콘을 만료일 순으로 정리하고 오프라인에서도 안전하게 바코드를 제시하는 로컬 우선 모바일 지갑 앱",
    published_at: "2026-08-04T00:00:00.000Z",
    created_at: "2026-08-04T00:00:00.000Z",
    updated_at: "2026-08-04T00:00:00.000Z",
  },
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
    featured_rank: 2,
    icon_url: "/uploads/korean-crossword-portfolio.webp",
    hero_image_url: "/uploads/korean-crossword-portfolio.webp",
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
    featured_rank: 3,
    icon_url: "/uploads/my-love-sudoku-portfolio.webp",
    hero_image_url: "/uploads/my-love-sudoku-portfolio.webp",
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
    featured_rank: 4,
    icon_url: "/uploads/mbti-tarot-portfolio.webp",
    hero_image_url: "/uploads/mbti-tarot-portfolio.webp",
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
  {
    id: "app-miliyday",
    slug: "miliyday",
    name: "슬기로운 병영생활",
    tagline: "군 생활의 든든한 동반자, 복무일수 계산 및 군 생활 필수 가이드",
    summary: "전역일 및 복무율 실시간 계산, 진급 디데이, 휴가 관리 등 군 생활에 필요한 모든 정보를 한눈에 제공하는 스마트 병영 라이프 도우미입니다.",
    description: "슬기로운 병영생활(MiliyDay)은 대한민국 국군 장병과 곰신, 가족들을 위한 올인원 군 복무 관리 웹 애플리케이션입니다. 육군, 해군, 공군, 해병대, 사회복무요원 등 군별 복무 기간에 맞춘 전역일 실시간 카운트다운, 계급별 진급 디데이, 복무율 게이지, 휴가 및 외출/외박 기록 관리, 군 생활 필수 팁과 식단 확인 기능을 깔끔한 모바일 인터페이스로 제공합니다.",
    category: "라이프스타일 & 유틸리티",
    platforms: ["Web", "Mobile", "PWA"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 5,
    icon_url: "/uploads/miliyday-portfolio.webp",
    hero_image_url: "/uploads/miliyday-portfolio.webp",
    image_alt: "슬기로운 병영생활 모바일 앱 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://miliyday.vercel.app",
    seo_title: "슬기로운 병영생활 - 전역일 디데이 및 군 복무 올인원 가이드",
    seo_description: "전역일 실시간 계산, 진급일 디데이, 복무율 및 휴가 관리까지 군 생활의 든든한 동반자 모바일 웹앱",
    published_at: "2026-08-05T00:00:00.000Z",
    created_at: "2026-08-05T00:00:00.000Z",
    updated_at: "2026-08-05T00:00:00.000Z",
  },
  {
    id: "app-mymaek",
    slug: "network-crm",
    name: "마이맥 (MyMaek)",
    tagline: "성공을 위한 인맥관리, AI가 직접 관리해주는 나의 AI 비서",
    summary: "소중한 비즈니스 인맥과 관계를 AI가 능동적으로 분석하여, 매일 아침 맞춤형 안부 연락 추천과 호칭을 반영한 메시지 초안을 제안하는 스마트 CRM입니다.",
    description: "마이맥(MyMaek)은 복잡하고 잊기 쉬운 비즈니스 인맥 관리를 AI가 알아서 챙겨주는 지능형 개인 인맥 비서(Personal CRM)입니다. 매일 아침 맞춤형 브리핑을 통해 오늘 누구에게 어떤 계기로 연락해야 하는지 알려주며, 상대방의 직함과 기수에 맞춘 정중한 연락 메시지 초안을 자동으로 생성합니다. 모든 AI 추천에는 명확한 근거가 제시되며, 사용자가 직접 승인한 내용만 데이터에 안전하게 반영되는 신뢰성 높은 아키텍처를 제공합니다.",
    category: "비즈니스 & AI 솔루션",
    platforms: ["Web", "Desktop", "Mobile"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 6,
    icon_url: "/uploads/mymaek-portfolio.webp",
    hero_image_url: "/uploads/mymaek-portfolio.webp",
    image_alt: "마이맥 AI 인맥 비서 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://network-crm-theta.vercel.app",
    seo_title: "마이맥(MyMaek) - AI가 직접 챙겨주는 나의 스마트 인맥 비서 CRM",
    seo_description: "성공을 위한 능동적 인맥 관리, AI 맞춤형 아침 브리핑과 연락 메시지 초안을 제안하는 개인 맞춤형 AI CRM",
    published_at: "2026-08-06T00:00:00.000Z",
    created_at: "2026-08-06T00:00:00.000Z",
    updated_at: "2026-08-06T00:00:00.000Z",
  },
  {
    id: "app-pxguide",
    slug: "pxguide",
    name: "PX 구매 가이드",
    tagline: "이달의 할인 현황, PX 상품 소개와 스마트 최저가 쇼핑 가이드",
    summary: "국군복지단 PX 매장의 월별 할인 품목과 인기 상품 큐레이션, 실시간 일반 쇼핑몰 가격 비교 및 가까운 영외 PX 위치 검색 서비스를 제공합니다.",
    description: "PX 구매 가이드는 현역 군인, 군무원, 예비역 및 군 가족을 위해 국군복지단 PX 매장의 방대한 쇼핑 정보를 집대성한 전문 가이드 웹앱입니다. 화장품, 건강기능식품, 가공식품 등 PX 인기 아이템 큐레이션, 매월 업데이트되는 이달의 특별 할인 행사 정보, 쿠팡 등 주요 이커머스 최저가와의 실시간 가격 비교, 전국 영외 PX 위치 및 운영시간 안내 등 알뜰하고 현명한 쇼핑을 돕습니다.",
    category: "쇼핑 & 생활정보",
    platforms: ["Web", "Mobile", "PWA"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 7,
    icon_url: "/uploads/pxguide-portfolio.webp",
    hero_image_url: "/uploads/pxguide-portfolio.webp",
    image_alt: "PX 구매 가이드 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://pxguide.zeromorow.chatgpt.site",
    seo_title: "PX 구매 가이드 - 국군복지단 PX 월별 할인 및 최저가 쇼핑 안내",
    seo_description: "PX 인기 화장품·식품 큐레이션, 이달의 할인 행사, 최저가 가격비교 및 영외 PX 위치 찾기 스마트 가이드",
    published_at: "2026-08-07T00:00:00.000Z",
    created_at: "2026-08-07T00:00:00.000Z",
    updated_at: "2026-08-07T00:00:00.000Z",
  },
  {
    id: "app-pagol",
    slug: "pagol",
    name: "가자, 파골!",
    tagline: "점수는 간단하게, 파크골프는 즐겁게! 큰 버튼 디지털 스코어카드",
    summary: "회원가입 없이 1~4명이 함께 라운드를 돌며 큰 글씨와 원터치 버튼으로 타수를 기록하고 누적 통계를 확인하는 시니어 친화형 파크골프 앱입니다.",
    description: "가자, 파골!(Pagol)은 어르신들과 파크골프 동호인을 위해 직관적이고 큰 글씨·큰 버튼 인터페이스로 설계된 모바일 디지털 스코어카드입니다. 복잡한 가입 절차나 로그인 없이 구장 입장 즉시 1명에서 4명까지 동반자를 등록하여 18홀 타수를 원터치로 간편하게 기록할 수 있으며, 홀별 파(Par) 대비 스코어, 총타수 합산, 이전 라운드 기록 보관 기능을 제공합니다.",
    category: "스포츠 & 라이프스타일",
    platforms: ["Web", "Mobile", "PWA"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 8,
    icon_url: "/uploads/pagol-portfolio.webp",
    hero_image_url: "/uploads/pagol-portfolio.webp",
    image_alt: "가자 파골 디지털 스코어카드 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://pagol.zeromorow.chatgpt.site",
    seo_title: "가자, 파골! - 누구나 쉬운 큰 버튼 파크골프 디지털 스코어카드",
    seo_description: "가입 없이 1~4명 동반자 라운드 점수 기록, 시니어 친화형 큰 글씨 인터페이스의 파크골프 점수판",
    published_at: "2026-08-08T00:00:00.000Z",
    created_at: "2026-08-08T00:00:00.000Z",
    updated_at: "2026-08-08T00:00:00.000Z",
  },
  {
    id: "app-cuenote",
    slug: "cuenote",
    name: "큐노트 (CueNote)",
    tagline: "원고를 보며 나의 속도로 자연스럽게 말하는 스마트 텔레프롬프터",
    summary: "유튜브 촬영, 강의, 발표 시 원고를 큰 글씨로 띄워두고 스크롤 속도, 글자 크기, 좌우 반전을 맞춤 조절할 수 있는 무설치 웹 텔레프롬프터입니다.",
    description: "큐노트(CueNote)는 영상 크리에이터, 강사, 발표자를 위해 프로그램 설치 없이 웹 브라우저에서 즉시 실행되는 전문 텔레프롬프터 서비스입니다. 원고 텍스트를 붙여넣기만 하면 사용자의 말하는 속도에 맞춰 부드러운 자동 스크롤을 지원하며, 폰트 크기, 줄 간격, 텍스트 대비 조절뿐만 아니라 하프미러 및 카메라 프롬프터 장비용 상하좌우 반전(Mirror Mode) 기능을 완벽하게 지원합니다.",
    category: "생산성 & 미디어 도구",
    platforms: ["Web", "Desktop", "Mobile"],
    publication_status: "published",
    product_status: "live",
    featured: true,
    featured_rank: 9,
    icon_url: "/uploads/cuenote-portfolio.webp",
    hero_image_url: "/uploads/cuenote-portfolio.webp",
    image_alt: "큐노트 스마트 텔레프롬프터 대표 화면",
    app_store_url: null,
    play_store_url: null,
    web_url: "https://cuenote.zeromorow.chatgpt.site",
    seo_title: "큐노트(CueNote) - 무설치 발표·촬영용 스마트 웹 텔레프롬프터",
    seo_description: "발표와 영상 촬영을 위한 자동 스크롤 프롬프터. 속도 조절, 글자 크기, 하프미러 반전 모드 지원",
    published_at: "2026-08-09T00:00:00.000Z",
    created_at: "2026-08-09T00:00:00.000Z",
    updated_at: "2026-08-09T00:00:00.000Z",
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
