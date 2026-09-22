import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/listings', label: 'Listings' },
  { href: '/messages', label: 'Messages' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Signup' },
];

export function Navbar() {
  return (
    <header className="border-b border-violet-500/20 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-white">
          BazaArts
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-violet-300">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
