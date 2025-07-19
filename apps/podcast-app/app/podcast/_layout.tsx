import { Stack } from 'expo-router';
import AppBar from '@/components/AppBar';

export default function PodcastLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <AppBar title="Podcast" /> }} />
      <Stack.Screen name="player-screen" options={{ header: () => <AppBar title="Player" /> }} />
    </Stack>
  );
}
