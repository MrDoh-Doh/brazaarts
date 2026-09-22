'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { UploadForm } from '@/components/forms/UploadForm';

export default function CreateListingPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-black text-white">Create Listing</h1>
        <p className="mt-3 text-slate-300">Publish a new service or commission as {user?.displayName ?? 'creator'}.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-5 rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6">
            <input className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" placeholder="Listing title" />
            <textarea className="min-h-[140px] w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" placeholder="Describe your listing" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" placeholder="Category" />
              <input className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" placeholder="Price" />
            </div>
            <input className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" placeholder="Tags (comma separated)" />
            <Button type="submit" className="bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950">Publish listing</Button>
          </form>

          <UploadForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
