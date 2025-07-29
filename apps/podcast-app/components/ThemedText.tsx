import { Text, SizableText } from 'tamagui';
import { type TextProps as RNTextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'body' | 'heading' | 'caption' | 'display' | 'subtitle' | 'link' | 'button';
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  variant = 'body',
  size,
  weight,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Determine font family based on variant
  const getFontFamily = () => {
    switch (variant) {
      case 'heading':
      case 'display':
        return '$heading';
      case 'caption':
        return '$caption';
      case 'body':
      default:
        return '$body';
    }
  };

  // Determine default size based on variant
  const getDefaultSize = () => {
    switch (variant) {
      case 'display':
        return 10; // Hero/display text
      case 'heading':
        return 8;  // Page headings
      case 'subtitle':
        return 6;  // Section headings
      case 'button':
        return 5;  // Button text
      case 'body':
        return 4;  // Default body text
      case 'caption':
        return 2;  // Small text
      case 'link':
        return 4;  // Same as body
      default:
        return 4;
    }
  };

  // Determine default weight based on variant
  const getDefaultWeight = () => {
    switch (variant) {
      case 'display':
      case 'heading':
        return 'semibold';
      case 'subtitle':
        return 'medium';
      case 'button':
        return 'medium';
      case 'link':
        return 'normal';
      case 'body':
      case 'caption':
      default:
        return 'normal';
    }
  };

  const finalSize = size || getDefaultSize();
  const finalWeight = weight || getDefaultWeight();
  const fontFamily = getFontFamily();

  return (
    <SizableText
      fontFamily={fontFamily}
      fontSize={`$${finalSize}`}
      fontWeight={finalWeight}
      color={lightColor || darkColor ? color : '$color'}
      style={[
        variant === 'link' && { textDecorationLine: 'underline' },
        style,
      ]}
      {...rest}
    />
  );
}

// Legacy type mapping for backward compatibility
export const legacyTypeToVariant = {
  default: 'body' as const,
  title: 'heading' as const,
  defaultSemiBold: 'body' as const,
  subtitle: 'subtitle' as const,
  link: 'link' as const,
};

// Helper function to create typography components with semantic names
export const Typography = {
  // Display text for hero sections
  Display: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="display" {...props} />
  ),
  
  // Headings for page titles and sections
  Heading: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="heading" {...props} />
  ),
  
  // Subtitles for section headers
  Subtitle: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="subtitle" {...props} />
  ),
  
  // Body text for main content
  Body: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="body" {...props} />
  ),
  
  // Caption text for labels and helper text
  Caption: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="caption" {...props} />
  ),
  
  // Link text with underline
  Link: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="link" {...props} />
  ),
  
  // Button text
  Button: (props: Omit<ThemedTextProps, 'variant'>) => (
    <ThemedText variant="button" {...props} />
  ),
};
