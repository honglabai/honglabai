import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "이용약관",
  description: "HongLabAI 웹사이트 이용 조건, 콘텐츠 저작권 및 광고 게재에 관한 규정을 안내합니다.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "2026-11-11";

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
              사이트는 회사가 개발한 디지털 제품 및 앱 포트폴리오 소개, AI 기술 활용 지식 아카이브(게시판), 그리고
              프로젝트 컨설팅 문의 접수를 제공합니다. 본 웹사이트는 기본적으로 비회원 체제로 운영되며 누구에게나 투명하게 공개됩니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제3조 (문의 접수 및 상담)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              이용자는 문의 양식을 통해 프로젝트 상담 및 기술 문의를 요청할 수 있습니다. 문의 접수는 계약의 성립을 의미하지
              않으며, 구체적인 계약 조건과 범위는 상호 협의 및 서면 계약서를 통해 확정됩니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제4조 (이용자의 의무)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">이용자는 다음 각 호의 행위를 하여서는 아니 됩니다:</p>
            <ul className="mt-3 space-y-2 leading-relaxed text-zinc-600 text-sm">
              <li>· 타인의 정보를 도용하거나 허위 사실을 기재하는 행위</li>
              <li>· 자동화된 스크립트나 봇을 이용하여 무단으로 트래픽을 유발하거나 사이트 정상 운영을 방해하는 행위</li>
              <li>· 사이트 내 광고를 인위적으로 클릭하거나 광고주 및 회사에 피해를 주는 행위</li>
              <li>· 회사 또는 제3자의 저작권, 상표권 등 지식재산권을 침해하는 행위</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제5조 (지식재산권)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              사이트에 게시된 모든 기술 문서, 아키텍처 다이어그램, 디자인 요소, 텍스트 및 소프트웨어 코드 스니펫의 저작권은
              회사에 귀속됩니다. 기술 연구 및 학습 목적의 인용은 출처를 명시하는 한도 내에서 허용되나, 사전 허가 없는
              무단 상업적 전재 및 재배포는 엄격히 금지됩니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제6조 (광고의 게재 및 제3자 제휴)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              1. 회사는 사이트의 지속적인 고품질 기술 콘텐츠 제작 및 인프라 운영을 위해 사이트 내에 구글 애드센스(Google AdSense)
              등 제3자 사업자의 온라인 광고를 게재할 수 있습니다.
            </p>
            <p className="mt-3 leading-relaxed text-zinc-600">
              2. 이용자가 사이트 내에 게재된 광고를 통해 제3자의 사이트로 이동하거나 해당 사업자의 상품·서비스를 이용할 경우,
              해당 거래는 전적으로 이용자와 광고주 간의 관계이며 회사는 이에 대한 일체의 책임을 부담하지 않습니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제7조 (면책 조항)</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              회사는 천재지변, 정전, 통신망 장애 등 불가항력적인 사유로 인한 서비스 일시 중단에 대해 책임을 면합니다.
              또한 사이트 내 기술 문서 및 벤치마크 자료는 정보 제공을 목적으로 작성된 것이며, 이를 적용하여 발생하는 결과에
              대해서는 이용자 본인의 책임 하에 검증되어야 합니다.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">제8조 (사업자 정보 및 연락처)</h2>
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 space-y-1.5">
              <p className="font-bold text-zinc-950 text-base mb-2">홍랩에이아이 (HonglabAI)</p>
              <p>· 대표자: 홍은선</p>
              <p>· 사업자등록번호: 571-22-02410</p>
              <p>· 업태 / 종목: 정보통신업 / 소프트웨어 개발 및 공급, AI 기술 컨설팅</p>
              <p>
                · 이메일:{" "}
                <a
                  href="mailto:honglabai@gmail.com"
                  className="font-medium text-zinc-950 underline decoration-accent-strong decoration-2 underline-offset-2"
                >
                  honglabai@gmail.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
