import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ColorScheme = 'light' | 'dark';

interface ThemeState {
  // Theme preference: 'light' or 'dark'
  colorScheme: ColorScheme;
  
  // Actions
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      colorScheme: 'light',

      setColorScheme: (scheme: ColorScheme) => {
        set({ colorScheme: scheme });
      },

      toggleTheme: () => {
        const currentScheme = get().colorScheme;
        const newScheme = currentScheme === 'light' ? 'dark' : 'light';
        set({ colorScheme: newScheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        colorScheme: state.colorScheme,
      }),
    }
  )
);