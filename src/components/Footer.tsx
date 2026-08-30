import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="mb-2 text-xl font-bold tracking-tighter text-zinc-950">
              HongLab<span className="text-zinc-400">AI</span>
            </div>
            <address className="space-y-1 text-xs leading-relaxed text-zinc-500 not-italic">
              <p>홍랩에이아이 (HonglabAI) · 대표 홍은선</p>
              <p>사업자등록번호 571-22-02410</p>
              <p>
                <a href="mailto:honglabai@gmail.com" className="underline transition-colors hover:text-zinc-950">
                  honglabai@gmail.com
                </a>
              </p>
            </address>
            <p className="mt-3 text-sm text-zinc-500">© {new Date().getFullYear()} HongLabAI. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center px-3 text-xs text-zinc-600 transition-colors hover:text-zinc-950"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-11 items-center px-3 text-xs text-zinc-500 transition-colors hover:text-zinc-950"
            >
              이용약관
            </Link>
            <Link
              href="/admin/login"
              aria-label="관리자 로그인"
              className="inline-flex min-h-11 items-center px-3 text-xs text-zinc-500 transition-colors hover:text-zinc-950"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
