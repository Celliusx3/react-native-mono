import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Button, Text, Separator } from 'tamagui';
import { Sun, Moon } from '@tamagui/lucide-icons';
import { ThemedSafeAreaView } from '@/components/ui';
import { useThemeStore } from '@/stores/useThemeStore';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const { toggleTheme } = useThemeStore();
  const currentTheme = useColorScheme();

  return (
    <ThemedSafeAreaView 
      edges="top"
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} space="$6">
          {/* Header */}
          <YStack space="$2">
            <Text fontSize="$8" fontWeight="bold" color="$color">
              Settings
            </Text>
            <Text fontSize="$4" color="$color11">
              Customize your podcast experience
            </Text>
          </YStack>

          <Separator />

          {/* Theme Section */}
          <YStack space="$4">
            <YStack space="$1">
              <Text fontSize="$6" fontWeight="600" color="$color">
                Theme
              </Text>
              <Text fontSize="$3" color="$color11">
                Currently using {currentTheme} mode
              </Text>
            </YStack>

            <Button
              onPress={toggleTheme}
              size="$5"
              theme="blue"
              iconAfter={currentTheme === 'dark' ? Sun : Moon}
            >
              Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}