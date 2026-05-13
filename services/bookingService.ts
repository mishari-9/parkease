// ============================================
// Bookings Service
// ============================================

import apiClient from './api';
import { Endpoints } from '../constants/api';
import { Booking, BookingStatus, Review } from '../types';

export const bookingService = {
  /**
   * Create a new booking
   */
  createBooking: async (
    lotId: string,
    slotId: string,
    vehicleId: string,
    startTime: Date,
    endTime: Date,
    paymentMethodId: string
  ): Promise<Booking> => {
    try {
      const response = await apiClient.post(Endpoints.BOOKINGS_CREATE, {
        lotId,
        slotId,
        vehicleId,
        startTime,
        endTime,
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's bookings
   */
  getBookings: async (status?: BookingStatus): Promise<Booking[]> => {
    try {
      const params: any = {};
      if (status) {
        params.status = status;
      }

      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.BOOKINGS_LIST, { params });
      // return response.data;

      // Mock data for now
      return [];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single booking
   */
  getBookingDetail: async (bookingId: string): Promise<Booking> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.get(Endpoints.BOOKINGS_DETAIL(bookingId));
      // return response.data;

      throw new Error('Booking not found');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel a booking
   */
  cancelBooking: async (bookingId: string): Promise<void> => {
    try {
      await apiClient.put(Endpoints.BOOKINGS_CANCEL(bookingId));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get QR code for booking
   */
  getQRCode: async (bookingId: string): Promise<string> => {
    try {
      const response = await apiClient.get(Endpoints.BOOKINGS_QR(bookingId));
      return response.data.qrCode;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Submit review for a booking
   */
  submitReview: async (bookingId: string, lotId: string, rating: number, comment: string): Promise<Review> => {
    try {
      // This would typically be part of lot reviews
      const response = await apiClient.post(`${Endpoints.LOTS_REVIEWS(lotId)}`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Extend booking
   */
  extendBooking: async (bookingId: string, newEndTime: Date): Promise<Booking> => {
    try {
      const response = await apiClient.put(`${Endpoints.BOOKINGS_DETAIL(bookingId)}/extend`, {
        newEndTime,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
