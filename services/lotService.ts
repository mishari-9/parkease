// ============================================
// Parking Lots Service
// ============================================

import apiClient from './api';
import { Endpoints } from '../constants/api';
import { ParkingLot, ParkingSlot, Review, SearchFilters, SlotAvailabilityResponse } from '../types';
import { mockParkingLots } from '../mock-data/lots';
import { mockSlotsByLot } from '../mock-data/slots';

export const lotService = {
  /**
   * Fetch lots based on filters
   */
  getLots: async (filters?: SearchFilters): Promise<ParkingLot[]> => {
    try {
      const params: any = {
        lat: 24.7136,
        lng: 46.6753,
        radius: filters?.maxDistance || 5000,
      };

      if (filters?.minPrice) params.minPrice = filters.minPrice;
      if (filters?.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters?.covered) params.covered = filters.covered;
      if (filters?.evCharging) params.evCharging = filters.evCharging;

      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.LOTS_LIST, { params });
      // return response.data;

      // Using mock data for now
      return mockParkingLots;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single lot with full details
   */
  getLotDetail: async (lotId: string): Promise<ParkingLot> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.LOTS_DETAIL(lotId));
      // return response.data;

      // Using mock data for now
      const lot = mockParkingLots.find((l) => l.id === lotId);
      if (!lot) throw new Error('Lot not found');

      const slots = mockSlotsByLot[lotId as keyof typeof mockSlotsByLot] || [];
      return { ...lot, slots };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get parking slots for a lot
   */
  getLotSlots: async (lotId: string): Promise<ParkingSlot[]> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.LOTS_DETAIL(lotId));
      // return response.data.slots;

      // Using mock data for now
      return mockSlotsByLot[lotId as keyof typeof mockSlotsByLot] || [];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check slot availability for a time range
   */
  checkSlotAvailability: async (
    lotId: string,
    startTime: Date,
    endTime: Date
  ): Promise<SlotAvailabilityResponse[]> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.LOTS_SLOTS_AVAILABILITY(lotId), {
      //   params: { startTime, endTime },
      // });
      // return response.data;

      // Mock implementation
      const slots = await lotService.getLotSlots(lotId);
      return slots.map((slot) => ({
        slotId: slot.id,
        isAvailable: slot.status === 'available',
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get lot reviews
   */
  getLotReviews: async (lotId: string, page: number = 1, limit: number = 10): Promise<Review[]> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.LOTS_REVIEWS(lotId), {
      //   params: { page, limit },
      // });
      // return response.data;

      // Mock data - empty reviews for now
      return [];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Submit a review for a lot
   */
  submitReview: async (lotId: string, rating: number, comment: string): Promise<Review> => {
    try {
      const response = await apiClient.post(Endpoints.LOTS_REVIEWS_CREATE(lotId), {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search lots
   */
  searchLots: async (query: string, filters?: SearchFilters): Promise<ParkingLot[]> => {
    try {
      // TODO: Implement search with backend
      const lots = await lotService.getLots(filters);

      // Simple client-side search for now
      const searchTerm = query.toLowerCase();
      return lots.filter(
        (lot) =>
          lot.name.toLowerCase().includes(searchTerm) || lot.address.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      throw error;
    }
  },
};
