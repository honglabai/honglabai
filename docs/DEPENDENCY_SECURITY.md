# 의존성 보안 조치 기록

기준일: 2026-07-18

## 최초 감사 결과

`npm audit`에서 보통 3건, 높음 2건이 확인되었다.

| 경로 | 문제 | 안전 버전 조치 |
|---|---|---|
| `next > postcss` | CSS 문자열 출력 XSS | Next.js가 포함한 PostCSS만 `8.5.10`으로 고정 |
| `@google/genai > ws` | 메모리 노출·메모리 고갈 DoS | 같은 메이저의 `8.21.0`으로 고정 |
| `@google/genai > ... > glob > minimatch` | ReDoS | 같은 메이저의 `9.0.7`로 고정 |
| `minimatch > brace-expansion` | 무한 처리·메모리 고갈 | `minimatch 9.0.7`이 포함하는 안전한 `brace-expansion 5.0.7`로 교체 |

직접 의존성을 과거 Next.js 9로 내리는 `npm audit` 제안은 현재 App Router 구조와 호환되지 않아 적용하지 않았다. 대신 `package.json`의 `overrides`로 취약한 하위 버전만 패치 버전으로 교체했다.

## 검증 기준

- `npm audit`: 취약점 0건
- `npm ls`: override 적용 경로 확인
- TypeScript, ESLint, Next.js 프로덕션 빌드 통과
- 패키지 잠금 파일 커밋

upstream 패키지가 안전 버전을 직접 포함하면 해당 override를 제거하고 동일 검증을 다시 수행한다.
