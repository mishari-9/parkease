// ============================================
// Color Tokens & Design System
// ============================================

export const Colors = {
  // Primary
  BLUE_PRIMARY: '#1A6FBF',
  BLUE_LIGHT: '#E8F4FD',

  // Slot Status
  SLOT_FREE: '#2ECC71', // Green
  SLOT_FULL: '#E74C3C', // Red
  SLOT_LOW: '#F39C12', // Orange/Yellow
  SLOT_MAINT: '#BDC3C7', // Gray

  // Booking Status
  STATUS_ACTIVE: '#27AE60',
  STATUS_CONFIRMED: '#3498DB',
  STATUS_COMPLETED: '#95A5A6',
  STATUS_CANCELLED: '#E74C3C',

  // UI Neutrals
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',

  // Semantic
  ERROR: '#DC2626',
  SUCCESS: '#16A34A',
  WARNING: '#EA580C',
  INFO: '#0284C7',

  // Shadows
  SHADOW_SM: 'rgba(0, 0, 0, 0.1)',
  SHADOW_MD: 'rgba(0, 0, 0, 0.15)',
  SHADOW_LG: 'rgba(0, 0, 0, 0.2)',
};

// ============================================
// Typography Scale
// ============================================

export const Typography = {
  // Font family (system default)
  FONT_FAMILY: 'System',

  // Heading 1 (24px / 700)
  H1: { fontSize: 24, fontWeight: '700' as const },

  // Heading 2 (18px / 600)
  H2: { fontSize: 18, fontWeight: '600' as const },

  // Heading 3 (16px / 600)
  H3: { fontSize: 16, fontWeight: '600' as const },

  // Body (14px / 400)
  Body: { fontSize: 14, fontWeight: '400' as const },

  // Small (12px / 400)
  Small: { fontSize: 12, fontWeight: '400' as const },
};

// ============================================
// Spacing Scale (8pt grid)
// ============================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ============================================
// Border Radius
// ============================================

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

// ============================================
// Layout Constants
// ============================================

export const Layout = {
  BOTTOM_NAV_HEIGHT: 60,
  SAFE_AREA_BOTTOM: 30,
};
