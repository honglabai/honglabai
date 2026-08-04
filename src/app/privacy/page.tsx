import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "HongLabAI가 수집하는 개인정보 항목, 이용 목적, 보유 기간과 이용자의 권리를 안내합니다.",
  alternates: { canonical: "/privacy" },
};

// 이 문서의 수집 항목·보유 기간은 실제 구현과 일치해야 한다.
// 근거: supabase/migrations/…_honglabai_admin_portfolio.sql 의 public.inquiries 테이블,
// src/app/api/inquiries/route.ts 의 저장 필드.
// 폼 필드나 컬럼을 바꾸면 이 문서와 EFFECTIVE_DATE 를 함께 갱신할 것.
const EFFECTIVE_DATE = "2026-07-18";

const collected = [
  ["이름", "문의자 식별 및 회신"],
  ["이메일 주소", "문의 답변 발송"],
  ["회사명(선택)", "문의 배경 파악"],
  ["문의 유형·문의 내용", "문의 처리 및 상담"],
  ["접속 브라우저 정보(User-Agent)", "스팸·부정 이용 차단"],
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main id="main-content" className="px-6 pt-36 pb-24">
        <article className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">개인정보 처리방침</h1>
          <p className="mt-3 text-sm text-gray-400">시행일: {EFFECTIVE_DATE}</p>

          <p className="mt-8 leading-relaxed text-gray-300">
            HongLabAI(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법 등 관련 법령을
            준수합니다. 본 방침은 회사가 운영하는 웹사이트에서 수집하는 개인정보의 항목과 처리 방법을 안내합니다.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">1. 수집하는 개인정보 항목과 이용 목적</h2>
            <p className="mt-3 text-gray-300">
              회사는 문의 양식을 통해 아래 정보를 수집합니다. 회원가입 절차는 없으며, 문의를 남기지 않으면 개인정보가
              수집되지 않습니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th scope="col" className="py-3 pr-4 font-bold">수집 항목</th>
                    <th scope="col" className="py-3 font-bold">이용 목적</th>
                  </tr>
                </thead>
                <tbody>
                  {collected.map(([item, purpose]) => (
                    <tr key={item} className="border-b border-white/5">
                      <td className="py-3 pr-4 text-gray-200">{item}</td>
                      <td className="py-3 text-gray-400">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              회사는 사상, 건강, 정치적 견해 등 민감정보와 주민등록번호를 수집하지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. 보유 및 이용 기간</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              문의 정보는 상담 완료 후 <strong className="text-white">3년간</strong> 보관한 뒤 지체 없이 파기합니다.
              보관 기간을 두는 이유는 동일 문의의 이력 확인과 분쟁 대응을 위해서입니다. 이용자가 삭제를 요청하면
              법령상 보존 의무가 없는 한 즉시 파기합니다.
            </p>
            <p className="mt-3 leading-relaxed text-gray-300">
              전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. 제3자 제공 및 처리 위탁</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 서비스 운영을 위해 아래 사업자의 인프라를
              이용하며, 이 과정에서 데이터가 해외에 저장될 수 있습니다.
            </p>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li>
                <strong className="text-white">Supabase</strong> — 데이터베이스 및 파일 저장 (저장 위치: 대한민국 서울 리전)
              </li>
              <li>
                <strong className="text-white">Vercel</strong> — 웹사이트 호스팅 및 전송 (저장 위치: 미국 등 글로벌 인프라)
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              각 사업자는 위탁받은 업무 범위 내에서만 정보를 처리하며, 회사는 계약을 통해 안전한 관리를 요구하고 있습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. 이용자의 권리</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 연락처로
              요청하시면 지체 없이 처리하고 결과를 알려드립니다. 동의를 거부할 권리가 있으나, 동의하지 않으면 문의 접수가
              제한됩니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">5. 쿠키 등 자동 수집 장치</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              회사는 광고나 행태정보 수집을 위한 쿠키를 사용하지 않습니다. 관리자 로그인 시에는 로그인 상태 유지를 위한
              필수 쿠키만 사용하며, 일반 방문자에게는 적용되지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">6. 안전성 확보 조치</h2>
            <ul className="mt-3 space-y-2 leading-relaxed text-gray-300">
              <li>· 전송 구간 암호화(HTTPS) 적용</li>
              <li>· 데이터베이스 접근 권한을 관리자 계정으로 제한하고, 행 수준 보안(RLS)으로 통제</li>
              <li>· 관리자 작업 이력 기록 및 접근 통제</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">7. 개인정보 보호책임자 및 문의처</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              개인정보 열람·정정·삭제·처리정지 요청과 그 밖의 개인정보 관련 문의는 아래로 접수해 주시기 바랍니다.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>· 개인정보 보호책임자: 홍은선</li>
              <li>
                · 이메일:{" "}
                <a href="mailto:honglabai@gmail.com" className="text-primary-light underline">
                  honglabai@gmail.com
                </a>
              </li>
              <li>
                · <a href="/contact" className="text-primary-light underline">문의 페이지</a>를 통해서도 접수할 수 있습니다.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              개인정보 침해에 대한 신고나 상담이 필요한 경우 개인정보침해신고센터(privacy.kisa.or.kr, 국번없이 118),
              개인정보 분쟁조정위원회(kopico.go.kr, 1833-6972)에 문의하실 수 있습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">8. 방침 변경</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              본 방침이 변경되는 경우 시행일과 변경 내용을 이 페이지에 게시합니다.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
