import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider, createTamagui, createFont, Theme } from '@tamagui/core';
import { PortalProvider } from '@tamagui/portal';
import { config as defaultConfig } from '@tamagui/config';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AppBar from '@/components/AppBar';
import { QueryClientProvider, queryClient } from '@/hooks/useQuery';

// Design system font configuration for Noto Sans
const notoSansFont = createFont({
  family: 'Noto Sans',
  // Font size scale following design system conventions
  // Based on major third scale (1.25x) with mobile-friendly base size
  size: {
    1: 11,    // xs - captions, small text
    2: 12,    // sm - helper text, footnotes
    3: 13,    // base - small body text
    4: 14,    // md - default body text
    5: 16,    // lg - large body text, buttons
    6: 18,    // xl - small headings, subtitles
    7: 20,    // 2xl - section headings
    8: 24,    // 3xl - page headings
    9: 28,    // 4xl - large headings
    10: 32,   // 5xl - hero text
    11: 36,   // 6xl - display text
    12: 42,   // 7xl - large display
    13: 48,   // 8xl - extra large display
    14: 56,   // 9xl - hero display
    15: 64,   // 10xl - massive display
    16: 72,   // 11xl - billboard text
    true: 14, // default fallback
  },
  // Line height ratios following typography best practices
  // Tighter line heights for headings, looser for body text
  lineHeight: {
    1: 16,    // 1.45x for small text (better readability)
    2: 18,    // 1.5x
    3: 20,    // 1.54x
    4: 22,    // 1.57x (optimal for body text)
    5: 24,    // 1.5x
    6: 26,    // 1.44x (transitioning to heading ratios)
    7: 28,    // 1.4x
    8: 32,    // 1.33x (good for headings)
    9: 36,    // 1.29x
    10: 40,   // 1.25x (tight for large headings)
    11: 44,   // 1.22x
    12: 50,   // 1.19x
    13: 56,   // 1.17x
    14: 64,   // 1.14x
    15: 72,   // 1.125x (very tight for display)
    16: 80,   // 1.11x
    true: 22, // default fallback
  },
  // Font weight mapping to loaded fonts
  weight: {
    100: 'NotoSans-Thin',
    200: 'NotoSans-ExtraLight',
    300: 'NotoSans-Light',
    400: 'NotoSans-Regular',
    500: 'NotoSans-Medium',
    600: 'NotoSans-SemiBold',
    700: 'NotoSans-Bold',
    800: 'NotoSans-ExtraBold',
    900: 'NotoSans-Black',
    true: 'NotoSans-Regular', // default fallback
  },
  // Letter spacing for optimal readability
  // Tighter spacing for larger text, looser for smaller text
  letterSpacing: {
    1: 0.25,   // +0.25px for very small text
    2: 0.15,   // +0.15px for small text
    3: 0.1,    // +0.1px
    4: 0,      // normal for body text
    5: 0,      // normal
    6: -0.1,   // slightly tighter for headings
    7: -0.2,   // -0.2px
    8: -0.3,   // -0.3px
    9: -0.4,   // -0.4px
    10: -0.5,  // -0.5px for large headings
    11: -0.6,  // -0.6px
    12: -0.8,  // -0.8px
    13: -1.0,  // -1px
    14: -1.2,  // -1.2px
    15: -1.4,  // -1.4px for display text
    16: -1.6,  // -1.6px for massive text
    true: 0,   // default fallback
  },
});

// Create semantic font variants for different use cases
const bodyFont = createFont({
  ...notoSansFont,
  // Optimized for body text readability
  weight: {
    ...notoSansFont.weight,
    normal: 'NotoSans-Regular',
    medium: 'NotoSans-Medium',
    semibold: 'NotoSans-SemiBold',
    true: 'NotoSans-Regular',
  },
});

const headingFont = createFont({
  ...notoSansFont,
  // Optimized for headings with tighter spacing
  letterSpacing: {
    1: 0,      // normal for small headings
    2: 0,      // normal
    3: -0.1,   // slightly tighter
    4: -0.2,   // -0.2px
    5: -0.3,   // -0.3px
    6: -0.4,   // -0.4px for headings
    7: -0.5,   // -0.5px
    8: -0.6,   // -0.6px
    9: -0.8,   // -0.8px
    10: -1.0,  // -1px for large headings
    11: -1.2,  // -1.2px
    12: -1.4,  // -1.4px
    13: -1.6,  // -1.6px
    14: -1.8,  // -1.8px
    15: -2.0,  // -2px for display text
    16: -2.2,  // -2.2px for massive text
    true: -0.2, // default tighter spacing
  },
  weight: {
    ...notoSansFont.weight,
    normal: 'NotoSans-Medium',      // Medium for better heading presence
    medium: 'NotoSans-SemiBold',    // SemiBold for emphasis
    semibold: 'NotoSans-Bold',      // Bold for strong headings
    bold: 'NotoSans-ExtraBold',     // ExtraBold for hero headings
    true: 'NotoSans-Medium',
  },
});

const captionFont = createFont({
  ...notoSansFont,
  // Optimized for captions and small text
  letterSpacing: {
    1: 0.4,    // +0.4px for very small text readability
    2: 0.3,    // +0.3px
    3: 0.2,    // +0.2px
    4: 0.1,    // +0.1px
    5: 0,      // normal
    6: 0,      // normal
    7: 0,      // normal
    8: -0.1,   // slightly tighter
    9: -0.2,   // -0.2px
    10: -0.3,  // -0.3px
    11: -0.4,  // -0.4px
    12: -0.5,  // -0.5px
    13: -0.6,  // -0.6px
    14: -0.8,  // -0.8px
    15: -1.0,  // -1px
    16: -1.2,  // -1.2px
    true: 0.2, // default looser spacing for readability
  },
  weight: {
    ...notoSansFont.weight,
    normal: 'NotoSans-Regular',
    medium: 'NotoSans-Medium',
    true: 'NotoSans-Regular',
  },
});

const monoFont = createFont({
  ...notoSansFont,
  family: 'Noto Sans', // Keep Noto Sans for consistency, could be replaced with mono font
  // Optimized for code and monospace content
  letterSpacing: {
    1: 0,      // normal spacing for code
    2: 0,      // normal
    3: 0,      // normal
    4: 0,      // normal
    5: 0,      // normal
    6: 0,      // normal
    7: 0,      // normal
    8: 0,      // normal
    9: 0,      // normal
    10: 0,     // normal
    11: 0,     // normal
    12: 0,     // normal
    13: 0,     // normal
    14: 0,     // normal
    15: 0,     // normal
    16: 0,     // normal
    true: 0,   // consistent spacing for code readability
  },
});

const config = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    // Primary semantic fonts
    body: bodyFont,          // Main body text
    heading: headingFont,    // All headings
    caption: captionFont,    // Captions, labels, helper text
    mono: monoFont,          // Code, monospace content
    
    // Alias fonts for convenience
    sans: bodyFont,          // Alias for body
    serif: bodyFont,         // Could be replaced with serif font
    
    // Legacy compatibility
    default: bodyFont,       // Fallback
  },
});
type Conf = typeof config
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'NotoSans-Thin': require('../assets/fonts/NotoSans-Thin.ttf'),
    'NotoSans-ExtraLight': require('../assets/fonts/NotoSans-ExtraLight.ttf'),
    'NotoSans-Light': require('../assets/fonts/NotoSans-Light.ttf'),
    'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Medium': require('../assets/fonts/NotoSans-Medium.ttf'),
    'NotoSans-SemiBold': require('../assets/fonts/NotoSans-SemiBold.ttf'),
    'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-ExtraBold': require('../assets/fonts/NotoSans-ExtraBold.ttf'),
    'NotoSans-Black': require('../assets/fonts/NotoSans-Black.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <PortalProvider>
            <Theme name={colorScheme}>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="details" options={{ header: () => <AppBar title="Details" /> }} />
                  <Stack.Screen name="settings" options={{ headerShown: false }} />
                  <Stack.Screen name="podcast" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
              </ThemeProvider>
            </Theme>
          </PortalProvider>
        </TamaguiProvider>
    </QueryClientProvider>
  );
}
