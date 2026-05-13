// ============================================
// Modern Theme System - Dark & Light Modes
// ============================================

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    // Primary
    primary: string;
    primaryLight: string;
    primaryDark: string;
    // Backgrounds
    bg: string;
    bgCard: string;
    bgElevated: string;
    bgGlass: string;
    // Text
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;
    // Borders
    border: string;
    borderLight: string;
    // Status colors
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    info: string;
    infoLight: string;
    // Special
    gradient1: string;
    gradient2: string;
    shadow: string;
    overlay: string;
    shimmer: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  typography: {
    fontFamily: string;
    h1: { fontSize: number; fontWeight: string; lineHeight: number };
    h2: { fontSize: number; fontWeight: string; lineHeight: number };
    h3: { fontSize: number; fontWeight: string; lineHeight: number };
    h4: { fontSize: number; fontWeight: string; lineHeight: number };
    body: { fontSize: number; fontWeight: string; lineHeight: number };
    bodySmall: { fontSize: number; fontWeight: string; lineHeight: number };
    caption: { fontSize: number; fontWeight: string; lineHeight: number };
  };
}

export const LightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#2563EB',
    primaryLight: '#DBEAFE',
    primaryDark: '#1D4ED8',
    bg: '#F8FAFC',
    bgCard: '#FFFFFF',
    bgElevated: '#FFFFFF',
    bgGlass: 'rgba(255,255,255,0.85)',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#94A3B8',
    textInverse: '#FFFFFF',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    gradient1: '#2563EB',
    gradient2: '#7C3AED',
    shadow: 'rgba(0,0,0,0.1)',
    overlay: 'rgba(0,0,0,0.5)',
    shimmer: '#F1F5F9',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, xl: 24, full: 9999 },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    h4: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
    caption: { fontSize: 11, fontWeight: '500', lineHeight: 16 },
  },
};

export const DarkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#3B82F6',
    primaryLight: '#1E3A5F',
    primaryDark: '#60A5FA',
    bg: '#0F172A',
    bgCard: '#1E293B',
    bgElevated: '#334155',
    bgGlass: 'rgba(15,23,42,0.9)',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textInverse: '#0F172A',
    border: '#334155',
    borderLight: '#1E293B',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    error: '#F87171',
    errorLight: '#7F1D1D',
    info: '#60A5FA',
    infoLight: '#1E3A5F',
    gradient1: '#3B82F6',
    gradient2: '#8B5CF6',
    shadow: 'rgba(0,0,0,0.5)',
    overlay: 'rgba(0,0,0,0.8)',
    shimmer: '#1E293B',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, xl: 24, full: 9999 },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    h4: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
    caption: { fontSize: 11, fontWeight: '500', lineHeight: 16 },
  },
};
