import type { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-slate-300">Loading session…</div>;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}
