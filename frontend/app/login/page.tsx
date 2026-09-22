'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-black text-white">Login</h1>
        <p className="mt-2 text-slate-300">Access your creator dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" required />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white" required />
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
