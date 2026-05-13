// ============================================
// Auth Store (Zustand)
// ============================================

import { create } from 'zustand';
import { User, AuthState } from '../types';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setTokens: (accessToken, refreshToken) =>
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  setError: (error) =>
    set({
      error,
    }),
}));
