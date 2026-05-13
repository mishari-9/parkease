import { create } from 'zustand';
import { ThemeMode, LightTheme, DarkTheme, Theme } from '../constants/theme';

interface ThemeStore {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  theme: LightTheme,
  toggleTheme: () =>
    set((s) => {
      const m: ThemeMode = s.mode === 'light' ? 'dark' : 'light';
      return { mode: m, theme: m === 'light' ? LightTheme : DarkTheme };
    }),
  setTheme: (mode) => set({ mode, theme: mode === 'light' ? LightTheme : DarkTheme }),
}));
