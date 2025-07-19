import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useYoutube } from '@/hooks/useYoutube';
import { useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function YouTubeScreen() {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ'); // Default video ID

  const { data, isFetching, isError, error, refetch } = useYoutube(videoId);

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Fetch YouTube Data</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChangeText={setVideoId}
      />
      <Button title="Fetch Video" onPress={() => refetch()} />

      {isFetching && <ActivityIndicator style={styles.loader} />}
      {isError && <ThemedText>Error: {error.message}</ThemedText>}
      {data && !isFetching && (
        <ThemedView style={styles.response}>
          <ThemedText type="defaultSemiBold">
            Title: {data.videoDetails.title}
          </ThemedText>
          <ThemedText>Author: {data.videoDetails.author}</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginTop: 10 }}>
            Formats:
          </ThemedText>
                    {data.streamingData.formats.map((format, index) => (
            <ThemedText key={index}>
              - {format.qualityLabel} ({format.mimeType})
            </ThemedText>
          ))}
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  loader: {
    marginTop: 16,
  },
  response: {
    marginTop: 16,
  },
});
