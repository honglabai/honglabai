import React from 'react';
import { SectionId, ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "AI 솔루션 개발",
    description: "LLM, 컴퓨터 비전, 예측 모델링 등 귀사의 데이터에 맞춤화된 고성능 AI 모델을 설계하고 배포합니다.",
    icon: "🧠"
  },
  {
    title: "기술 아키텍처 컨설팅",
    description: "대규모 트래픽 처리가 가능한 클라우드 인프라와 마이크로서비스 아키텍처(MSA) 설계를 지원합니다.",
    icon: "🏗️"
  },
  {
    title: "풀스택 웹/앱 개발",
    description: "React, Node.js, Python 등 최신 기술 스택을 활용하여 직관적이고 확장 가능한 애플리케이션을 구축합니다.",
    icon: "💻"
  },
  {
    title: "DX (디지털 전환)",
    description: "레거시 시스템을 현대화하고 업무 프로세스를 자동화하여 기업의 생산성을 극대화합니다.",
    icon: "🚀"
  }
];

const Features: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">혁신을 위한 핵심 역량</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            HongLabAI는 단순한 개발사가 아닙니다. 비즈니스 문제를 기술로 해결하는 전략적 파트너입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-all"></div>
              
              <div className="text-4xl mb-6 relative z-10">{service.icon}</div>
              <h4 className="text-xl font-bold text-white mb-4 relative z-10 group-hover:text-primary-light transition-colors">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;