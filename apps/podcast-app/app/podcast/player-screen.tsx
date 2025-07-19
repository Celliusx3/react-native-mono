import VideoPlayer from '@/components/VideoPlayer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function PlayerScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Podcast Player Screen</ThemedText>
      <VideoPlayer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
