import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-paper px-6 text-center text-zinc-950">
      <div>
        <p className="mb-3 font-robot text-sm tracking-[0.3em] text-zinc-500">404</p>
        <h1 className="mb-4 text-4xl font-black">페이지를 찾을 수 없습니다</h1>
        <p className="mb-8 text-zinc-500">주소가 변경되었거나 아직 공개되지 않은 페이지입니다.</p>
        <Link href="/" className="inline-flex rounded-lg bg-accent px-6 py-3 font-bold transition-colors hover:bg-accent-strong">
          홈페이지로 이동
        </Link>
      </div>
    </main>
  );
}
