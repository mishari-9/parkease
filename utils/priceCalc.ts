// ============================================
// Price Calculation Utilities
// ============================================

import { ParkingLot, PriceBreakdown } from '../types';

/**
 * Calculate booking price based on duration and lot pricing
 * Handles partial hours (ceil to nearest 30min)
 */
export const calculateBookingPrice = (
  lot: ParkingLot,
  startTime: Date,
  endTime: Date
): PriceBreakdown => {
  const durationMs = endTime.getTime() - startTime.getTime();
  let hours = durationMs / (1000 * 60 * 60);

  // Round up to nearest 0.5 hour (30 minutes)
  hours = Math.ceil(hours * 2) / 2;

  const baseAmount = hours * lot.pricePerHour;
  const serviceFee = baseAmount * 0.05; // 5% service fee
  const totalAmount = baseAmount + serviceFee;

  return {
    hours,
    baseAmount: Math.round(baseAmount * 100) / 100,
    serviceFee: Math.round(serviceFee * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

/**
 * Calculate hourly rate
 */
export const calculateHourlyRate = (lot: ParkingLot, hours: number): number => {
  return lot.pricePerHour * hours;
};

/**
 * Calculate service fee (5% of base amount)
 */
export const calculateServiceFee = (baseAmount: number): number => {
  return Math.round(baseAmount * 0.05 * 100) / 100;
};

/**
 * Calculate total including service fee
 */
export const calculateTotal = (baseAmount: number, serviceFee?: number): number => {
  const fee = serviceFee ?? calculateServiceFee(baseAmount);
  return Math.round((baseAmount + fee) * 100) / 100;
};

/**
 * Get duration in hours from two dates
 */
export const getDurationHours = (startTime: Date, endTime: Date): number => {
  const durationMs = endTime.getTime() - startTime.getTime();
  return durationMs / (1000 * 60 * 60);
};

/**
 * Round duration to nearest half hour
 */
export const roundDurationToHalfHour = (hours: number): number => {
  return Math.ceil(hours * 2) / 2;
};
