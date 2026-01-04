import React, { useState } from 'react';
import { SectionId, ConsultationResponse } from '../types';
import { analyzeProjectRequest } from '../services/geminiService';

const Contact: React.FC = () => {
  const [projectDesc, setProjectDesc] = useState('');
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<ConsultationResponse | null>(null);

  const handleAIAnalysis = async () => {
    if (projectDesc.length < 10) {
      alert("프로젝트 내용을 조금 더 자세히 적어주세요 (10자 이상).");
      return;
    }
    setIsAnalyzing(true);
    const result = await analyzeProjectRequest(projectDesc);
    setAiResponse(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. (데모)");
    setProjectDesc('');
    setEmail('');
    setAiResponse(null);
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
            
          {/* Left Side: Info */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold text-white mb-6">프로젝트를<br/>시작해볼까요?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              아이디어만 있어도 괜찮습니다. HongLabAI의 스마트 AI 분석 시스템이 
              귀하의 요구사항을 1차적으로 분석하고 최적의 기술 스택을 제안해드립니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">📍</div>
                <div>
                  <h4 className="text-white font-bold">Address</h4>
                  <p className="text-gray-400 text-sm">서울 강남구 테헤란로 (스타트업 허브)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">📧</div>
                <div>
                  <h4 className="text-white font-bold">Email</h4>
                  <p className="text-gray-400 text-sm">contact@honglabai.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form & AI */}
          <div className="lg:w-2/3">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-600 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">프로젝트 내용</label>
                  <textarea 
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    rows={4}
                    placeholder="만들고 싶은 서비스나 해결하고 싶은 문제에 대해 자유롭게 적어주세요. 예: 쇼핑몰 고객 응대용 AI 챗봇을 만들고 싶습니다."
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-600 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                {/* AI Feature Block */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                    <button
                        type="button"
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing || !projectDesc}
                        className={`w-full sm:w-auto px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            isAnalyzing 
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                            : 'bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-white'
                        }`}
                    >
                        {isAnalyzing ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                AI 분석 중...
                            </>
                        ) : (
                            <>✨ AI 초안 분석하기</>
                        )}
                    </button>
                    <span className="text-xs text-gray-500 hidden sm:block">
                        Gemini Pro가 내용을 미리 분석해드립니다.
                    </span>
                </div>

                {/* AI Result Display */}
                {aiResponse && (
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 animate-fade-in">
                        <h5 className="text-primary-light font-bold mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                            AI 분석 결과
                        </h5>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{aiResponse.analysis}</p>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">추천 기술 스택</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {aiResponse.techStack.map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-dark rounded-full text-xs text-secondary border border-gray-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <button 
                  type="submit" 
                  className="w-full py-4 bg-white text-dark font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg"
                >
                  문의 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;