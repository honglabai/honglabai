import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "HongLabAI가 수집하는 개인정보 항목, 이용 목적, 구글 애드센스 광고 쿠키 정책 및 이용자의 권리를 안내합니다.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "2026-11-11";

const collected = [
  ["이름", "문의자 식별 및 회신"],
  ["이메일 주소", "문의 답변 발송"],
  ["회사명(선택)", "문의 배경 파악"],
  ["문의 유형·문의 내용", "문의 처리 및 상담"],
  ["접속 로그 및 기기 정보(User-Agent, IP)", "스팸 방지, 서비스 보안 및 통계 분석"],
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="px-6 pt-36 pb-24">
        <article className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">개인정보 처리방침</h1>
          <p className="mt-3 text-sm text-zinc-500">최종 개정일: {EFFECTIVE_DATE}</p>

          <p className="mt-8 leading-relaxed text-zinc-600">
            HongLabAI(이하 &ldquo;회사&rdquo;)는 이용자의 자유와 권리 보호를 최우선으로 하며, 개인정보 보호법,
            정보통신망 이용촉진 및 정보보호 등에 관한 법률, 그리고 글로벌 웹 광고 표준 정책(Google AdSense 정책 준수)을
            준수합니다. 본 방침은 회사가 수집하는 정보의 종류, 처리 목적, 제3자 광고 사업자의 쿠키 사용에 대한 권리와
            선택권을 상세히 안내합니다.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">1. 수집하는 개인정보 항목과 이용 목적</h2>
            <p className="mt-3 text-zinc-600">
              회사는 문의 접수 및 서비스 안정성 유지를 위해 최소한의 개인정보만을 수집합니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th scope="col" className="py-3 pr-4 font-bold">수집 항목</th>
                    <th scope="col" className="py-3 font-bold">이용 목적</th>
                  </tr>
                </thead>
                <tbody>
                  {collected.map(([item, purpose]) => (
                    <tr key={item} className="border-b border-zinc-200">
                      <td className="py-3 pr-4 text-zinc-800">{item}</td>
                      <td className="py-3 text-zinc-500">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              회사는 사상, 신념, 건강, 정치적 견해 등 민감정보나 주민등록번호 등의 고유식별정보를 절대 수집하지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. 개인정보의 보유 및 이용 기간</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              문의 정보는 고객 응대 이력 관리 및 분쟁 해결을 위해 접수일로부터 <strong className="text-zinc-950">3년간</strong> 보관 후
              지체 없이 파기합니다. 이용자가 삭제를 요청할 경우 관계 법령에 따른 보존 의무가 없는 한 즉시 파기합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. 개인정보의 제3자 제공 및 국외 이전</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 안정적인 클라우드 인프라 운영을 위해
              다음의 위탁 업체를 이용합니다:
            </p>
            <ul className="mt-4 space-y-3 text-zinc-600 text-sm">
              <li>
                <strong className="text-zinc-950">Supabase Inc.</strong> — 데이터베이스 및 인증 인프라 (보관 리전: 대한민국 서울)
              </li>
              <li>
                <strong className="text-zinc-950">Vercel Inc.</strong> — 엣지 CDN 및 글로벌 웹 호스팅 (저장 위치: 글로벌 엣지 네트워크)
              </li>
            </ul>
          </section>

          {/* CRITICAL FOR GOOGLE ADSENSE APPROVAL */}
          <section id="cookies" className="mt-12 rounded-2xl border border-lime-300 bg-lime-50/40 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-xs text-accent font-bold">
                AD
              </span>
              <h2 className="text-2xl font-black text-zinc-950">
                4. 쿠키(Cookie) 및 제3자 광고 사업자 정책 (구글 애드센스 고지)
              </h2>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-700">
              <p>
                본 사이트는 웹사이트 품질 개선, 트래픽 분석 및 온라인 광고 게재를 위해 쿠키(Cookie) 및 유사한 저장 기술을
                사용합니다. 특히 구글(Google Inc.)을 포함한 제3자 광고 사업자와 파트너십을 맺고 있으며, 구글 애드센스(Google AdSense)
                프로그램 정책에 따라 다음 사항을 투명하게 공개합니다:
              </p>
              <ul className="space-y-2.5 list-disc pl-5">
                <li>
                  <strong className="text-zinc-950">서드파티 광고 쿠키 사용:</strong> 구글을 포함한 제3자 공급업체는
                  이용자가 본 웹사이트 또는 다른 웹사이트를 이전에 방문한 기록을 기반으로 광고를 게재하기 위해 쿠키를 사용합니다.
                </li>
                <li>
                  <strong className="text-zinc-950">맞춤형 광고 게재:</strong> 구글의 광고 쿠키 사용을 통해, 구글과 해당 파트너는
                  이용자의 본 웹사이트 및 인터넷의 다른 사이트 방문 정보를 바탕으로 관련성 높은 맞춤형 광고를 제공할 수 있습니다.
                </li>
                <li>
                  <strong className="text-zinc-950">맞춤형 광고 수신 거부(Opt-Out):</strong> 이용자는 언제든지 맞춤형 광고 게재를
                  거부할 수 있습니다. 구글 맞춤형 광고 설정을 해제하려면{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-lime-800 underline decoration-2 underline-offset-2"
                  >
                    Google 광고 설정(https://adssettings.google.com)
                  </a>
                  을 방문하시거나,{" "}
                  <a
                    href="https://www.aboutads.info/choices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-lime-800 underline decoration-2 underline-offset-2"
                  >
                    AboutAds(www.aboutads.info/choices)
                  </a>
                  를 통해 제3자 공급업체의 맞춤형 광고용 쿠키 사용을 차단할 수 있습니다.
                </li>
              </ul>

              <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
                <h3 className="font-bold text-zinc-900 mb-2">웹 브라우저에서의 쿠키 설정 및 삭제 방법</h3>
                <p className="text-xs text-zinc-600 mb-2">
                  이용자는 브라우저의 옵션을 설정하여 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다:
                </p>
                <ul className="text-xs text-zinc-500 space-y-1 pl-4 list-disc">
                  <li>Chrome: 설정 &gt; 개인정보 보호 및 보안 &gt; 서드파티 쿠키 설정</li>
                  <li>Safari: 환경설정 &gt; 개인정보 보호 &gt; 모든 쿠키 차단</li>
                  <li>Edge: 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">5. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              이용자는 개인정보 보호책임자에게 서면, 전자우편을 통해 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있으며,
              회사는 접수일로부터 지체 없이 조치하고 그 결과를 안내합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">6. 개인정보의 안전성 확보 조치</h2>
            <ul className="mt-3 space-y-2 leading-relaxed text-zinc-600 text-sm">
              <li>· 전송 구간 SSL/TLS 암호화(HTTPS) 의무 적용</li>
              <li>· 데이터베이스 접근 제어 및 행 단위 보안 정책(Row Level Security) 적용</li>
              <li>· 최신 보안 패치 및 침해 사고 모니터링 체계 가동</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">7. 개인정보 보호책임자 및 고충처리 부서</h2>
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="font-bold text-zinc-950">홍랩에이아이 (HonglabAI)</p>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                <li>· 개인정보 보호책임자: 홍은선 (대표)</li>
                <li>· 사업자등록번호: 571-22-02410</li>
                <li>
                  · 이메일:{" "}
                  <a
                    href="mailto:honglabai@gmail.com"
                    className="font-medium text-zinc-950 underline decoration-accent-strong decoration-2 underline-offset-2"
                  >
                    honglabai@gmail.com
                  </a>
                </li>
                <li>· 응답 시간: 영업일 기준 24시간 이내</li>
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">8. 방침의 변경 및 공지</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              본 개인정보 처리방침은 법령 또는 서비스 정책의 변경에 따라 수정될 수 있으며, 개정 시 사이트 공지사항을 통해
              최소 7일 전부터 사전 고지합니다.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
