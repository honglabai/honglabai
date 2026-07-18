# HongLabAI Portfolio

HongLabAI의 앱 포트폴리오와 관리자 기반 콘텐츠 운영을 위한 Next.js 홈페이지입니다.

## 주요 경로

- `/` — 기존 HongLabAI 랜딩 페이지
- `/apps` — 게시된 앱 포트폴리오
- `/apps/[slug]` — 게시된 앱 상세 페이지
- `/about` — HongLabAI 소개
- `/contact` — 프로젝트 문의
- `/admin/login` — 승인된 관리자 로그인
- `/admin` — 앱·문의 현황 대시보드
- `/admin/apps` — 앱 작성·수정·게시·보관
- `/admin/inquiries` — 홈페이지 문의 관리

## 로컬 실행

1. 의존성을 설치합니다.

   ```bash
   npm ci
   ```

2. `.env.example`을 참고해 `.env.local`에 Supabase URL, publishable key와 서버 전용 `GEMINI_API_KEY`를 설정합니다. Supabase `service_role` 또는 secret key는 사용하지 않습니다.

3. 개발 서버를 실행합니다.

   ```bash
   npm run dev
   ```

4. 프로덕션 빌드를 검증합니다.

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

구현 기준은 [`docs/HOMEPAGE_ADMIN_PORTFOLIO_PLAN.md`](docs/HOMEPAGE_ADMIN_PORTFOLIO_PLAN.md)를 따릅니다.

## Supabase 연결

데이터베이스 스키마, RLS 정책과 Storage 버킷은 `supabase/migrations`에 있습니다. 프로젝트 연결, 첫 Owner 생성과 검증 절차는 [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md)를 따릅니다.

의존성 취약점 조치 내용은 [`docs/DEPENDENCY_SECURITY.md`](docs/DEPENDENCY_SECURITY.md)에 기록합니다.
