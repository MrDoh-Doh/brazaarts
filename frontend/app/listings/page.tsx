import { Filters } from '@/components/listings/Filters';
import { ListingCard } from '@/components/listings/ListingCard';

const listings = [
  { title: 'Neon Cyber-Bazaar Artwork', creator: 'MuseMaker', price: 120, tags: ['Neon', 'Cyber', 'Art'] },
  { title: 'Brand Identity Kit', creator: 'SignalForge', price: 240, tags: ['Branding', 'UI', 'Logo'] },
  { title: 'Web App UI Sprint', creator: 'NovaFrames', price: 320, tags: ['UX', 'Startup', 'Design'] },
];

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-black text-white">Listings</h1>
      <p className="mt-3 text-slate-300">Filter by tag, price, availability, and rating.</p>
      <div className="mt-8">
        <Filters />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.title} {...listing} />
        ))}
      </div>
    </div>
  );
}
