import { useColorScheme as useNativeColorScheme } from 'react-native';
import { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

export function useColorScheme() {
  const nativeColorScheme = useNativeColorScheme();
  const { colorScheme, resolvedTheme, isSystemTheme, setResolvedTheme } = useThemeStore();

  // Update resolved theme when system theme changes and user prefers system
  useEffect(() => {
    if (isSystemTheme && nativeColorScheme) {
      setResolvedTheme(nativeColorScheme);
    }
  }, [nativeColorScheme, isSystemTheme, setResolvedTheme]);

  // Initialize with system theme if it's the first time and we're on system
  useEffect(() => {
    if (isSystemTheme && nativeColorScheme && !resolvedTheme) {
      setResolvedTheme(nativeColorScheme);
    }
  }, [isSystemTheme, nativeColorScheme, resolvedTheme, setResolvedTheme]);

  // Return the resolved theme (what should actually be displayed)
  return resolvedTheme || nativeColorScheme || 'light';
}
