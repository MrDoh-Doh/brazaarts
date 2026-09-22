import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-20">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">BazaArts</p>
      <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white md:text-7xl">
        Find the signal in the creative noise.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-300">
        Discover artists, collaborators, and one-of-a-kind creative services in a neon cyber-bazaar.
      </p>
      <div className="mt-10 flex gap-4">
        <Link className="rounded-full bg-teal-300 px-6 py-3 font-bold text-slate-950" href="/explore">
          Explore creators
        </Link>
        <Link className="rounded-full border border-violet-400/60 px-6 py-3 font-bold text-white" href="/about">
          About BazaArts
        </Link>
      </div>
    </section>
  );
}
