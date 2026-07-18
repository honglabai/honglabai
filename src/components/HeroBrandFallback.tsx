export default function HeroBrandFallback() {
  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-sm sm:min-h-[480px] lg:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(59,130,246,0.3),transparent_36%),linear-gradient(145deg,rgba(15,23,42,0.2),rgba(76,29,149,0.18))]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase sm:inset-x-10 sm:top-10" aria-hidden="true">
        <span>HongLabAI / 2026</span>
        <span>Build · Launch · Grow</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-[3rem] border border-primary/25 bg-primary/10 shadow-[0_0_90px_rgba(59,130,246,0.24)] sm:h-60 sm:w-60">
          <span className="font-robot bg-gradient-to-br from-cyan-300 via-primary-light to-secondary bg-clip-text text-8xl font-black text-transparent sm:text-9xl">H</span>
          <span className="absolute -right-3 -bottom-3 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-cyan-300 uppercase">Product studio</span>
        </div>
      </div>

      <ul className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2 sm:inset-x-7 sm:bottom-7" aria-label="HongLabAI 제품 개발 역량">
        {[
          ["01", "AI"],
          ["02", "WEB"],
          ["03", "APP"],
        ].map(([number, label]) => (
          <li key={label} className="rounded-xl border border-white/10 bg-slate-950/75 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4">
            <span className="block font-mono text-[10px] text-slate-500">{number}</span>
            <span className="mt-1 block text-xs font-black tracking-widest text-white sm:text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
