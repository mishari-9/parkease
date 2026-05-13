// ============================================
// Booking Store (Zustand)
// ============================================

import { create } from 'zustand';
import { BookingState, Booking } from '../types';

interface BookingStore extends BookingState {
  setSlot: (slotId: string) => void;
  setTimeRange: (start: Date, end: Date) => void;
  setVehicle: (vehicleId: string) => void;
  setPaymentMethod: (paymentMethodId: string) => void;
  setStep: (step: number) => void;
  submitBooking: () => Promise<Booking>;
  setConfirmedBooking: (booking: Booking | null) => void;
  reset: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setSubmitting: (submitting: boolean) => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  lotId: null,
  slotId: null,
  startTime: null,
  endTime: null,
  vehicleId: null,
  paymentMethodId: null,
  step: 1,
  confirmedBooking: null,
  isSubmitting: false,

  // Actions
  setSlot: (slotId) =>
    set({
      slotId,
    }),

  setTimeRange: (start, end) =>
    set({
      startTime: start,
      endTime: end,
    }),

  setVehicle: (vehicleId) =>
    set({
      vehicleId,
    }),

  setPaymentMethod: (paymentMethodId) =>
    set({
      paymentMethodId,
    }),

  setStep: (step) =>
    set({
      step: Math.max(1, Math.min(4, step)),
    }),

  submitBooking: async () => {
    set({ isSubmitting: true });
    try {
      // TODO: Replace with actual API call
      // For now, just create a mock booking
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const booking: Booking = {
        id: `booking-${Date.now()}`,
        userId: 'user-001',
        lotId: get().lotId || '',
        slotId: get().slotId || '',
        vehicleId: get().vehicleId || '',
        startTime: get().startTime || new Date(),
        endTime: get().endTime || new Date(),
        status: 'confirmed',
        payment: {
          id: `payment-${Date.now()}`,
          baseAmount: 75,
          serviceFee: 3.75,
          totalAmount: 78.75,
          method: 'card',
          status: 'paid',
          paidAt: new Date(),
        },
        qrCodeData: 'mock-qr-code-jwt-data',
        lot: {} as any,
        slot: {} as any,
        createdAt: new Date(),
      };

      set({ confirmedBooking: booking, isSubmitting: false });
      return booking;
    } catch (error) {
      set({ isSubmitting: false });
      throw error;
    }
  },

  setConfirmedBooking: (booking) =>
    set({
      confirmedBooking: booking,
    }),

  reset: () =>
    set({
      lotId: null,
      slotId: null,
      startTime: null,
      endTime: null,
      vehicleId: null,
      paymentMethodId: null,
      step: 1,
      confirmedBooking: null,
      isSubmitting: false,
    }),

  goToNextStep: () => {
    const currentStep = get().step;
    set({ step: Math.min(4, currentStep + 1) });
  },

  goToPreviousStep: () => {
    const currentStep = get().step;
    set({ step: Math.max(1, currentStep - 1) });
  },

  setSubmitting: (submitting) =>
    set({
      isSubmitting: submitting,
    }),
}));
