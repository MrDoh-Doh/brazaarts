'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-black text-white">Dashboard</h1>
        <p className="mt-3 text-slate-300">Welcome back, {user?.displayName ?? 'creator'}.</p>
      </div>
    </ProtectedRoute>
  );
}
