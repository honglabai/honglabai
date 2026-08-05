# 운영 가이드

백업, 복구, 마이그레이션 롤백 절차. 사고가 났을 때 이 문서만 보고 대응할 수 있어야 한다.

## 백업

Supabase Free 플랜의 자동 백업은 보관 기간이 짧다. 정기적으로 직접 덤프를 받는다.

```bash
scripts/backup.sh              # 스키마 + 데이터
scripts/backup.sh --data-only  # 데이터만 (더 빠름)
```

- 결과물은 `backups/`에 타임스탬프로 저장되고, 최근 10개만 남기고 자동 정리된다.
- `backups/`는 gitignore 되어 있다. **덤프에는 문의 데이터(개인정보)가 들어 있으므로** 공유 드라이브나 저장소에 올리지 않는다.
- 사전 조건: `supabase link --project-ref tbqgadflnkfpctjfblgv` 완료.

권장 주기: 주 1회 + 마이그레이션 적용 직전 1회.

## 복구

```bash
# 1. 현재 상태를 먼저 덤프해 둔다 (되돌릴 지점 확보)
scripts/backup.sh

# 2. 복구
psql "$DATABASE_URL" -f backups/full-<타임스탬프>.sql
```

`DATABASE_URL`은 Supabase 대시보드 Settings → Database → Connection string에서 확인한다.

**복구 전 확인**: 복구는 현재 데이터를 덮어쓴다. 부분 복구가 필요하면 덤프에서 해당 테이블 구문만 잘라 쓴다.

## 마이그레이션

### 적용

```bash
supabase db push --dry-run   # 반영될 목록 먼저 확인
supabase db push
```

`--dry-run`에 의도한 마이그레이션만 뜨는지 반드시 확인한 뒤 실행한다.

### 히스토리 드리프트

로컬과 원격의 마이그레이션 버전이 어긋나면 push가 거부된다. 2026-08-04에 실제로 겪은 상황과 대응:

```
Remote migration versions not found in local migrations directory.
```

```bash
supabase migration list   # Local / Remote 열을 비교해 어긋난 버전을 찾는다

# 원격에만 있는 base 버전을 reverted 로, 로컬 base 버전을 applied 로 정렬
supabase migration repair --status reverted <원격에만-있는-버전>
supabase migration repair --status applied  <로컬-base-버전>

supabase migration list   # 정렬 확인 후
supabase db push
```

> ⚠️ **CLI가 제안하는 `repair --status applied <새-마이그레이션>` 을 그대로 실행하지 말 것.**
> 아직 실행되지 않은 마이그레이션을 "적용됨"으로 표시해 버리면 스키마가 생기지 않은 채 기록만 남는다.
> `repair`는 **base 정렬에만** 쓴다.

### 롤백

이 프로젝트의 마이그레이션에는 down 스크립트가 없다. 되돌리려면:

1. 되돌리는 변경을 담은 **새 마이그레이션**을 작성한다 (권장).
2. 데이터 손실이 발생했다면 백업에서 복구한다.

주요 객체별 되돌리기 구문:

| 마이그레이션 | 되돌리기 |
|---|---|
| `20260804000000_rate_limit` | `drop function public.check_rate_limit(text,integer,integer); drop table public.rate_limits;` |
| `20260804000100_storage_portfolio_media` | `drop policy "portfolio-media admin insert" on storage.objects;` (read/update/delete 정책도 동일하게) |
| `20260804010000_rate_limit_cleanup` | 이전 버전의 `check_rate_limit` 정의로 `create or replace` |
| `20260804020000_inquiry_retention` | `drop function public.purge_expired_inquiries(integer);` |

## 개인정보 보관

개인정보 처리방침에 **문의 데이터 3년 보관**을 명시했다. 이를 이행하는 함수는 있으나 **자동 실행되지 않는다.**

```sql
select public.purge_expired_inquiries();          -- 기본 1095일
select public.purge_expired_inquiries(365);       -- 기간 지정
```

자동화하려면 pg_cron을 켜고 등록한다:

```sql
create extension if not exists pg_cron;
select cron.schedule('purge-expired-inquiries', '0 3 * * *',
  $$select public.purge_expired_inquiries();$$);
```

> 등록 전까지는 수동 실행이 필요하다. 방침에 쓴 내용과 실제 동작을 일치시키려면 등록하는 편이 낫다.

## rate limit 점검

리미터는 RPC 실패 시 대부분의 경로에서 **fail-open**(통과)이다. 조용히 무력화되지 않도록 로그를 확인한다.

- Vercel 로그에서 `rate_limit.rpc_failed` 이벤트를 검색한다. 나타나면 리미터가 동작하지 않는 상태다.
- `/api/consultation`만 fail-closed(차단)다. 유료 LLM 호출이라 비용 위험이 더 크기 때문.

GC 실효 확인:

```sql
select count(*) as total,
       count(*) filter (where reset_at <= now() - interval '1 hour') as expired
from public.rate_limits;
```

`expired`가 계속 쌓이면 RPC 내 1% 샘플링이 부족한 것이다. 확률을 올리거나 pg_cron으로 옮긴다.
