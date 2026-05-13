// ============================================
// Date & Time Formatting Utilities
// ============================================

import { OpeningHours } from '../types';

export const formatDateTime = (date: Date, locale: string = 'en'): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(date);
};

export const formatDateShort = (date: Date, locale: string = 'en'): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(date);
};

export const formatTimeOnly = (date: Date, locale: string = 'en'): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(date);
};

export const formatFullDate = (date: Date, locale: string = 'en'): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(date);
};

export const isLotOpenAt = (hours: OpeningHours, date: Date): boolean => {
  if (hours.is24Hours) {
    return true;
  }

  // Check if closed on this day
  const day = date.getDay();
  if (hours.closedDays.includes(day)) {
    return false;
  }

  // Check time range
  if (!hours.openTime || !hours.closeTime) {
    return true;
  }

  const timeStr = formatTimeOnly(date, 'en');
  return timeStr >= hours.openTime && timeStr <= hours.closeTime;
};

export const getTimeUntilStarting = (startTime: Date): string => {
  const now = new Date();
  const diffMs = startTime.getTime() - now.getTime();

  if (diffMs < 0) {
    return 'Started';
  }

  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) {
    return 'Starting now';
  }

  if (diffMins < 60) {
    return `${diffMins}m left`;
  }

  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  return `${hours}h ${mins}m left`;
};

export const getDateRange = (startDate: Date, endDate: Date, locale: string = 'en'): string => {
  const startStr = formatDateTime(startDate, locale);
  const endStr = formatDateTime(endDate, locale);

  // If same day, show "Mon, 12 May · 09:00 AM - 02:00 PM"
  if (
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    const timeStart = formatTimeOnly(startDate, locale);
    const timeEnd = formatTimeOnly(endDate, locale);
    const dateStr = formatDateShort(startDate, locale);
    return `${dateStr} · ${timeStart} - ${timeEnd}`;
  }

  return `${startStr} - ${endStr}`;
};
