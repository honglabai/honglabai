import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "이용약관",
  description: "HongLabAI 웹사이트 이용 조건과 책임 범위를 안내합니다.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "2026-07-18";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="px-6 pt-36 pb-24">
        <article className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">이용약관</h1>
          <p className="mt-3 text-sm text-zinc-500">시행일: {EFFECTIVE_DATE}</p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제1조 (목적)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              본 약관은 HongLabAI(이하 &ldquo;회사&rdquo;)가 운영하는 웹사이트(이하 &ldquo;사이트&rdquo;)의 이용 조건과
              절차, 회사와 이용자의 권리·의무를 정하는 것을 목적으로 합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제2조 (서비스의 내용)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              사이트는 회사가 개발한 제품 소개와 프로젝트 문의 접수를 제공합니다. 회원가입 절차는 없으며, 별도의 유료
              서비스를 제공하지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제3조 (문의 접수)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              이용자는 문의 양식을 통해 프로젝트 상담을 요청할 수 있습니다. 문의 접수는 계약의 청약이나 승낙이 아니며,
              구체적인 계약 조건은 별도 협의와 서면으로 정합니다. 회사는 문의 내용에 대해 회신 의무를 부담하지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제4조 (이용자의 의무)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="mt-3 space-y-2 leading-relaxed text-zinc-600">
              <li>· 타인의 정보를 도용하거나 허위 정보를 입력하는 행위</li>
              <li>· 자동화 수단으로 문의를 반복 발송하거나 서비스 운영을 방해하는 행위</li>
              <li>· 사이트의 취약점을 탐색하거나 권한 없이 접근을 시도하는 행위</li>
              <li>· 회사 또는 제3자의 지식재산권을 침해하는 행위</li>
            </ul>
            <p className="mt-4 text-sm text-zinc-500">
              회사는 서비스의 안정적 운영을 위해 요청 빈도를 제한할 수 있으며, 위 행위가 확인되면 접근을 차단할 수 있습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제5조 (지식재산권)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              사이트에 게시된 텍스트, 이미지, 디자인 등 콘텐츠에 대한 권리는 회사 또는 정당한 권리자에게 있습니다.
              이용자는 회사의 사전 동의 없이 이를 복제, 배포, 상업적으로 이용할 수 없습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제6조 (면책)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              회사는 천재지변, 정전, 호스팅 사업자의 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.
              사이트에 게시된 정보는 참고용이며, 이용자가 해당 정보를 근거로 내린 판단의 결과에 대해 회사는 책임을 지지
              않습니다. 사이트에 포함된 외부 링크의 내용에 대해서도 책임을 지지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제7조 (약관의 변경)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              회사는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 이 페이지에 게시한 시점부터 효력이 발생합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제8조 (준거법 및 관할)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 민사소송법에 따른 관할 법원에 제소합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제9조 (사업자 정보)</h2>
            <ul className="mt-3 space-y-2 leading-relaxed text-zinc-600">
              <li>· 상호: 홍랩에이아이 (HonglabAI)</li>
              <li>· 대표자: 홍은선</li>
              <li>· 사업자등록번호: 571-22-02410</li>
              <li>
                · 이메일:{" "}
                <a href="mailto:honglabai@gmail.com" className="font-medium text-zinc-900 underline decoration-accent-strong decoration-2 underline-offset-2">
                  honglabai@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <p className="mt-12 text-sm text-zinc-500">
            개인정보의 수집과 이용에 관한 내용은{" "}
            <a href="/privacy" className="font-medium text-zinc-900 underline decoration-accent-strong decoration-2 underline-offset-2">개인정보 처리방침</a>을 확인해 주시기 바랍니다.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
