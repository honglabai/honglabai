"use client";

import { useState } from "react";
import { SectionId, type ConsultationResponse } from "@/types";

export default function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState("project");
  const [projectDesc, setProjectDesc] = useState("");
  const [email, setEmail] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<ConsultationResponse | null>(null);
  const [notice, setNotice] = useState("");

  const handleAIAnalysis = async () => {
    if (projectDesc.trim().length < 10) {
      setNotice("프로젝트 내용을 10자 이상 입력해 주세요.");
      return;
    }

    setNotice("");
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription: projectDesc }),
      });

      if (!response.ok) {
        throw new Error("AI analysis request failed");
      }

      const result = (await response.json()) as ConsultationResponse;
      setAiResponse(result);
    } catch {
      setNotice("AI 분석 연결이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setNotice("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType,
          name,
          email,
          company,
          message: projectDesc,
          privacyConsent: new FormData(form).get("privacy_consent") === "on",
          website: new FormData(form).get("website"),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "문의 접수에 실패했습니다.");

      setNotice(result.message || "문의가 접수되었습니다.");
      setName("");
      setCompany("");
      setEmail("");
      setProjectDesc("");
      setAiResponse(null);
      form.reset();
    } catch (submitError) {
      setNotice(submitError instanceof Error ? submitError.message : "문의 접수에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-primary/10 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="lg:w-1/3">
            <h2 className="mb-6 text-4xl font-bold text-white">
              프로젝트를
              <br />
              시작해볼까요?
            </h2>
            <p className="mb-8 leading-relaxed text-gray-400">
              아이디어만 있어도 괜찮습니다. HongLabAI의 AI 분석 시스템이 요구사항을 먼저 살펴보고
              적합한 기술 방향을 제안합니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10" aria-hidden="true">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-white">Address</h3>
                  <p className="text-sm text-gray-400">공식 사업장 정보 확인 후 공개 예정</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10" aria-hidden="true">
                  📧
                </div>
                <div>
                  <h3 className="font-bold text-white">Email</h3>
                  <p className="text-sm text-gray-400">contact@honglabai.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-300">이름</label>
                    <input id="contact-name" type="text" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} className="w-full rounded-lg border border-gray-700 bg-black/30 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-primary focus:outline-none" required />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="mb-2 block text-sm font-medium text-gray-300">회사·팀 <span className="text-gray-600">(선택)</span></label>
                    <input id="contact-company" type="text" value={company} onChange={(event) => setCompany(event.target.value)} maxLength={120} className="w-full rounded-lg border border-gray-700 bg-black/30 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-primary focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-type" className="mb-2 block text-sm font-medium text-gray-300">문의 유형</label>
                  <select id="inquiry-type" value={inquiryType} onChange={(event) => setInquiryType(event.target.value)} className="w-full rounded-lg border border-gray-700 bg-slate-950 px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none">
                    <option value="project">앱·웹 프로젝트</option>
                    <option value="partnership">협업·제휴</option>
                    <option value="investment">투자</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-300">
                    이메일
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="example@company.com"
                    className="w-full rounded-lg border border-gray-700 bg-black/30 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="project-description" className="mb-2 block text-sm font-medium text-gray-300">
                    프로젝트 내용
                  </label>
                  <textarea
                    id="project-description"
                    value={projectDesc}
                    onChange={(event) => setProjectDesc(event.target.value)}
                    rows={4}
                    placeholder="만들고 싶은 서비스나 해결하고 싶은 문제를 자유롭게 적어주세요."
                    className="w-full resize-none rounded-lg border border-gray-700 bg-black/30 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col items-center justify-between gap-4 py-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing || projectDesc.length === 0}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-bold transition-all sm:w-auto ${
                      isAnalyzing
                        ? "cursor-not-allowed bg-gray-700 text-gray-400"
                        : "bg-gradient-to-r from-secondary to-primary text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    }`}
                  >
                    {isAnalyzing ? "AI 분석 중..." : "✨ AI 초안 분석하기"}
                  </button>
                  <span className="hidden text-xs text-gray-500 sm:block">서버에서 안전하게 내용을 분석합니다.</span>
                </div>

                {aiResponse ? (
                  <div className="animate-fade-in rounded-xl border border-primary/30 bg-primary/10 p-6">
                    <h3 className="mb-2 font-bold text-primary-light">AI 분석 결과</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-300">{aiResponse.analysis}</p>
                    <div>
                      <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">추천 기술 스택</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {aiResponse.techStack.map((tech) => (
                          <span key={tech} className="rounded-full border border-gray-700 bg-dark px-3 py-1 text-xs text-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {notice ? (
                  <p className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100" aria-live="polite">
                    {notice}
                  </p>
                ) : null}

                <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
                  <input type="checkbox" name="privacy_consent" required className="mt-1" />
                  <span>문의 처리 목적으로 이름, 이메일, 회사명과 문의 내용을 수집·이용하는 데 동의합니다.</span>
                </label>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-white py-4 font-bold text-dark shadow-lg transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "문의 저장 중..." : "문의 보내기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
