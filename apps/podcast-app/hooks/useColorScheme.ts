import { useThemeStore } from '@/stores/useThemeStore';

export function useColorScheme() {
  const { colorScheme } = useThemeStore();
  
  // Return the current theme (light or dark)
  return colorScheme;
}
