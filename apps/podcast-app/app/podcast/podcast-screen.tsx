import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEventListener } from 'expo';
import { Image } from 'expo-image';
import { useVideoPlayer } from 'expo-video';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PodcastScreen() {
  const { videoDetails } = useLocalSearchParams();
  const parsedVideoDetails = JSON.parse(videoDetails as string);
  const player = useVideoPlayer(parsedVideoDetails.streamingData.formats[0].url as string, player => {
    player.staysActiveInBackground = true;
    player.showNowPlayingNotification = true;
    player.timeUpdateEventInterval = 1;
    player.play();
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);


  useEventListener(player, 'sourceLoad', ({ duration }) => {
    setDuration(duration);
  });

  useEventListener(player, 'playingChange', ({ isPlaying }) => {
    setIsPlaying(isPlaying);
  });

  useEventListener(player, 'timeUpdate', ({ currentTime}) => {
    setPosition(currentTime);
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.artworkContainer}>
        <Image
          source={{ uri: parsedVideoDetails.videoDetails.thumbnail.thumbnails[0].url }}
          style={styles.artwork}
        />
      </View>
      <ThemedText type="title" style={styles.podcastTitle}>{parsedVideoDetails.videoDetails.title}</ThemedText>
      <ThemedText style={styles.podcastArtist}>{parsedVideoDetails.videoDetails.author}</ThemedText>

      <View style={styles.controlsContainer}>
        <Ionicons name="play-back-sharp" size={36} color="black" />
        <Ionicons name="play-skip-back-sharp" size={36} color="black" />
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="white" />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward-sharp" size={36} color="black" />
        <Ionicons name="play-forward-sharp" size={36} color="black" />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(position / duration) * 100}%` }]} />
        <View style={styles.progressRemaining} />
      </View>
      <View style={styles.timeContainer}>
        <ThemedText>{formatTime(position)}</ThemedText>
        <ThemedText>{formatTime(duration)}</ThemedText>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText>1x</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText>Sleep Timer</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText>15</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText>30</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  artworkContainer: {
    marginVertical: 30,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  podcastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  podcastArtist: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  playButton: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBar: {
    width: '50%', // Example progress
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 2,
  },
  progressRemaining: {
    flex: 1,
    backgroundColor: '#eee',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
});
