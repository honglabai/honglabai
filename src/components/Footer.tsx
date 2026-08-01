import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="mb-2 text-xl font-bold tracking-tighter text-white">
              HongLab<span className="text-primary-light">AI</span>
            </div>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} HongLabAI. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/admin/login"
              aria-label="관리자 로그인"
              className="inline-flex min-h-11 items-center px-3 text-xs text-slate-400 transition-colors hover:text-slate-200"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
