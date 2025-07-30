import { useMemo } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Custom hook that automatically resolves the current theme colors
 * Provides both colors and a helper function to get themed colors with overrides
 * 
 * @returns An object containing:
 *   - colors: The color palette for the current theme (light/dark)
 *   - getColor: Helper function to get colors with optional light/dark overrides
 */
export function useThemeColors() {
  const colorScheme = useColorScheme();
  
  return useMemo(() => {
    const colors = Colors[colorScheme ?? 'light'];
    const theme = colorScheme ?? 'light';
    
    /**
     * Helper function to get a themed color with optional light/dark overrides
     * 
     * @param colorName - The color key to retrieve from the theme
     * @param overrides - Optional light/dark color overrides
     * @returns The resolved color value
     */
    const getColor = (
      colorName: keyof typeof colors,
      overrides?: { light?: string; dark?: string }
    ): string => {
      if (overrides) {
        const colorFromOverrides = overrides[theme];
        if (colorFromOverrides) {
          return colorFromOverrides;
        }
      }
      return colors[colorName];
    };
    
    return {
      ...colors,
      getColor,
    };
  }, [colorScheme]);
}

/**
 * Utility type to get the shape of theme colors with getColor helper
 * Useful for TypeScript inference and type safety
 */
export type ThemeColors = ReturnType<typeof useThemeColors>;

/**
 * @deprecated Use useThemeColors().getColor() instead
 * 
 * Helper function to get a themed color with optional light/dark overrides
 * This function is kept for backward compatibility but should be avoided in new code
 * 
 * @param colors - The theme colors object from useThemeColors()
 * @param colorScheme - The current color scheme ('light' or 'dark')
 * @param props - Optional light/dark color overrides
 * @param colorName - The color key to retrieve
 * @returns The resolved color value
 */
export function getThemedColor(
  colors: any,
  colorScheme: 'light' | 'dark' | null,
  props: { light?: string; dark?: string },
  colorName: string
): string {
  const theme = colorScheme ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
  }
}