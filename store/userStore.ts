// ============================================
// User Store (Zustand)
// ============================================

import { create } from 'zustand';
import { User, UserState } from '../types';

interface UserStoreInterface extends UserState {
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  toggleSavedLot: (lotId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStoreInterface>((set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) =>
    set({
      user,
    }),

  updateUser: (userData) => {
    const current = get().user;
    if (current) {
      set({
        user: {
          ...current,
          ...userData,
        },
      });
    }
  },

  toggleSavedLot: (lotId) => {
    const current = get().user;
    if (current) {
      const isSaved = current.savedLotIds.includes(lotId);
      const newSavedLots = isSaved
        ? current.savedLotIds.filter((id) => id !== lotId)
        : [...current.savedLotIds, lotId];

      set({
        user: {
          ...current,
          savedLotIds: newSavedLots,
        },
      });
    }
  },

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  setError: (error) =>
    set({
      error,
    }),
}));
