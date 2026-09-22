export function ProfileCard({ name, specialty, rating }: { name: string; specialty: string; rating: number }) {
  return (
    <article className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5">
      <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="mt-2 text-slate-300">{specialty}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-cyan-300">★ {rating.toFixed(1)}</span>
        <button className="rounded-full border border-violet-400/40 px-3 py-1.5 text-xs text-white">View profile</button>
      </div>
    </article>
  );
}
