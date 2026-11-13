import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-14">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-zinc-100">
          {/* Brand & Business Identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="text-2xl font-black tracking-tighter text-zinc-950">
              HongLab<span className="text-zinc-400">AI</span>
            </div>
            <p className="text-xs font-bold text-lime-800">
              AI로, 사람을 널리 이롭게.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              홍익인간(弘益人間)의 철학으로 일상의 작은 불편을 발견하고, 실제 작동하는 AI 소프트웨어로 해결합니다.
            </p>
            <address className="space-y-1 text-xs text-zinc-500 not-italic pt-1">
              <p>상호: 홍랩에이아이 (HonglabAI)</p>
              <p>대표자: 홍은선 · 사업자등록번호: 571-22-02410</p>
              <p>
                공식 이메일:{" "}
                <a
                  href="mailto:honglabai@gmail.com"
                  className="font-medium text-zinc-900 underline decoration-accent-strong hover:text-zinc-950"
                >
                  honglabai@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Nav Column 1: 주요 서비스 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
              주요 서비스
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <Link href="/apps" className="hover:text-zinc-950 transition-colors">
                  앱 포트폴리오
                </Link>
              </li>
              <li>
                <Link href="/ai-board" className="hover:text-zinc-950 transition-colors">
                  AI 활용 트리 게시판
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-zinc-950 transition-colors">
                  엔지니어링 &amp; 컨설팅
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: 회사 및 지원 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
              회사 및 지원
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <Link href="/about" className="hover:text-zinc-950 transition-colors">
                  브랜드 스토리 &amp; 회사 소개
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  프로젝트 및 기술 문의
                </Link>
              </li>
              <li>
                <span className="text-zinc-400">문의 회신: 영업일 기준 24시간 내</span>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: 정책 및 광고 고지 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
              정책 및 광고 고지
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <Link href="/privacy" className="font-semibold text-zinc-700 hover:text-zinc-950 transition-colors">
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link href="/privacy#cookies" className="text-lime-700 font-semibold hover:underline transition-colors">
                  광고 및 쿠키 정책 (구글 애드센스 고지)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-950 transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <a href="/ads.txt" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 transition-colors">
                  공식 ads.txt 인증
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Admin link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <p>© {new Date().getFullYear()} HongLabAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400">Google AdSense Partner Compliant</span>
            <Link
              href="/admin/login"
              aria-label="관리자 로그인"
              className="text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
