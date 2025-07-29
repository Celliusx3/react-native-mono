import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ColorScheme = 'light' | 'dark' | 'system';

interface ThemeState {
  // Theme preference: 'light', 'dark', or 'system'
  colorScheme: ColorScheme;
  // Actual resolved theme after considering system preference
  resolvedTheme: 'light' | 'dark';
  // Whether to follow system theme
  isSystemTheme: boolean;
  
  // Actions
  setColorScheme: (scheme: ColorScheme) => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      colorScheme: 'system',
      resolvedTheme: 'light',
      isSystemTheme: true,

      setColorScheme: (scheme: ColorScheme) => {
        const isSystem = scheme === 'system';
        set({
          colorScheme: scheme,
          isSystemTheme: isSystem,
          // If not system theme, update resolved theme immediately
          ...(isSystem ? {} : { resolvedTheme: scheme as 'light' | 'dark' }),
        });
      },

      setResolvedTheme: (theme: 'light' | 'dark') => {
        set({ resolvedTheme: theme });
      },

      toggleTheme: () => {
        const currentScheme = get().colorScheme;
        if (currentScheme === 'system') {
          // If currently on system, switch to opposite of current resolved theme
          const newScheme = get().resolvedTheme === 'light' ? 'dark' : 'light';
          set({
            colorScheme: newScheme,
            resolvedTheme: newScheme,
            isSystemTheme: false,
          });
        } else {
          // If on manual theme, toggle between light and dark
          const newScheme = currentScheme === 'light' ? 'dark' : 'light';
          set({
            colorScheme: newScheme,
            resolvedTheme: newScheme,
            isSystemTheme: false,
          });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user preferences, not resolved theme
      partialize: (state) => ({
        colorScheme: state.colorScheme,
        isSystemTheme: state.isSystemTheme,
      }),
    }
  )
);