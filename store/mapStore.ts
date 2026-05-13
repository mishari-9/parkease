// ============================================
// Map Store (Zustand)
// ============================================

import { create } from 'zustand';
import { ParkingLot, SearchFilters, Coordinates, MapRegion, MapState } from '../types';

interface MapStore extends MapState {
  fetchLots: (region: MapRegion, filters: SearchFilters) => Promise<void>;
  selectLot: (lot: ParkingLot | null) => void;
  updateRegion: (region: MapRegion) => void;
  applyFilters: (filters: SearchFilters) => void;
  setUserLocation: (location: Coordinates | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  // Initial state
  lots: [],
  selectedLot: null,
  userLocation: null,
  region: {
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  filters: {
    maxDistance: 5000,
  },
  isLoading: false,
  error: null,

  // Actions
  fetchLots: async (region, filters) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // For now, just simulate loading
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  selectLot: (lot) =>
    set({
      selectedLot: lot,
    }),

  updateRegion: (region) =>
    set({
      region,
    }),

  applyFilters: (filters) =>
    set({
      filters,
    }),

  setUserLocation: (location) =>
    set({
      userLocation: location,
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
