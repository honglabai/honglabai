import { SectionId, type ServiceItem } from "@/types";

const services: ServiceItem[] = [
  {
    title: "AI 솔루션 개발",
    description: "LLM, 컴퓨터 비전, 예측 모델링 등 비즈니스 데이터에 맞춘 AI 제품을 설계하고 배포합니다.",
    icon: "🧠",
  },
  {
    title: "기술 아키텍처 컨설팅",
    description: "대규모 트래픽을 고려한 클라우드 인프라와 확장 가능한 서비스 아키텍처를 설계합니다.",
    icon: "🏗️",
  },
  {
    title: "풀스택 웹·앱 개발",
    description: "최신 기술 스택을 활용해 직관적이고 확장 가능한 웹과 모바일 애플리케이션을 구축합니다.",
    icon: "💻",
  },
  {
    title: "DX·업무 자동화",
    description: "레거시 시스템을 현대화하고 반복 업무를 자동화하여 조직의 생산성을 높입니다.",
    icon: "🚀",
  },
];

export default function Features() {
  return (
    <section id={SectionId.SERVICES} className="relative bg-dark py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-sm font-bold tracking-widest text-secondary uppercase">Our Expertise</h2>
          <p className="mb-6 text-3xl font-bold text-white md:text-5xl">혁신을 위한 핵심 역량</p>
          <p className="mx-auto max-w-2xl text-gray-400">
            HongLabAI는 비즈니스 문제를 기술로 해결하고 실제 운영 가능한 제품으로 연결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-white/10"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-[50px] transition-all group-hover:bg-primary/20" />
              <div className="relative z-10 mb-6 text-4xl" aria-hidden="true">
                {service.icon}
              </div>
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
