export function Filters() {
  return (
    <div className="grid gap-4 rounded-2xl border border-violet-500/20 bg-slate-900/70 p-5 md:grid-cols-4">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Category</label>
        <select className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-3 py-2 text-slate-100">
          <option>All</option>
          <option>Art</option>
          <option>Branding</option>
          <option>Development</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Tag</label>
        <select className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-3 py-2 text-slate-100">
          <option>Any</option>
          <option>Neon</option>
          <option>Cyber</option>
          <option>UI</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Price</label>
        <input placeholder="Max $500" className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-3 py-2 text-slate-100" />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Rating</label>
        <select className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-3 py-2 text-slate-100">
          <option>Any</option>
          <option>4.5+</option>
          <option>4.8+</option>
          <option>5.0</option>
        </select>
      </div>
    </div>
  );
}
