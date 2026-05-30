import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { clearSessionCookie } from '@/lib/api';
import { AuthUser, getMe, logout as apiLogout } from '@/lib/resources';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  signIn: () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Restore session on mount
  useEffect(() => {
    getMe()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  async function signOut() {
    try {
      await apiLogout();
    } catch {
      // ignore API errors on logout
    }
    await clearSessionCookie();
    setUser(null);
  }

  function signIn(user: AuthUser) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
