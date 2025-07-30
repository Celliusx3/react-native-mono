import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePodcasts } from '@/hooks/usePodcast';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  const { data, isLoading, error } = usePodcasts();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="heading">Explore Podcasts</ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.collectionId.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText variant="body" weight="semibold">{item.collectionName}</ThemedText>
            <ThemedText>{item.artistName}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.3)',
  },
});
