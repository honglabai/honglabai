import React from 'react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center relative z-10">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1 text-center lg:text-left pb-10 lg:pb-0">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-sm font-semibold tracking-wider mb-2">
              AI TECHNOLOGY PARTNER
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              상상을 뛰어넘는 <br />
              지능형 솔루션
            </h1>
            <span className="font-robot text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] tracking-wider">
                HongLabAI
              </span><br />
            <p className="text-gray-400 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              HongLabAI는 최첨단 인공지능 기술과 소프트웨어 엔지니어링을 결합하여 
              귀하의 비즈니스를 혁신합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/25"
            >
              서비스 알아보기
            </button>
            <button 
              onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              무료 상담 신청
            </button>
          </div>
          
          <div className="pt-8 flex items-center justify-center lg:justify-start space-x-8 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Projects 100+
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Client Retention 98%
            </div>
          </div>
        </div>

        {/* Right: Spline 3D Model */}
        <div className="relative h-[400px] lg:h-[800px] w-full order-1 lg:order-2 flex items-center justify-center lg:justify-end">
           <div className="w-full h-full lg:absolute lg:right-[-10%] lg:w-[120%] lg:h-[120%] transition-opacity duration-1000 ease-in-out">
            <iframe 
                src='https://my.spline.design/nexbotrobotcharacterconcept-rmEPucruDtWTh3PuUUKPteKq/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="pointer-events-auto"
                title="3D Robot"
            ></iframe>
           </div>
           {/* Overlay to prevent iframe capturing scroll on mobile sometimes, but allow interaction */}
           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(15,23,42,1)] lg:shadow-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;