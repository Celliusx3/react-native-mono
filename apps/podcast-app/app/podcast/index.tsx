import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedSafeAreaView } from '@/components/ui';
import SearchBar from '@/components/SearchBar';
import { useYoutube } from '@/hooks/useYoutube';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function PodcastScreen() {
  const [searchTerm, setSearchTerm] = useState('dQw4w9WgXcQ');
  const router = useRouter();

  const { data, isFetching, isError, error, refetch } = useYoutube(searchTerm);

  const handleSearch = () => {
    refetch();
  };

  return (
    <ThemedSafeAreaView edges="bottom">
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Find podcasts (enter YouTube ID)"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSearch={handleSearch}
        />
      </View>

      {isFetching && <ActivityIndicator style={styles.loader} />}
      {isError && <ThemedText>Error: {error.message}</ThemedText>}
      {data && !isFetching && (
        <>
          <ThemedText type="defaultSemiBold" style={styles.topResultsTitle}>
            Top results
          </ThemedText>
          <FlashList
            data={[data]} // FlashList expects an array
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.podcastItem}
                onPress={() => router.push({ pathname: "/podcast/podcast-screen", params: { videoDetails: JSON.stringify(item) } })}
              >
                <Image source={{ uri: item.videoDetails.thumbnail.thumbnails[0].url }} style={styles.podcastImage} />
                <ThemedView style={styles.podcastDetails}>
                  <ThemedText type="defaultSemiBold">{item.videoDetails.title}</ThemedText>
                  <ThemedText style={styles.podcastEpisodes}>Podcast · {item.videoDetails.author}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
            estimatedItemSize={100}
            contentContainerStyle={styles.listContentContainer}
          />
        </>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 16,
  },
  topResultsTitle: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  podcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  podcastImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  podcastDetails: {
    flex: 1,
  },
  podcastEpisodes: {
    fontSize: 12,
    color: 'gray',
  },
  loader: {
    marginTop: 16,
  },
});