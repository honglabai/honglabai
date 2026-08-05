import { SectionId, type ServiceItem } from "@/types";

const services: ServiceItem[] = [
  {
    title: "AI 솔루션 개발",
    description: "LLM, 컴퓨터 비전, 예측 모델링 등 비즈니스 데이터에 맞춘 AI 제품을 설계하고 배포합니다.",
    icon: "sparkles",
  },
  {
    title: "기술 아키텍처 컨설팅",
    description: "대규모 트래픽을 고려한 클라우드 인프라와 확장 가능한 서비스 아키텍처를 설계합니다.",
    icon: "layers",
  },
  {
    title: "풀스택 웹·앱 개발",
    description: "최신 기술 스택을 활용해 직관적이고 확장 가능한 웹과 모바일 애플리케이션을 구축합니다.",
    icon: "code",
  },
  {
    title: "DX·업무 자동화",
    description: "레거시 시스템을 현대화하고 반복 업무를 자동화하여 조직의 생산성을 높입니다.",
    icon: "rocket",
  },
];

function ServiceIcon({ name }: { name: string }) {
  const commonProps = { className: "h-10 w-10 text-primary-light", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (name === "layers") {
    return <svg {...commonProps}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></svg>;
  }

  if (name === "code") {
    return <svg {...commonProps}><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></svg>;
  }

  if (name === "rocket") {
    return <svg {...commonProps}><path d="M14.5 4.5c2.4-2.4 5.5-2.3 5.5-2.3s.1 3.1-2.3 5.5l-4.1 4.1-3.4-.3-.3-3.4 4.6-3.6Z" /><path d="m10.2 13.8-3.5 3.5" /><path d="M7.8 10.4 4 10l-2 2 4.3 1.2" /><path d="m13.6 16.2.4 3.8-2 2-1.2-4.3" /><path d="M8.7 17.3c-1.3 1.3-3.4 1.3-4.7 0 0-1.3 0-2.6 1.3-3.9" /><circle cx="16.5" cy="6.5" r="1" /></svg>;
  }

  return <svg {...commonProps}><path d="M12 3 10.8 7.8 6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" /><path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" /><path d="m5 15-.6 1.9-1.9.6 1.9.6L5 20l.6-1.9 1.9-.6-1.9-.6L5 15Z" /></svg>;
}

export default function Features() {
  return (
    <section id={SectionId.SERVICES} className="relative bg-dark py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 data-reveal className="mb-3 text-sm font-bold tracking-widest text-secondary-light uppercase">핵심 역량</h2>
          <p data-reveal style={{ "--reveal-delay": "60ms" } as React.CSSProperties} className="mb-6 text-3xl font-bold text-white md:text-5xl">기획부터 운영까지, 직접 만듭니다</p>
          <p className="mx-auto max-w-2xl text-gray-400">
            HongLabAI는 비즈니스 문제를 기술로 해결하고 실제 운영 가능한 제품으로 연결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/10"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-[50px] transition-all group-hover:bg-primary/20" />
              <div className="relative z-10 mb-6" aria-hidden="true"><ServiceIcon name={service.icon} /></div>
              <h3 className="relative z-10 mb-4 text-xl font-bold text-white transition-colors group-hover:text-primary-light">
                {service.title}
              </h3>
              <p className="relative z-10 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
