// ============================================
// QR Code Generation Utilities
// ============================================

import { Booking } from '../types';
import { AppConfig } from '../constants/config';

/**
 * Generate QR payload (JWT-like structure)
 * This would be signed on the backend
 */
export const generateQRPayload = (booking: Booking): string => {
  const payload = {
    bookingId: booking.id,
    slotId: booking.slotId,
    userId: booking.userId,
    lotId: booking.lotId,
    exp: Math.floor(booking.endTime.getTime() / 1000), // expiry time in seconds
  };

  // In a real app, this would be signed with a JWT secret
  return JSON.stringify(payload);
};

/**
 * Create QR code value from booking
 * This is what gets encoded into the QR code
 */
export const createQRCodeValue = (booking: Booking): string => {
  // The backend provides the qrCodeData (signed JWT)
  // We just return it for rendering
  return booking.qrCodeData;
};

/**
 * Validate if QR code is expired
 */
export const isQRCodeExpired = (booking: Booking): boolean => {
  const now = new Date();
  return now >= booking.endTime;
};

/**
 * Get QR code expiry info
 */
export const getQRCodeExpiryInfo = (booking: Booking): { isExpired: boolean; minutesLeft: number } => {
  const now = new Date();
  const expiryTime = booking.endTime;
  const diffMs = expiryTime.getTime() - now.getTime();
  const minutesLeft = Math.floor(diffMs / 60000);

  return {
    isExpired: minutesLeft < 0,
    minutesLeft: Math.max(0, minutesLeft),
  };
};

/**
 * Format QR code display info
 */
export const formatQRCodeInfo = (booking: Booking): string => {
  const info = getQRCodeExpiryInfo(booking);

  if (info.isExpired) {
    return 'QR Code Expired';
  }

  if (info.minutesLeft < 1) {
    return 'Expires now';
  }

  if (info.minutesLeft < 60) {
    return `Expires in ${info.minutesLeft}m`;
  }

  const hours = Math.floor(info.minutesLeft / 60);
  const mins = info.minutesLeft % 60;

  return `Expires in ${hours}h ${mins}m`;
};
