export function ListingCard({
  title,
  creator,
  price,
  tags,
}: {
  title: string;
  creator: string;
  price: number;
  tags: string[];
}) {
  return (
    <article className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5 shadow-[0_0_25px_rgba(168,85,247,0.1)]">
      <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-slate-950" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{creator}</p>
        <span className="rounded-full bg-violet-500/15 px-2 py-1 text-xs font-semibold text-violet-200">${price}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-violet-400/35 bg-slate-800 px-2 py-1 text-xs text-slate-200">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
