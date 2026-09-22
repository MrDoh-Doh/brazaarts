export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-black text-white">Explore</h1>
      <p className="mt-3 text-slate-300">Browse creators, gigs, commissions, and design work.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5">
          <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-violet-500/40 via-cyan-500/25 to-slate-950" />
          <h3 className="text-xl font-bold text-white">Neon Character Design</h3>
          <p className="mt-2 text-slate-300">MuseMaker</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-violet-200">$120</span>
            <span className="text-cyan-300">4.9 ★</span>
          </div>
        </article>
        <article className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5">
          <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-cyan-500/40 via-violet-500/25 to-slate-950" />
          <h3 className="text-xl font-bold text-white">Brand Identity Kits</h3>
          <p className="mt-2 text-slate-300">SignalForge</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-violet-200">$240</span>
            <span className="text-cyan-300">4.8 ★</span>
          </div>
        </article>
        <article className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5">
          <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-violet-500/30 via-slate-900 to-cyan-500/20" />
          <h3 className="text-xl font-bold text-white">Product UI Sprint</h3>
          <p className="mt-2 text-slate-300">NovaFrames</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-violet-200">$320</span>
            <span className="text-cyan-300">5.0 ★</span>
          </div>
        </article>
      </div>
    </div>
  );
}
