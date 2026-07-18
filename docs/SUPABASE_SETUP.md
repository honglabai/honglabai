# HongLabAI Supabase 연결·운영 절차

## 현재 상태

HongLabAI 전용 Supabase 프로젝트를 서울 리전에 생성하고 애플리케이션의 Auth, Postgres, Storage 연동을 연결했다.

| 항목 | 값 |
|---|---|
| 프로젝트 | `HongLabAI` |
| Project ref | `tbqgadflnkfpctjfblgv` |
| 리전 | `ap-northeast-2` |
| 프로젝트 상태 | `ACTIVE_HEALTHY` |
| 적용 마이그레이션 | `honglabai_admin_portfolio`, `fix_advisor_indexes_policies` |
| 생성 타입 | `src/types/database.ts` |

## 1. 프로젝트 확정

운영 환경은 위 HongLabAI 전용 프로젝트를 사용한다. 다른 환경을 만들 때는 기존 테이블과 Storage 버킷을 백업하고 마이그레이션 충돌 여부를 검토한다.

지원 런타임은 Node.js 22 이상을 사용한다. 클라이언트에는 publishable key만 제공하며 `service_role` 또는 secret key는 저장하지 않는다.

## 2. 마이그레이션 적용

Supabase CLI로 대상 프로젝트를 연결한 뒤 마이그레이션을 적용한다.

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

적용 대상 파일:

```text
supabase/migrations/20260718080406_honglabai_admin_portfolio.sql
```

마이그레이션은 다음 항목을 생성한다.

- `admin_users`, `apps`, `app_media`, `inquiries`, `audit_logs` 테이블
- 모든 공개 스키마 테이블의 RLS 정책
- 공개 다운로드·관리자 업로드용 `portfolio-media` Storage 버킷
- 게시 앱, 추천 앱, 문의 상태 조회용 인덱스
- 역할별 앱 게시·수정·삭제 정책

## 3. 첫 Owner 생성

첫 Owner 이메일을 확정한 뒤 Supabase Auth 사용자를 생성한다. 비밀번호를 채팅, 저장소 또는 로그에 남기지 않으며 `/admin/login`의 일회용 이메일 링크 로그인을 우선 사용한다. Auth 사용자가 생성되면 SQL Editor에서 해당 이메일을 Owner로 승인한다.

```sql
insert into public.admin_users (id, email, name, role)
select id, email, 'HongLabAI Owner', 'owner'
from auth.users
where email = 'OWNER_EMAIL@example.com';
```

애플리케이션에는 공개 회원가입 기능이 없다. Auth 사용자와 `admin_users`의 활성 레코드가 모두 있어야 `/admin`에 접근할 수 있다. 이메일 링크는 `/auth/callback`에서 PKCE 코드를 세션으로 교환하고 `/admin`으로 이동한다.

## 4. 환경 변수

Supabase Dashboard의 Connect 화면에서 프로젝트 URL과 publishable key를 확인한다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

publishable key는 RLS 적용을 전제로 브라우저에 노출 가능한 키다. 관리자 권한은 키가 아니라 Auth 사용자, `admin_users` 승인과 RLS로 결정한다.

## 5. 적용 후 검증

1. `npm run dev` 실행 후 `/admin/login`에서 Owner 로그인을 확인한다.
2. `/admin/apps/new`에서 초안 앱을 생성한다.
3. JPG 또는 PNG 이미지를 업로드하고 Storage의 `portfolio-media/{user-id}` 경로에 저장되는지 확인한다.
4. 필수 필드를 채우지 않은 앱의 게시가 차단되는지 확인한다.
5. 게시 후 `/`, `/apps`, `/apps/[slug]`에 60초 이내 반영되는지 확인한다.
6. 로그아웃 상태에서 `/admin`과 `/api/admin/media` 접근이 차단되는지 확인한다.
7. `/contact`에서 문의를 제출하고 `/admin/inquiries`에서 조회·상태 변경되는지 확인한다.
8. Supabase Security Advisor와 Performance Advisor를 실행하고 새 경고를 조치한다.

## 6. 운영 보안 기준

- 관리자 인증 경로에는 CDN 캐시를 적용하지 않는다.
- RLS를 우회하는 service key를 애플리케이션에 추가하지 않는다.
- 관리자를 정지할 때 `admin_users.status`를 `suspended`로 변경하고 Auth 세션도 해제한다.
- 업로드는 5MB 이하 JPG, PNG, WebP, GIF만 허용하며 서버에서 파일 시그니처를 재검증한다.
- 문의 요청 제한은 현재 서버 인스턴스 단위의 1차 방어다. 다중 인스턴스 운영 전에는 Redis 또는 데이터베이스 기반 제한으로 교체한다.
