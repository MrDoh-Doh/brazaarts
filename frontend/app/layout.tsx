import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'BazaArts — Neon creator marketplace',
  description: 'A neon cyber-bazaar for art, services, gigs, and commissions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
