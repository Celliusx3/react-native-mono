import { Stack } from 'expo-router';
import AppBar from '@/components/AppBar';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <AppBar title="Settings" /> }} />
    </Stack>
  );
}
