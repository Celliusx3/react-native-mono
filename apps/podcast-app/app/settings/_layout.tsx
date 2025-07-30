import { Stack } from 'expo-router';
import AppBar from '@/components/AppBar';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function SettingsLayout() {
  const colors = useThemeColors();
  const backgroundColor = colors.background;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor },
        headerStyle: { backgroundColor },
        headerTintColor: colors.text,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          header: () => <AppBar title="Settings" />,
          contentStyle: { backgroundColor },
        }} 
      />
    </Stack>
  );
}
