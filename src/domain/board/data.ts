import type { BoardPost, TreeRoot } from "./types";

export const INITIAL_TREES: TreeRoot[] = [
  {
    id: "root-genai",
    name: "생성형 AI & LLM 엔지니어링",
    englishName: "Generative AI & LLM Core",
    icon: "🧠",
    badge: "Core AI",
    description: "최신 거대언어모델(LLM) 제어, 프롬프트 최적화, 지식 검색(RAG) 및 자율 에이전트 구축 실무",
    themeColor: {
      accent: "from-lime-400 to-emerald-500",
      border: "border-lime-400/40",
      bg: "bg-lime-500/10",
      text: "text-lime-700",
    },
    nodes: [
      {
        id: "node-prompt",
        label: "프롬프트 엔지니어링 & 제어",
        description: "구조화 출력(JSON Schema), 시스템 프롬프트 가드레일, Few-Shot 추론",
        postIds: ["post-101", "post-102", "post-103"],
      },
      {
        id: "node-rag",
        label: "RAG & 하이브리드 지식 검색",
        description: "BM25+벡터 검색, 시맨틱 청킹, Cross-Encoder 리랭커 최적화",
        postIds: ["post-104", "post-105", "post-106"],
      },
      {
        id: "node-agents",
        label: "자율 에이전트 & Tool Calling",
        description: "함수 호출(Tool Calling), 멀티 에이전트 오케스트레이션, 오류 자동 복구",
        postIds: ["post-107", "post-108"],
      },
    ],
  },
  {
    id: "root-dx",
    name: "비즈니스 & 실무 DX 자동화",
    englishName: "Business DX & Workflow Automation",
    icon: "⚡",
    badge: "DX Automation",
    description: "사내 반복 업무 제거, 24시간 CS 챗봇, 계약서/비정형 문서 자동 추출 및 사내 위키 지능화",
    themeColor: {
      accent: "from-blue-400 to-cyan-500",
      border: "border-blue-400/40",
      bg: "bg-blue-500/10",
      text: "text-blue-700",
    },
    nodes: [
      {
        id: "node-cs",
        label: "고객 응대 & CS 자동화 챗봇",
        description: "24/7 실시간 다채널 상담, 카카오 알림톡/슬랙 연동, 휴먼 핸드오버",
        postIds: ["post-201", "post-202"],
      },
      {
        id: "node-docs",
        label: "비정형 문서·계약서 자동 ETL",
        description: "복잡한 PDF 표/텍스트 추출, 일일 회의록 요약, 액션 아이템 자동 등록",
        postIds: ["post-203", "post-204"],
      },
      {
        id: "node-internal",
        label: "엔터프라이즈 사내 지식 검색",
        description: "노션/슬랙/구글드라이브를 통합한 사내 전용 AI 위키 검색 엔진",
        postIds: ["post-205"],
      },
    ],
  },
  {
    id: "root-dev",
    name: "실전 풀스택 AI 서비스 개발",
    englishName: "Full-Stack AI Application Engineering",
    icon: "🚀",
    badge: "Full-Stack",
    description: "Next.js + AI SDK 실시간 스트리밍 UI, 온디바이스/로컬 LLM 서빙, 실시간 음성 에이전트",
    themeColor: {
      accent: "from-purple-400 to-indigo-500",
      border: "border-purple-400/40",
      bg: "bg-purple-500/10",
      text: "text-purple-700",
    },
    nodes: [
      {
        id: "node-ux",
        label: "차세대 AI 인터페이스 UX",
        description: "Vercel AI SDK 텍스트 스트리밍, 생성형 UI(Generative UI) 동적 렌더링",
        postIds: ["post-301", "post-302"],
      },
      {
        id: "node-local",
        label: "로컬 AI 모델 & 온디바이스 서빙",
        description: "Ollama/vLLM 사내 인프라 서빙, 도메인 특화 경량 LLM(8B) QLoRA 파인튜닝",
        postIds: ["post-303", "post-304"],
      },
      {
        id: "node-voice",
        label: "초저지연 음성 AI & 멀티모달",
        description: "WebRTC 기반 Realtime Voice API, 300ms 초저지연 양방향 음성 상담",
        postIds: ["post-305"],
      },
    ],
  },
  {
    id: "root-mlops",
    name: "비용 최적화 & MLOps 운영",
    englishName: "Cost Optimization & LLMOps",
    icon: "📊",
    badge: "MLOps & Cost",
    description: "토큰 비용 최대 70% 절감, 시맨틱 캐싱, LLM 응답 품질 자동 평가(Evals) 및 레이턴시 모니터링",
    themeColor: {
      accent: "from-amber-400 to-orange-500",
      border: "border-amber-400/40",
      bg: "bg-amber-500/10",
      text: "text-amber-700",
    },
    nodes: [
      {
        id: "node-cost",
        label: "토큰 비용 절감 & 캐싱 기법",
        description: "시맨틱 캐싱(Semantic Cache) 도입, 프롬프트 압축, 소형 모델 라우팅",
        postIds: ["post-401", "post-402"],
      },
      {
        id: "node-eval",
        label: "품질 평가(Evals) & 관측성",
        description: "LLM-as-a-Judge 자동 회귀 테스트, 실시간 토큰 및 레이턴시 대시보드",
        postIds: ["post-403", "post-404"],
      },
    ],
  },
  {
    id: "root-motion",
    name: "AI 모션그래픽 & 비디오 크리에이티브",
    englishName: "AI Motion Graphics & Video Creative",
    icon: "🎬",
    badge: "Motion & Video",
    description: "최신 Fable 5.2, GPT Astra 6.0, Gemini 4 Carbon 모델과 프롬프트·스크립트 엔지니어링을 결합한 프로덕션급 모션그래픽 제작 워크플로우",
    themeColor: {
      accent: "from-rose-400 to-pink-500",
      border: "border-rose-400/40",
      bg: "bg-rose-500/10",
      text: "text-rose-700",
    },
    nodes: [
      {
        id: "node-fable",
        label: "패이블 5.2(Fable 5.2) 벡터 키프레임 & 캐릭터 모션",
        description: "Fable 5.2 물리 엔진 제어, 일러스트 벡터 레이어 분할, 본(Bone) 리깅 및 가속도 보간 실전",
        postIds: ["post-501", "post-504"],
      },
      {
        id: "node-astra",
        label: "GPT Astra 6.0 시네마틱 카메라 & 모션 스크립팅",
        description: "Astra 6.0 다이나믹 씬 연출, After Effects JSX / Remotion TSX 코드 자동 생성 및 공간 카메라 무빙",
        postIds: ["post-502", "post-504"],
      },
      {
        id: "node-carbon",
        label: "Gemini 4 Carbon 실시간 렌더링 & V2V 파이프라인",
        description: "Gemini 4 Carbon 초고속 뉴럴 렌더링, 물리 조명/텍스처 매칭 및 60fps 비디오 컴포지팅",
        postIds: ["post-503"],
      },
      {
        id: "node-interactive",
        label: "인터랙티브 웹 모션 & Lottie/Rive 연동",
        description: "AI 생성 모션을 100KB 이하 경량 Lottie / Rive 벡터 인터랙션으로 최적화 및 웹 런타임 탑재",
        postIds: ["post-505"],
      },
    ],
  },
];

export const INITIAL_POSTS: BoardPost[] = [
  {
    id: "post-101",
    slug: "structured-outputs-json-schema",
    rootTreeId: "root-genai",
    rootTreeName: "생성형 AI & LLM 엔지니어링",
    treeId: "node-prompt",
    treeName: "프롬프트 엔지니어링 & 제어",
    title: "JSON Schema 기반 100% 규격 준수 구조화 출력(Structured Outputs) 실무 적용기",
    summary: "LLM이 임의의 텍스트 대신 백엔드 API 규격에 완벽히 들어맞는 타입 세이프 JSON을 반환하도록 보장하는 실전 가이드입니다.",
    content: `서비스 운영 환경에서 LLM의 가장 큰 골칫거리는 응답 형식의 불확실성입니다. 아무리 "JSON으로만 답해줘"라고 지시해도 줄바꿈, 백틱(\`\`\`), 불필요한 서문이 포함되어 파싱 에러(JSON.parse SyntaxError)가 발생하는 경우가 잦습니다.

HongLabAI에서는 공식 Structured Outputs(JSON Schema 문법 제약)을 적용하여, 파싱 에러율을 0.00%로 낮춘 아키텍처를 프로덕션에 적용하고 있습니다.

이 방식은 토큰 샘플링 단계에서 허용되지 않는 토큰 생성을 수학적으로 차단(Constrained Decoding)하기 때문에 재시도 로직 비용을 90% 이상 절감할 수 있습니다.`,
    keyTakeaways: [
      "JSON Schema(Zod)를 LLM response_format에 전달하면 문법 위반 토큰 생성이 원천 차단됨",
      "복잡한 중첩 객체(Nested Objects)와 배열, Enum 값도 100% 보장",
      "파싱 에러로 인한 재호출 비용 및 지연시간(Latency) 제로화",
    ],
    codeSnippet: {
      language: "typescript",
      code: `import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

// 1. 반환받을 출력 형태를 Zod 스키마로 선언
const ConsultationResultSchema = z.object({
  feasibilityScore: z.number().min(0).max(100),
  recommendedStack: z.array(z.string()),
  estimatedWeeks: z.number(),
  coreRisks: z.array(z.string()),
  suggestedNextSteps: z.array(z.string()),
});

// 2. LLM 호출 시 스키마를 주입하여 100% 검증된 결과 도출
export async function analyzeProject(description: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: ConsultationResultSchema,
    prompt: \`다음 프로젝트 요구사항을 분석하고 기술적 타당성을 진단하세요: \${description}\`,
  });

  return object; // 완벽한 타입 추론 보장!
}`,
    },
    architectureFlow: [
      "클라이언트 요청 수신",
      "Zod 스키마 -> JSON Schema 변환",
      "LLM Constrained Decoding 적용",
      "100% 검증된 JSON 응답 반환",
    ],
    tags: ["StructuredOutputs", "Zod", "TypeSafety", "PromptEngineering"],
    difficulty: "중급",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-10",
    views: 1420,
    likes: 87,
    comments: [
      {
        id: "c1",
        author: "김도현 개발자",
        authorRole: "풀스택 엔지니어",
        content: "기존에 정규식으로 JSON만 발라내던 방식 쓰다가 스키마 강제로 바꾸고 나니 프로덕션 에러 로그가 완전히 사라졌습니다. 특히 Enum 강제 기능이 정말 유용하네요.",
        createdAt: "2026-11-10 14:22",
        likes: 12,
        replies: [
          {
            id: "c1-1",
            author: "홍은선 연구원",
            authorRole: "작성자",
            content: "맞습니다! 특히 Vercel AI SDK의 generateObject와 결합하면 프론트엔드부터 DB까지 완전한 단일 타입 체인을 구축할 수 있어 생산성이 크게 올라갑니다.",
            createdAt: "2026-11-10 15:05",
            likes: 6,
          },
        ],
      },
      {
        id: "c2",
        author: "박서준",
        authorRole: "백엔드 아키텍트",
        content: "혹시 deepseek나 로컬 vLLM 모델에서도 동일한 JSON Schema 제약이 가능한가요?",
        createdAt: "2026-11-11 09:15",
        likes: 4,
        replies: [
          {
            id: "c2-1",
            author: "이민우 연구원",
            authorRole: "MLOps 담당",
            content: "네! vLLM에서는 outlines 라이브러리를 내장하고 있어 `guided_json` 파라미터로 동일하게 Constrained Decoding을 지원합니다.",
            createdAt: "2026-11-11 10:30",
            likes: 5,
          },
        ],
      },
    ],
  },
  {
    id: "post-104",
    slug: "hybrid-search-rag-architecture",
    rootTreeId: "root-genai",
    rootTreeName: "생성형 AI & LLM 엔지니어링",
    treeId: "node-rag",
    treeName: "RAG & 하이브리드 지식 검색",
    title: "BM25 키워드 + 벡터 임베딩 하이브리드 검색으로 RAG 정확도 40% 끌어올리기",
    summary: "단순 벡터 유사도 검색의 치명적 한계(고유명사, 코드 번호, 약어 오탐지)를 BM25 역색인과 결합해 해결한 하이브리드 RAG 아키텍처입니다.",
    content: `많은 팀들이 RAG(검색 증강 생성)를 구축할 때 OpenAI 임베딩과 코사인 유사도 검색만으로 시작합니다. 하지만 실무에서는 "규정 제3조 제2항", "오류코드 E-4091", "사번 K-8810" 같은 정밀 키워드 검색에서 벡터 검색이 심각한 오작동을 일으킵니다.

해결책은 **상호 순위 융합(Reciprocal Rank Fusion, RRF)** 기반의 하이브리드 검색입니다:
1. 희소 검색(Sparse Search / BM25): 키워드, 코드 번호, 정확한 단어 매칭에 강함
2. 밀집 검색(Dense Search / Vector): 문맥, 유의어, 의미적 유사성에 강함
3. RRF 알고리즘: 두 검색 결과의 랭킹을 정규화하여 가중 합산
4. Cross-Encoder Re-ranker: 상위 20개 문서를 심층 교차 평가하여 최종 3개 추출`,
    keyTakeaways: [
      "순수 벡터 검색 대비 전문 검색(BM25) 결합 시 문서 탐색 정밀도(MRR) 42% 향상",
      "RRF(Reciprocal Rank Fusion) 공식을 통해 별도의 가중치 튜닝 없이도 안정적인 랭킹 통합 가능",
      "최종 프롬프트에 투입되는 토큰 수를 1/4로 줄이면서도 답변 정확도는 최고 수준 유지",
    ],
    codeSnippet: {
      language: "sql",
      code: `-- PostgreSQL (pgvector + Full-Text Search) 하이브리드 검색 쿼리
WITH vector_matches AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> query_embedding) AS rank
  FROM documents
  ORDER BY embedding <=> query_embedding
  LIMIT 20
),
text_matches AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(content_tokens, to_tsquery('korean', query_text)) DESC) AS rank
  FROM documents
  WHERE content_tokens @@ to_tsquery('korean', query_text)
  LIMIT 20
)
SELECT COALESCE(v.id, t.id) AS document_id,
       COALESCE(1.0 / (60 + v.rank), 0.0) + COALESCE(1.0 / (60 + t.rank), 0.0) AS rrf_score
FROM vector_matches v
FULL OUTER JOIN text_matches t ON v.id = t.id
ORDER BY rrf_score DESC
LIMIT 5;`,
    },
    architectureFlow: [
      "사용자 질의 입력",
      "병렬 실행: BM25 형태소 검색 + 1536차원 벡터 검색",
      "RRF 알고리즘 기반 순위 융합",
      "Cross-Encoder Re-ranker 상위 재배열",
      "최적화된 문맥(Context) 주입 후 LLM 생성",
    ],
    tags: ["RAG", "HybridSearch", "BM25", "pgvector", "ReRanking"],
    difficulty: "실무 아키텍처",
    author: "최재훈",
    authorRole: "데이터 & 검색 엔진 스페셜리스트",
    createdAt: "2026-11-09",
    views: 2180,
    likes: 134,
    comments: [
      {
        id: "c3",
        author: "정다은",
        authorRole: "AI 엔지니어",
        content: "실제로 법률 문서 RAG 프로젝트에서 조항 번호 못 찾는 문제로 고생했는데, 하이브리드 도입하고 나서 완전히 해결되었습니다. RRF 상수 k=60도 표준적으로 아주 잘 작동하네요.",
        createdAt: "2026-11-09 18:30",
        likes: 9,
      },
    ],
  },
  {
    id: "post-107",
    slug: "autonomous-agents-self-correcting-loop",
    rootTreeId: "root-genai",
    rootTreeName: "생성형 AI & LLM 엔지니어링",
    treeId: "node-agents",
    treeName: "자율 에이전트 & Tool Calling",
    title: "도구 호출(Tool Calling)과 자기 교정(Self-Correction) 루프로 완성하는 자율 에이전트",
    summary: "에러 발생 시 멈추지 않고 스스로 원인을 분석하고 파라미터를 수정해 성공할 때까지 재시도하는 견고한 에이전트 루프 패턴입니다.",
    content: `에이전트 시스템을 단일 함수 호출로 끝내면 프로덕션에서 성공률이 60%를 넘기 어렵습니다. API 응답 형식 불일치, 네트워크 타임아웃, 파라미터 유효성 검증 실패 등이 빈번하기 때문입니다.

진정한 자율 에이전트는 **[계획(Plan) -> 실행(Act) -> 관찰(Observe) -> 반성 및 교정(Reflect/Correct)]** 루프를 순환합니다. 

HongLabAI에서는 최대 반복 횟수(Max Iterations) 제한과 상태 머신(FSM)을 결합하여, 무한 루프 위험 없이 98% 이상의 성공률을 보장하는 에이전트 런타임을 운용하고 있습니다.`,
    keyTakeaways: [
      "도구 실행 에러를 유저에게 즉시 던지지 않고 에이전트 메모리에 주입하여 자체 디버깅 유도",
      "동적 시스템 프롬프트 업데이트로 이전 실패 기록 축적",
      "토큰 낭비 방지를 위한 조기 탈출(Early Exit) 및 인간 개입(Human-In-The-Loop) 트리거 필수",
    ],
    codeSnippet: {
      language: "typescript",
      code: `async function runSelfCorrectingAgent(goal: string, tools: ToolRegistry, maxRetries = 3) {
  let context = [{ role: "user", content: goal }];
  
  for (let step = 0; step < maxRetries; step++) {
    const response = await callLLMWithTools(context, tools.definitions);
    
    if (response.toolCalls.length === 0) {
      return response.finalAnswer; // 목표 달성 완료
    }
    
    for (const toolCall of response.toolCalls) {
      try {
        const result = await tools.execute(toolCall.name, toolCall.arguments);
        context.push({ role: "tool", content: JSON.stringify(result) });
      } catch (err: any) {
        // 핵심: 에러 스택을 LLM에게 피드백하여 교정 유도
        context.push({ 
          role: "tool", 
          content: \`도구 실행 실패: \${err.message}. 파라미터를 수정하여 다시 시도하세요.\` 
        });
      }
    }
  }
  throw new Error("최대 교정 횟수 초과");
}`,
    },
    architectureFlow: [
      "사용자 목표 입력",
      "에이전트가 필요한 도구(API/DB) 선택",
      "도구 실행 및 결과 관찰",
      "오류 발생 시 에러 피드백을 프롬프트로 재전달",
      "스스로 수정하여 최종 목표 완수",
    ],
    tags: ["AgenticAI", "ToolCalling", "SelfCorrection", "LangGraph"],
    difficulty: "고급",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-08",
    views: 1890,
    likes: 112,
    comments: [],
  },
  {
    id: "post-201",
    slug: "24-7-customer-support-chatbot-case-study",
    rootTreeId: "root-dx",
    rootTreeName: "비즈니스 & 실무 DX 자동화",
    treeId: "node-cs",
    treeName: "고객 응대 & CS 자동화 챗봇",
    title: "[사례 연구] 24/7 고객 문의 78%를 상담원 개입 없이 해결한 AI 고객센터 구축기",
    summary: "중복/단순 문의(환불 정책, 배송 조회, 예약 변경)를 완전 자동화하고 복잡한 불만 사항만 상담원에게 이관하는 실전 아키텍처입니다.",
    content: `이커머스 및 서비스 플랫폼의 CS 인입 중 70% 이상은 '자주 묻는 질문(FAQ)'의 변형입니다. 그러나 단순 규칙 기반 챗봇은 사용자의 다양한 구어체 표현을 인식하지 못해 고객 만족도를 오히려 떨어뜨립니다.

본 프로젝트에서는 다음과 같은 3계층 하이브리드 파이프라인을 구축했습니다:
1. **인텐트 게이트웨이(Intent Classifier)**: 결제 취소, 배송 조회, 단순 안내 등 의도 1차 분류 (응답속도 150ms)
2. **사내 DB 연동 안전 Tool**: 사용자 인증 후 주문 DB를 조회하여 실제 배송 상태/송장 번호 실시간 안내
3. **감정 분석 & 휴먼 핸드오버(Human Handoff)**: 고객의 부정적 감정 점수가 임계치를 초과할 경우 즉시 전문 상담원 채팅방으로 세션 이관`,
    keyTakeaways: [
      "월 평균 3,200건의 인입 문의 중 2,500건 이상을 0.8초 내 자동 완결",
      "상담원 1인당 고난이도 이슈 집중 가능해져 고객 만족도(CSAT) 4.1 -> 4.8 상승",
      "개인정보(전화번호, 계좌번호) 자동 마스킹 파이프라인으로 보안 규정(ISMS) 준수",
    ],
    tags: ["CSBot", "IntentClassification", "DX", "HumanInTheLoop"],
    difficulty: "실무 아키텍처",
    author: "김지민 컨설턴트",
    authorRole: "비즈니스 DX 솔루션 디렉터",
    createdAt: "2026-11-07",
    views: 2450,
    likes: 156,
    comments: [
      {
        id: "c4",
        author: "이승우",
        authorRole: "스타트업 대표",
        content: "휴먼 핸드오버 트리거 로직이 인상 깊네요. 상담원 연결이 필요한 순간을 어떻게 탐지하시나요?",
        createdAt: "2026-11-07 19:40",
        likes: 8,
        replies: [
          {
            id: "c4-1",
            author: "김지민 컨설턴트",
            authorRole: "작성자",
            content: "고객 메시지의 감정 분석 점수(Sentiment Score)가 2회 연속 부정적이거나, '화남/신고/소비자원' 등 강성 키워드가 감지되면 즉시 상담원 화면에 긴급 팝업으로 라우팅합니다.",
            createdAt: "2026-11-07 20:15",
            likes: 10,
          },
        ],
      },
    ],
  },
  {
    id: "post-203",
    slug: "pdf-table-extraction-etl-pipeline",
    rootTreeId: "root-dx",
    rootTreeName: "비즈니스 & 실무 DX 자동화",
    treeId: "node-docs",
    treeName: "비정형 문서·계약서 자동 ETL",
    title: "복잡한 재무제표 및 계약서 PDF에서 표와 수치를 오차 없이 추출하는 비전 AI 파이프라인",
    summary: "텍스트 복사가 불가능한 스캔 PDF나 병합된 다중 행 표를 마크다운 및 관계형 DB로 완벽 변환하는 실무 데이터 파이프라인입니다.",
    content: `일반 텍스트 추출 라이브러리(PyPDF, PDFPlumber)는 2단 다단 편집 문서나 셀이 병합된 표를 만나면 순서가 완전히 엉켜버립니다.

HongLabAI는 **멀티모달 비전 모델(Vision LLM) + 좌표 기반 레이아웃 분석**의 2단계 접근법을 사용합니다:
1. 문서를 300DPI 이미지로 렌더링 후 헤더/표/본문 영역 바운딩 박스 분할
2. 각 표 영역을 비전 모델에 전달하여 Markdown Table 또는 엄격한 JSON 구조체로 직렬화
3. 수학적 유효성 검증(가로줄 합계 == 세로줄 합계) 자동 검증기를 통해 수치 불일치 0% 달성`,
    keyTakeaways: [
      "스캔된 계약서 및 영수증 1,000장을 수작업 40시간 -> 파이프라인 12분 만에 자동 처리",
      "합계 및 세액 수학적 일치성 자동 교차 검증 알고리즘 탑재",
      "추출 결과를 PostgreSQL 및 스프레드시트로 실시간 연동",
    ],
    tags: ["DocumentAI", "VisionLLM", "PDFParsing", "DataPipeline"],
    difficulty: "중급",
    author: "박준혁 엔지니어",
    authorRole: "데이터 엔지니어링 리드",
    createdAt: "2026-11-06",
    views: 1670,
    likes: 95,
    comments: [],
  },
  {
    id: "post-301",
    slug: "nextjs-vercel-ai-sdk-streaming-ui",
    rootTreeId: "root-dev",
    rootTreeName: "실전 풀스택 AI 서비스 개발",
    treeId: "node-ux",
    treeName: "차세대 AI 인터페이스 UX",
    title: "Next.js App Router + Vercel AI SDK 실시간 텍스트 & 생성형 UI 스트리밍 완벽 가이드",
    summary: "로딩 스피너 대신 글자가 타이핑되듯 흘러나오고, 도구 실행 결과가 실시간 인터랙티브 컴포넌트로 렌더링되는 모던 AI UX 구현법입니다.",
    content: `AI 서비스의 체감 속도를 결정짓는 가장 중요한 요소는 첫 토큰 도달 시간(TTFT, Time To First Token)입니다. 답변 생성이 10초 걸리더라도 0.3초 만에 스트리밍이 시작되면 사용자는 지루함을 느끼지 않습니다.

최신 Vercel AI SDK(Core v4)는 서버 액션과 엣지 런타임에서 단 몇 줄의 코드로 SSE(Server-Sent Events) 기반 양방향 스트리밍을 제공합니다.`,
    keyTakeaways: [
      "streamText / useChat 훅을 통해 복잡한 웹소켓/SSE 보일러플레이트 제거",
      "텍스트 스트리밍 중에도 중간 취소(AbortController) 및 재연결 안정성 확보",
      "스트리밍 완료 시 DB 자동 백업 저장 패턴 적용",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// app/api/chat/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "당신은 HongLabAI의 지능형 기술 어시스턴트입니다.",
    messages,
  });

  return result.toDataStreamResponse();
}`,
    },
    architectureFlow: [
      "클라이언트 useChat 요청",
      "Next.js Route Handler에서 streamText 호출",
      "토큰 단위 HTTP Streaming 청크 전송",
      "클라이언트 실시간 UI 렌더링",
    ],
    tags: ["NextJS", "AISDK", "Streaming", "GenerativeUI"],
    difficulty: "입문",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-05",
    views: 3120,
    likes: 215,
    comments: [
      {
        id: "c5",
        author: "한승우",
        authorRole: "프론트엔드 개발자",
        content: "toDataStreamResponse() 로 바꾸고 나서 스트리밍 프로토콜 처리가 너무 편해졌습니다. 정말 추천하는 패턴입니다.",
        createdAt: "2026-11-05 21:10",
        likes: 14,
      },
    ],
  },
  {
    id: "post-303",
    slug: "local-llm-serving-ollama-vllm",
    rootTreeId: "root-dev",
    rootTreeName: "실전 풀스택 AI 서비스 개발",
    treeId: "node-local",
    treeName: "로컬 AI 모델 & 온디바이스 서빙",
    title: "보안이 중요한 사내망을 위한 Ollama / vLLM 기반 로컬 LLM 서빙과 QLoRA 파인튜닝",
    summary: "외부 클라우드로 데이터 전송이 불가능한 금융/의료/사내 비밀 문서를 위해 로컬 GPU 서버에 오픈소스 LLM을 서빙하는 실무 구축기입니다.",
    content: `공공기관, 금융사, R&D 연구소에서는 API 호출 시 데이터가 외부로 유출될 우려로 인해 퍼블릭 클라우드 LLM 사용이 제한됩니다.

Llama 3.3, Qwen 2.5, DeepSeek 계열의 오픈소스 모델은 단일 GPU(RTX 4090 또는 A10G) 환경에서도 사내 업무용으로 충분한 성능을 발휘합니다.
본 글에서는 Docker 기반 vLLM 서빙 환경과 PagedAttention 최적화, 그리고 사내 규정 데이터를 주입하는 QLoRA 파인튜닝 파이프라인을 다룹니다.`,
    keyTakeaways: [
      "외부 네트워크 연결 없는 완전한 폐쇄망(Air-Gapped) 인프라 구성",
      "vLLM PagedAttention으로 동시 접속자 30명 환경에서도 지연시간 250ms 유지",
      "사내 맞춤형 서식으로 파인튜닝된 8B 모델로 상용 클라우드 80% 수준 성능 달성",
    ],
    tags: ["LocalLLM", "vLLM", "Ollama", "FineTuning", "Privacy"],
    difficulty: "고급",
    author: "이민우 연구원",
    authorRole: "MLOps & 인프라 엔지니어",
    createdAt: "2026-11-04",
    views: 1980,
    likes: 142,
    comments: [],
  },
  {
    id: "post-401",
    slug: "semantic-caching-70-percent-cost-reduction",
    rootTreeId: "root-mlops",
    rootTreeName: "비용 최적화 & MLOps 운영",
    treeId: "node-cost",
    treeName: "토큰 비용 절감 & 캐싱 기법",
    title: "[비용 70% 절감] 시맨틱 캐싱(Semantic Caching)과 모델 동적 라우팅 기법",
    summary: "의미상 동일한 질문에 대해 LLM을 재호출하지 않고 초고속 캐시에서 즉시 응답하여 API 비용과 지연시간을 획기적으로 낮추는 기술입니다.",
    content: `사용자들은 같은 의미의 질문을 수많은 다른 방식으로 표현합니다:
- "비밀번호 어떻게 바꾸나요?"
- "패스워드 재설정 방법 좀 알려줘"
- "비번 분실했는데 변경은 어디서 하나요?"

일반적인 Key-Value 캐시(Redis)는 문자열이 조금만 달라져도 캐시 미스(Cache Miss)가 발생합니다.
**시맨틱 캐싱**은 질문의 임베딩 벡터를 추출하여, 기존 저장된 질문과의 코사인 유사도가 0.94 이상일 경우 저장된 이전 답변을 5ms 안에 반환합니다.`,
    keyTakeaways: [
      "전체 쿼리의 42%가 시맨틱 캐시에서 즉각 처리되어 API 비용 68% 순감",
      "캐시 적중 시 지연시간 2.5초 -> 0.02초로 100배 단축",
      "저비용 소형 모델(Flash)과 고성능 모델(Pro)을 난이도에 따라 분기하는 라우팅 결합",
    ],
    codeSnippet: {
      language: "typescript",
      code: `import { getEmbedding } from "@/server/embedding";
import { vectorIndex } from "@/server/redis";

export async function askWithSemanticCache(query: string) {
  const queryVec = await getEmbedding(query);
  
  // 1. 유사도 0.93 이상의 캐시 질의가 있는지 검색
  const [cached] = await vectorIndex.query({
    vector: queryVec,
    topK: 1,
    includeMetadata: true,
  });

  if (cached && cached.score >= 0.93) {
    console.log("⚡ 시맨틱 캐시 히트! 지연시간: 12ms");
    return { answer: cached.metadata.answer, fromCache: true };
  }

  // 2. 캐시 미스 시 실제 LLM 호출 후 캐시에 저장
  const answer = await callMainLLM(query);
  await vectorIndex.upsert({
    id: crypto.randomUUID(),
    vector: queryVec,
    metadata: { question: query, answer, timestamp: Date.now() },
  });

  return { answer, fromCache: false };
}`,
    },
    tags: ["CostOptimization", "SemanticCache", "Redis", "VectorSearch"],
    difficulty: "중급",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-03",
    views: 2850,
    likes: 198,
    comments: [
      {
        id: "c6",
        author: "최영민",
        authorRole: "CTO",
        content: "임계값 0.93 설정 기준이 어떻게 되나요? 너무 낮추면 다른 질문에 엉뚱한 답을 낼 위험이 있지 않나요?",
        createdAt: "2026-11-03 16:45",
        likes: 11,
        replies: [
          {
            id: "c6-1",
            author: "홍은선 연구원",
            authorRole: "작성자",
            content: "날카로운 지적이십니다! 1536차원 임베딩 기준 0.90 미만은 잘못된 매칭 위험이 생깁니다. 저희 벤치마크 결과 0.93~0.95 구간이 안전하면서도 캐시 적중률 40% 이상을 확보하는 골디락스 존이었습니다.",
            createdAt: "2026-11-03 17:20",
            likes: 15,
          },
        ],
      },
    ],
  },
  {
    id: "post-403",
    slug: "llm-evals-automated-regression-testing",
    rootTreeId: "root-mlops",
    rootTreeName: "비용 최적화 & MLOps 운영",
    treeId: "node-eval",
    treeName: "품질 평가(Evals) & 관측성",
    title: "LLM-as-a-Judge와 Ragas 지표를 활용한 배포 전 자동화된 품질 회귀 테스트",
    summary: "프롬프트나 모델을 변경했을 때 이전보다 답변 품질이 나빠지지 않았는지 CI/CD 파이프라인에서 자동으로 검증하는 품질 평가 체계입니다.",
    content: `프롬프트의 한 문장을 수정했을 때 전체 케이스의 품질이 올라갔는지 떨어졌는지를 감(Gut feeling)으로만 판단해서는 엔터프라이즈 프로덕션을 운영할 수 없습니다.

HongLabAI에서는 GitHub Actions PR 단계에서 50개의 골든 테스트셋(Golden Dataset)을 자동으로 실행하고, 상위 평가 모델(LLM Judge)이 정확도(Faithfulness), 관련성(Answer Relevance), 환각 여부(Hallucination Rate)를 0~100점으로 채점하여 합격 시에만 배포를 승인합니다.`,
    keyTakeaways: [
      "프롬프트 수정으로 인한 기존 기능 훼손(Regression)을 사전에 100% 탐지",
      "Ragas 프레임워크 기반 4대 지표(충실도, 답변 관련성, 문맥 정밀도, 문맥 재현율) 자동 측정",
      "CI 파이프라인 연동으로 품질 점수 85점 미달 시 PR 머지 자동 차단",
    ],
    tags: ["LLMOps", "Evals", "Ragas", "CI_CD", "RegressionTest"],
    difficulty: "실무 아키텍처",
    author: "최재훈",
    authorRole: "데이터 & 검색 엔진 스페셜리스트",
    createdAt: "2026-11-02",
    views: 1540,
    likes: 104,
    comments: [],
  },
  {
    id: "post-501",
    slug: "fable-5-2-character-rigging-vector-motion",
    rootTreeId: "root-motion",
    rootTreeName: "AI 모션그래픽 & 비디오 크리에이티브",
    treeId: "node-fable",
    treeName: "패이블 5.2(Fable 5.2) 벡터 키프레임 & 캐릭터 모션",
    title: "패이블 5.2(Fable 5.2)로 완성하는 AI 캐릭터 리깅과 벡터 키프레임 제어 실무",
    summary: "Fable 5.2의 신규 물리 기반 벡터 엔진을 활용해 정지 일러스트에서 레이어를 분할하고, 자연스러운 관절 리깅과 가속도 키프레임 보간을 자동화하는 엔드투엔드 파이프라인입니다.",
    content: `기존 2D 캐릭터 모션그래픽 작업은 일러스트레이터에서 신체 부위별 레이어를 일일이 분리하고, 애프터이펙트 듀익(Duik)이나 림버(Limber)로 본(Bone)을 심는 데에만 수 시간 이상 소요되었습니다.
    
최신 Fable 5.2는 'Auto-Vector Layering' 뉴럴 모델을 탑재하여, 단 한 장의 정지 비트맵 이미지에서도 머리, 몸통, 팔, 다리, 옷자락 등 최대 128개의 서브 벡터 패스(Bezier Path)를 오차 없이 자동 분해합니다.

더 나아가 내장된 역운동학(IK, Inverse Kinematics) 솔버와 탄성 물리 엔진을 통해 발의 접지면(Grounding Plane)을 계산하고, 걷기나 점프 동작 시 머리카락과 의복의 2차 탄성 진동(Secondary Motion)을 자동으로 생성합니다.

HongLabAI에서는 Fable 5.2 REST API와 Python 파이프라인을 연동하여, 캐릭터 콘셉트 아트 한 장으로 10가지 기본 동작(Walk, Run, Wave, Idle, Jump 등)의 무손실 SVG/WebM 에셋을 5분 만에 일괄 렌더링하고 있습니다.`,
    keyTakeaways: [
      "Fable 5.2의 Auto-Vector Layering으로 정지 이미지에서 128개 독립 벡터 레이어 자동 분리",
      "Inverse Kinematics(IK)와 물리 엔진 결합으로 사람 손으로 수일 걸리던 캐릭터 모션을 5분 만에 완성",
      "REST API 및 Fable CLI를 통해 수백 개의 배너 모션 에셋을 파라메트릭하게 대량 자동 렌더링",
    ],
    codeSnippet: {
      language: "python",
      code: `import requests
import json

# Fable 5.2 Motion Rigging API 파이프라인
FABLE_API_ENDPOINT = "https://api.fable.app/v5.2/motion/rig-and-animate"
HEADERS = {"Authorization": "Bearer YOUR_FABLE_API_KEY", "Content-Type": "application/json"}

payload = {
    "source_image_url": "https://honglabai.vercel.app/uploads/character-hero.png",
    "layer_segmentation": {
        "precision": "ultra_fine",
        "separate_secondary_elements": True,  # 머리카락, 옷자락, 액세서리 분리
        "vector_tolerance": 0.08              # Bezier 곡선 오차 허용치
    },
    "skeleton_rig": {
        "ik_solver": "two_bone_soft_ik",
        "spring_physics": {
            "stiffness": 140,
            "damping": 12,
            "mass": 1.2
        }
    },
    "motion_presets": ["walk_cycle_happy", "idle_breathing"],
    "export_format": "lottie_json"
}

response = requests.post(FABLE_API_ENDPOINT, headers=HEADERS, json=payload)
result = response.json()
print("Generated Lottie URL:", result["download_url"])
print("Total Keyframes Generated:", len(result["timeline"]["keyframes"]))`,
    },
    architectureFlow: [
      "2D 일러스트 에셋 입력",
      "Fable 5.2 시맨틱 레이어 분해 (Head, Torso, Limbs)",
      "IK 본 리깅 & 스프링 물리 제약조건 주입",
      "가속도(Easing Curve) 키프레임 자동 보간",
      "60fps SVG / WebM / Lottie 무손실 렌더링",
    ],
    tags: ["Fable5.2", "MotionGraphics", "CharacterRigging", "Keyframing", "VectorAnimation"],
    difficulty: "실무 아키텍처",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-11",
    views: 1280,
    likes: 94,
    comments: [
      {
        id: "c-fable-1",
        author: "모션디자이너 박수진",
        authorRole: "크리에이티브 디렉터",
        content: "Fable 5.2에서 머리카락이나 스카프 흔들릴 때 부자연스러운 왜곡이 생기던 문제가 스프링 댐핑 튜닝으로 완전히 해결되는군요! 현업 프로젝트에 바로 적용해보겠습니다.",
        createdAt: "2026-11-11 16:30",
        likes: 14,
        replies: [
          {
            id: "c-fable-1-1",
            author: "홍은선 연구원",
            authorRole: "작성자",
            content: "감사합니다! 특히 stiffness 120~150에 damping 10~15 구간을 두시면 젤리 같은 과도한 탄성 없이 디즈니 스타일의 세련된 2차 모션을 얻으실 수 있습니다.",
            createdAt: "2026-11-11 17:10",
            likes: 8,
          },
        ],
      },
    ],
  },
  {
    id: "post-502",
    slug: "gpt-astra-6-0-cinematic-camera-remotion-scripting",
    rootTreeId: "root-motion",
    rootTreeName: "AI 모션그래픽 & 비디오 크리에이티브",
    treeId: "node-astra",
    treeName: "GPT Astra 6.0 시네마틱 카메라 & 모션 스크립팅",
    title: "GPT Astra 6.0과 Remotion TSX로 구축하는 코드 기반 시네마틱 3D 모션그래픽 파이프라인",
    summary: "GPT Astra 6.0의 시각적 공간 추론 능력을 이용해 3D 카메라 패닝, 뎁스 오브 필드(DoF), 타이포그래피 키네틱 모션을 React Remotion 코드로 100% 자동 생성하는 실전 가이드입니다.",
    content: `기존의 텍스트-투-비디오(Text-to-Video) 모델은 카메라 앵글을 세밀하게 제어하기 어렵고, 자막이나 UI 요소가 배경과 뭉개지는 문제가 있었습니다.
    
GPT Astra 6.0은 진보된 3차원 공간 추론 엔진(Spatial Reasoning Engine)을 갖추어 가상 카메라의 초점거리(Focal Length), 셔터 스피드, 카메라 리그 이동 궤적(X, Y, Z, Pitch, Yaw, Roll)을 정확한 수학적 좌표로 산출합니다.

이를 웹 표준 기반 비디오 제작 프레임워크인 Remotion(React)과 결합하면, GUI 프로그램을 켜지 않고도 100% 코드로 시네마틱 카메라 워킹과 비트 싱크 키네틱 타이포그래피를 렌더링할 수 있습니다.

데이터베이스의 텍스트와 상품 이미지를 주입하기만 하면, Astra 6.0이 카메라 궤적과 타이밍 곡선을 계산하여 완전히 렌더링된 고화질 홍보 영상을 서버리스 인프라에서 초당 수십 편씩 자동 생성합니다.`,
    keyTakeaways: [
      "GPT Astra 6.0은 3차원 좌표계와 시네마틱 카메라 궤적을 완벽히 이해하여 충돌 없는 샷 산출",
      "React Remotion 코드로 비디오를 생성하므로 Git 형상 관리, A/B 테스트, 실시간 데이터 치환 가능",
      "서버리스 AWS Lambda / Vercel Functions 상에서 분당 100개 이상의 개인화 마케팅 모션 비디오 렌더링",
    ],
    codeSnippet: {
      language: "typescript",
      code: `import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

// GPT Astra 6.0이 자동 생성한 시네마틱 카메라 리그 및 키네틱 타이포 컴포넌트
export const AstraCinematicScene = ({ headline, subtitle }: { headline: string; subtitle: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Astra 6.0이 계산한 부드러운 카메라 패닝 & 줌 궤적
  const cameraZ = interpolate(frame, [0, 90], [1200, 450], { extrapolateRight: "clamp" });
  const cameraRotateY = interpolate(frame, [0, 90], [-18, 4], { extrapolateRight: "clamp" });
  
  // 2. 물리 스프링 기반 텍스트 진입 타이밍
  const textEntrance = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 120 } });
  const blurAmount = interpolate(frame, [0, 25], [16, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        perspective: 1000,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 60% 40%, #1e1b4b 0%, #030712 100%)",
      }}
    >
      <div
        style={{
          transform: \`translateZ(\${cameraZ}px) rotateY(\${cameraRotateY}deg)\`,
          filter: \`blur(\${blurAmount}px)\`,
          opacity: textEntrance,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 84, fontWeight: 900, color: "#facc15", letterSpacing: "-0.04em" }}>
          {headline}
        </h1>
        <p style={{ fontSize: 36, color: "#cbd5e1", marginTop: 24 }}>{subtitle}</p>
      </div>
    </div>
  );
};`,
    },
    architectureFlow: [
      "스토리보드 및 오디오 BPM 입력",
      "GPT Astra 6.0 공간 카메라 궤적 & 키네틱 타임라인 추론",
      "Remotion TSX 컴포넌트 실시간 생성",
      "React 스프링 물리 기반 이징(Easing) 계산",
      "헤드리스 브라우저 클러스터 병렬 렌더링",
    ],
    tags: ["GPTAstra6.0", "Remotion", "CinematicCamera", "KineticTypography", "CodeMotion"],
    difficulty: "고급",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-11",
    views: 1490,
    likes: 112,
    comments: [
      {
        id: "c-astra-1",
        author: "윤태호",
        authorRole: "비디오 엔지니어링 팀장",
        content: "Astra 6.0 프롬프트로 Remotion 코드를 뽑아내는 파이프라인은 영상 제작 업계의 게임체인저입니다. 애프터이펙트 렌더팜 구축 비용을 1/10로 줄였습니다.",
        createdAt: "2026-11-11 18:20",
        likes: 21,
      },
    ],
  },
  {
    id: "post-503",
    slug: "gemini-4-carbon-realtime-v2v-lighting-compositing",
    rootTreeId: "root-motion",
    rootTreeName: "AI 모션그래픽 & 비디오 크리에이티브",
    treeId: "node-carbon",
    treeName: "Gemini 4 Carbon 실시간 렌더링 & V2V 파이프라인",
    title: "Gemini 4 Carbon의 Video-to-Video 엔진과 물리 조명 매칭을 활용한 60fps 모션 컴포지팅",
    summary: "Gemini 4 Carbon의 초고속 뉴럴 렌더링 코어를 활용하여 단순 2D 모션 시안을 포토리얼리스틱 3D 질감과 광학 조명이 적용된 고해상도 60fps 비디오로 변환하는 실전 컴포지팅 기법입니다.",
    content: `많은 생성형 비디오 모델의 고질적인 약점은 프레임과 프레임 사이가 물결치듯 흔들리는 '시간적 불일치(Temporal Inconsistency)'와 플리커 현상이었습니다.
    
Gemini 4 Carbon은 옵티컬 플로우 텐서 가이드와 글로벌 조명(Global Illumination) 캐시를 통합한 신규 신경망 아키텍처를 도입하여, 60fps 고주사율에서도 흔들림 없는 완벽한 프레임 연속성을 보장합니다.

특히 Video-to-Video(V2V) 모드에서는 단순한 2D 흑백 와이어프레임이나 모션 경로만 입력해도, PBR(물리 기반 렌더링) 크롬 질감, 반투명 프로스트 글래스, 굴절 네온 광선 효과를 사실적으로 합성해 냅니다.

프레임당 렌더링 속도가 12ms에 불과하여, 실시간 웹캠 필터링, 대화형 전시 미디어아트, 라이브 방송 그래픽 등 지연시간이 극도로 중요한 프로덕션 환경에 최적화되어 있습니다.`,
    keyTakeaways: [
      "복잡한 3D C4D/블렌더 렌더링 작업 없이 단순 2D 모션으로 하이엔드 3D 룩앤필 구현",
      "Gemini 4 Carbon의 독점 Temporal Anchor 기술로 AI 비디오 특유의 떨림/와블링 현상 완벽 차단",
      "프레임당 렌더링 속도 12ms 달성으로 실시간 인터랙티브 광고 및 방송 그래픽 제작 가능",
    ],
    codeSnippet: {
      language: "typescript",
      code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 4 Carbon V2V 시네마틱 컴포지팅 파이프라인
export async function compositeMotionWithCarbon(sourceVideoBuffer: Buffer) {
  const response = await ai.models.generateVideo({
    model: "gemini-4-carbon",
    prompt: {
      text: "Transform the 2D minimalist motion guide into a hyper-realistic futuristic glassmorphism composition. " +
            "Refractive frosted acrylic glass layers, caustics light refraction, metallic titanium edges, " +
            "subtle volumetric dust particles, anamorphic lens flare with 4500k warm ambient lighting.",
      videoInput: sourceVideoBuffer,
    },
    config: {
      fps: 60,
      resolution: "4K_UHD",
      temporalStability: 0.98, // 플리커 방지 시간축 앵커 계수
      specularMetalness: 0.85,
    },
  });

  return response.videoUrl;
}`,
    },
    architectureFlow: [
      "2D 모션 레이아웃 프리비즈(Pre-vis) 생성",
      "Gemini 4 Carbon 비디오 스트림 주입",
      "PBR 머티리얼 & 글로벌 일루미네이션(GI) 뉴럴 합성",
      "시간축(Temporal) 일관성 필터링 & 60fps 보간",
      "프로덕션 마스터 비디오 출력",
    ],
    tags: ["Gemini4Carbon", "VideoToVideo", "NeuralRendering", "Compositing", "TemporalConsistency"],
    difficulty: "실무 아키텍처",
    author: "최재훈",
    authorRole: "데이터 & 검색 엔진 스페셜리스트",
    createdAt: "2026-11-11",
    views: 1620,
    likes: 125,
    comments: [],
  },
  {
    id: "post-504",
    slug: "ai-motion-production-prompt-bible-2026",
    rootTreeId: "root-motion",
    rootTreeName: "AI 모션그래픽 & 비디오 크리에이티브",
    treeId: "node-astra",
    treeName: "GPT Astra 6.0 시네마틱 카메라 & 모션 스크립팅",
    title: "[프롬프트 바이블] Fable 5.2 · Astra 6.0 · Gemini 4 Carbon 핵심 모션 제어 프롬프트 15선",
    summary: "네온 사이버펑크 HUD, 3D 글래스모피즘 아이소메트릭, 키네틱 타이포, 액체 모핑, 시네마틱 돌리 줌 등 현업에서 가장 많이 쓰이는 고품질 모션그래픽 프롬프트와 네거티브 가드레일 모음집입니다.",
    content: `AI 모션그래픽에서 가장 흔히 겪는 실패 원인은 '이미지에 대한 묘사'만 길게 적고, '움직임의 궤적과 타이밍(Timing & Spacing)'을 기술하지 않는 것입니다.
    
전문 모션그래픽 감독 수준의 결과물을 얻기 위해서는 이징 곡선(Easing Curve), 카메라 셔터 앵글, 가속도, 조명 온도(Kelvin) 및 렌즈 특성을 명시해야 합니다.

HongLabAI 크리에이티브 랩에서 Fable 5.2, GPT Astra 6.0, Gemini 4 Carbon에 공통 적용하여 최고의 결과를 검증한 15가지 핵심 모션 템플릿과 네거티브 프롬프트 가이드를 공개합니다.

[대표 카테고리 5선 요약]
1. 볼드 스태카토 키네틱 타이포그래피 (Staccato Kinetic Typography)
2. 사이버펑크 홀로그래픽 FUI 데이터 디스플레이 (Holographic Tech HUD)
3. 3D 프로스트 글래스모피즘 제품 쇼케이스 (Frosted Glass UI Showcase)
4. 유체 크롬 엠블럼 액체 모핑 (Viscous Liquid Chrome Morph)
5. 히치콕 버티고 돌리 줌 & 궤도 회전 샷 (Vertigo Dolly Zoom & Orbital Orbit)`,
    keyTakeaways: [
      "모션 프롬프트는 '무엇이 있는가'보다 '어떻게 움직이고 어떤 속도로 감속하는가'를 명시해야 결과가 정확함",
      "이징 곡선(Easing), 카메라 각도, 조명 온도(Kelvin), 셔터 앵글(180deg) 등의 전문 용어가 모션 품질을 결정",
      "네거티브 프롬프트에 'jitter, flickering, abrupt cuts, morphing deformation' 필수 추가",
    ],
    codeSnippet: {
      language: "json",
      code: `{
  "preset_name": "glassmorphism_isometric_product_hero",
  "target_engine": "Gemini 4 Carbon & Astra 6.0",
  "positive_prompt": "Isometric 3D mobile app floating card showcase, ultra-clean frosted glassmorphism layers with soft neon bevel reflections. Smooth 60fps ease-in-out floating hover motion, 45-degree angle slow orbital camera drift. Volumetric studio softbox lighting, refractive dispersion caustics, crisp typography, clean background with subtle gradient #0a0f1d to #1e1b4b, 8k resolution, octane render style --motion-smoothness 0.95 --shutter-angle 180",
  "negative_prompt": "jitter, flickering, stuttering, abrupt camera jump, frame blending blur, distorted text, muddy shadows, low-poly artifacts, watermark, low frame rate",
  "recommended_params": {
    "fps": 60,
    "aspect_ratio": "16:9",
    "seed_lock": true,
    "motion_magnitude": 0.45
  }
}`,
    },
    architectureFlow: [
      "기획 의도 분석 (무드, 타깃, 템포)",
      "카테고리별 검증된 베이스 프롬프트 선택",
      "모델별 고유 파라미터 및 물리 수치 오버라이드",
      "네거티브 가드레일 결합 후 모션 엔진 구동",
    ],
    tags: ["PromptEngineering", "MotionPrompts", "Fable5.2", "Astra6.0", "Gemini4Carbon"],
    difficulty: "입문",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-11",
    views: 2150,
    likes: 184,
    comments: [],
  },
  {
    id: "post-505",
    slug: "interactive-web-motion-rive-lottie-optimization",
    rootTreeId: "root-motion",
    rootTreeName: "AI 모션그래픽 & 비디오 크리에이티브",
    treeId: "node-interactive",
    treeName: "인터랙티브 웹 모션 & Lottie/Rive 연동",
    title: "AI 생성 모션 에셋을 100KB 이하 초경량 Lottie & Rive 웹 인터랙션으로 최적화하기",
    summary: "AI가 생성한 무거운 비디오를 브라우저에서 60fps로 실시간 상호작용 가능한 벡터 Lottie/Rive 런타임으로 변환하고 번들 크기를 90% 압축하는 웹 성능 최적화 노하우입니다.",
    content: `AI 비디오 도구로 만든 고화질 MP4 파일은 화려하지만, 웹사이트에 그대로 탑재할 경우 치명적인 성능 저하를 초래합니다. 15MB가 넘는 비디오는 모바일 데이터 소모가 심하고, Largest Contentful Paint(LCP) 지표를 파괴하며, 사용자의 마우스 움직임에 반응할 수 없습니다.

해결책은 AI 생성 비디오에서 핵심 모션 궤적만을 추출하여 브라우저에서 실시간 벡터로 연산하는 Rive 및 Lottie 바이너리로 컴파일하는 것입니다.

HongLabAI에서는 AI 생성 키프레임을 벡터화한 뒤, 베지에 곡선 감축(Bezier Decimation) 알고리즘으로 불필요한 제어점을 제거하여 파일 크기를 평균 80KB 미만으로 경량화합니다.

더 나아가 Rive 상태 머신(State Machine)에 연결하여, 마우스 호버 시 재생 속도가 가속되거나 클릭 시 폭죽이 터지는 반응형 인터랙션을 코딩 없이 구현할 수 있습니다.`,
    keyTakeaways: [
      "비디오는 단순 시청용이지만, Lottie/Rive로 전환하면 마우스와 스크롤에 반응하는 살아있는 인터랙션이 됨",
      "베지에 곡선 오차 허용치(Tolerance: 0.15) 최적화로 시각적 차이 없이 용량 90% 절감",
      "웹사이트 코어 웹 바이탈(Core Web Vitals) 점수를 유지하면서도 애플 수준의 유려한 인터랙션 제공",
    ],
    codeSnippet: {
      language: "typescript",
      code: `import React from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

// AI 생성 모션을 80KB 초경량 Rive 인터랙티브 컴포넌트로 렌더링
export default function InteractiveAiGraphic() {
  const { rive, RiveComponent } = useRive({
    src: "/media/ai-optimized-motion.riv", // 78KB 초경량 바이너리
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // 마우스 진입 시 AI 모션의 가속도를 트리거
  const hoverTrigger = useStateMachineInput(rive, "State Machine 1", "isHovered");

  return (
    <div
      className="relative h-96 w-full cursor-pointer"
      onMouseEnter={() => hoverTrigger && (hoverTrigger.value = true)}
      onMouseLeave={() => hoverTrigger && (hoverTrigger.value = false)}
    >
      <RiveComponent className="h-full w-full object-contain" />
    </div>
  );
}`,
    },
    architectureFlow: [
      "AI 비디오 키프레임 추출",
      "SVG 벡터 트레이싱 & 베지에 커브 디시메이션",
      "Rive 상태 머신(State Machine) 인터랙션 바인딩",
      "Next.js 동적 임포트 & WebGL 가속 렌더링",
    ],
    tags: ["Rive", "Lottie", "WebMotion", "PerformanceOptimization", "InteractiveUI"],
    difficulty: "중급",
    author: "홍은선 연구원",
    authorRole: "HongLabAI AI 엔지니어링 리드",
    createdAt: "2026-11-11",
    views: 1390,
    likes: 98,
    comments: [],
  },
];
