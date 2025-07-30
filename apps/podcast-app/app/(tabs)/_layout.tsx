import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Home, Settings } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colors = useThemeColors();
  const backgroundColor = colors.background;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: colors.background,
            borderTopColor: colors.tabIconDefault,
          },
        }),
        sceneStyle: { backgroundColor },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
          sceneStyle: { backgroundColor },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
          sceneStyle: { backgroundColor },
        }}
      />

    </Tabs>
  );
}
