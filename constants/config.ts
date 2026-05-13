// ============================================
// App Configuration
// ============================================

export const AppConfig = {
  // Location Services
  LOCATION_WATCH_INTERVAL: 5000, // 5 seconds
  DEFAULT_MAP_RADIUS: 5000, // 5km in meters

  // Debounce
  MAP_DEBOUNCE_MS: 500,
  SEARCH_DEBOUNCE_MS: 300,

  // Cache
  LOT_CACHE_DURATION_MS: 60000, // 60 seconds
  BOOKINGS_CACHE_DURATION_MS: 30000, // 30 seconds

  // Booking
  MIN_CANCEL_HOURS: 1, // Can cancel 1h before startTime
  QR_EXPIRY_MINUTES: 5,
  REMINDER_MINUTES_BEFORE: 15,

  // Pagination
  REVIEWS_PAGE_SIZE: 10,
  BOOKINGS_PAGE_SIZE: 20,

  // Map
  DEFAULT_MAP_CENTER: { lat: 24.7136, lng: 46.6753 }, // Riyadh, SA
  INITIAL_MAP_ZOOM: 15,

  // UI
  BOTTOM_SHEET_SNAP_POINTS: ['25%', '50%'],
  BOTTOM_SHEET_ANIMATION_DURATION: 300,

  // Validation
  MIN_PASSWORD_LENGTH: 8,
  PHONE_PATTERN: /^\+966[0-9]{9}$/,
  PLATE_PATTERN: /^[A-Z]{1,3}\s?\d{4}$/,
};

// ============================================
// Feature Flags
// ============================================

export const FeatureFlags = {
  ENABLE_BIOMETRIC_AUTH: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_APPLE_PAY: true,
  ENABLE_STC_PAY: true,
  ENABLE_ARABIC_SUPPORT: true,
  ENABLE_DEVELOPER_MENU: __DEV__,
};

declare const __DEV__: boolean;
