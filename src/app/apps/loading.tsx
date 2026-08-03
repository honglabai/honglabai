export default function Loading() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-6 py-16">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-64 animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </main>
  );
}
