import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider, createTamagui, createFont } from '@tamagui/core';
import { PortalProvider } from '@tamagui/portal';
import { defaultConfig } from '@tamagui/config/v4';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AppBar from '@/components/AppBar';
import { QueryClientProvider, queryClient } from '@/hooks/useQuery';

const notoSansFont = createFont({
  family: 'Noto Sans',
  size: {
    // You can define specific font sizes here, e.g.,
    // 1: 10,
    // 2: 12,
    // ...
  },
  lineHeight: {
    // Define line heights if needed
  },
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
  },
  letterSpacing: {
    // Define letter spacing if needed
  },
});

const config = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    body: notoSansFont,
    heading: notoSansFont,
  },
});
type Conf = typeof config
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <PortalProvider>
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
          </PortalProvider>
        </TamaguiProvider>
    </QueryClientProvider>
  );
}
