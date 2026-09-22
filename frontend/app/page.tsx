import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-20 text-center">
        <div className="mb-6 inline-flex rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-violet-200">
          BazaArts
        </div>
        <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">
          Discover the future of creator commerce.
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-slate-300">
          A neon cyber-bazaar for artists, designers, developers, and digital service providers.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_35px_rgba(168,85,247,0.45)] transition hover:scale-[1.02]">
            Explore listings
          </Link>
          <Link href="/create-listing" className="rounded-full border border-violet-400/50 bg-violet-500/5 px-6 py-3 font-semibold text-white transition hover:bg-violet-500/10">
            Create a listing
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        {[
          ['Curated creators', 'Browse verified professionals across art, design, development, and branding.'],
          ['Fast hiring', 'Message creators directly and start commission conversations in seconds.'],
          ['Built for discovery', 'Search by category, style, availability, tags, and pricing.'],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-violet-400/20 bg-slate-900/60 p-6 shadow-[0_0_25px_rgba(168,85,247,0.1)]">
            <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-300">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
