// ============================================
// API Configuration
// ============================================

const DEV_URL = 'http://localhost:3001/api/v1';
const PROD_URL = 'https://api.parkease.sa/v1';

export const API_BASE_URL = __DEV__ ? DEV_URL : PROD_URL;

// ============================================
// Endpoints
// ============================================

export const Endpoints = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_LOGOUT: '/auth/logout',

  // Parking Lots
  LOTS_LIST: '/lots',
  LOTS_DETAIL: (id: string) => `/lots/${id}`,
  LOTS_SLOTS_AVAILABILITY: (id: string) => `/lots/${id}/slots/availability`,
  LOTS_REVIEWS: (id: string) => `/lots/${id}/reviews`,
  LOTS_REVIEWS_CREATE: (id: string) => `/lots/${id}/reviews`,

  // Bookings
  BOOKINGS_CREATE: '/bookings',
  BOOKINGS_LIST: '/bookings',
  BOOKINGS_DETAIL: (id: string) => `/bookings/${id}`,
  BOOKINGS_CANCEL: (id: string) => `/bookings/${id}/cancel`,
  BOOKINGS_QR: (id: string) => `/bookings/${id}/qr`,

  // User / Profile
  USERS_ME: '/users/me',
  USERS_UPDATE: '/users/me',
  USERS_VEHICLES_CREATE: '/users/me/vehicles',
  USERS_VEHICLES_DELETE: (id: string) => `/users/me/vehicles/${id}`,
  USERS_SAVED_LOTS_TOGGLE: (lotId: string) => `/users/me/saved-lots/${lotId}`,

  // Payments
  PAYMENTS_INTENT: '/payments/intent',
  PAYMENTS_WEBHOOK: '/payments/webhook',
};

// ============================================
// HTTP Config
// ============================================

export const HTTP_CONFIG = {
  TIMEOUT: 15000, // 15 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Declare __DEV__ for TypeScript
declare const __DEV__: boolean;
