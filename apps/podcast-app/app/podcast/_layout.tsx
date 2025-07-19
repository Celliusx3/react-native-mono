import { Stack } from 'expo-router';

export default function PodcastLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Podcast' }} />
      <Stack.Screen name="player-screen" options={{ title: 'Player' }} />
    </Stack>
  );
}
