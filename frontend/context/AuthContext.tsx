'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, type ApiUser } from '@/lib/api';

type AuthContextValue = {
  user: ApiUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('bazaarts_access_token');
    const savedUser = localStorage.getItem('bazaarts_user');
    if (savedToken && savedUser) {
      setAccessToken(savedToken);
      setUser(JSON.parse(savedUser) as ApiUser);
    }
    setIsLoading(false);
  }, []);

  const persistSession = (nextToken: string, nextUser: ApiUser) => {
    setAccessToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('bazaarts_access_token', nextToken);
    localStorage.setItem('bazaarts_user', JSON.stringify(nextUser));
  };

  const login = async (email: string, password: string) => {
    const response = await api.post<{ accessToken: string; user: ApiUser }>('/auth/login', { email, password });
    persistSession(response.accessToken, response.user);
  };

  const signup = async (email: string, password: string, displayName: string) => {
    const response = await api.post<{ accessToken: string; user: ApiUser }>('/auth/signup', { email, password, displayName });
    persistSession(response.accessToken, response.user);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('bazaarts_access_token');
      localStorage.removeItem('bazaarts_user');
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, accessToken, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
