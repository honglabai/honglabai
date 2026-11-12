import { SectionId, type ServiceItem } from "@/types";

const services: ServiceItem[] = [
  {
    title: "AI 솔루션 개발",
    description: "LLM, 문서 임베딩, 정밀 파인튜닝 등 비즈니스 도메인에 특화된 고성능 AI 파이프라인을 구축합니다.",
    icon: "brain",
  },
  {
    title: "기술 아키텍처 컨설팅",
    description: "안정적인 프로덕션 운영을 위한 마이크로서비스 설계, 고가용성 DB 및 클라우드 인프라를 수립합니다.",
    icon: "layers",
  },
  {
    title: "풀스택 웹·앱 개발",
    description: "Next.js, TypeScript, 모바일 반응형 프레임워크를 기반으로 견고하고 직관적인 제품을 제작합니다.",
    icon: "code",
  },
  {
    title: "DX·업무 자동화",
    description: "사내 반복 데이터 파이프라인 및 복합 웹훅 연동을 통해 조직의 리드타임을 단축하고 생산성을 높입니다.",
    icon: "workflow",
  },
];

function ServiceIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "brain") {
    return (
      <svg {...commonProps}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M12 5v14" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg {...commonProps}>
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" />
        <path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg {...commonProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  // workflow
  return (
    <svg {...commonProps}>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6" />
    </svg>
  );
}

export default function Features() {
  return (
    <section id={SectionId.SERVICES} className="relative bg-white py-20 md:py-28 border-t border-zinc-200/60">
      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500">
            핵심 엔지니어링 역량
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            기획부터 실무 배포까지 직접 검증합니다
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
            HongLabAI는 현업의 구체적인 비즈니스 문제를 정의하고, 상용 수준의 완성도를 가진 소프트웨어와 인프라로 연결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 transition-colors duration-150 hover:border-zinc-400 hover:bg-zinc-50/40"
            >
              <div>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                  <ServiceIcon name={service.icon} className="h-5 w-5 text-zinc-800" />
                </div>
                <h3 className="mb-2 text-base font-bold text-zinc-950">{service.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{service.description}</p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-3">
                <span className="text-[11px] font-medium text-zinc-400">HongLabAI Verified</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
