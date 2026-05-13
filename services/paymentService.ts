// ============================================
// Payment Service
// ============================================

import apiClient from './api';
import { Endpoints } from '../constants/api';

export interface PaymentIntentResponse {
  clientSecret: string;
  bookingId: string;
  amount: number;
}

export const paymentService = {
  /**
   * Create payment intent for booking
   */
  createPaymentIntent: async (bookingId: string): Promise<PaymentIntentResponse> => {
    try {
      const response = await apiClient.post(Endpoints.PAYMENTS_INTENT, {
        bookingId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Confirm payment
   */
  confirmPayment: async (paymentIntentId: string): Promise<{ success: boolean }> => {
    try {
      // This would be handled by Stripe SDK on frontend
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Process refund
   */
  processRefund: async (paymentIntentId: string, amount?: number): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.post(`/payments/${paymentIntentId}/refund`, {
        amount,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get payment status
   */
  getPaymentStatus: async (paymentIntentId: string): Promise<{ status: string }> => {
    try {
      const response = await apiClient.get(`/payments/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
