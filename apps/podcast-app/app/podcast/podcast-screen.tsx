import { Slider } from 'tamagui';
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
    console.log("Duration", duration);
    setDuration(duration);
  });

  useEventListener(player, 'playingChange', ({ isPlaying }) => {
    setIsPlaying(isPlaying);
  });

  useEventListener(player, 'timeUpdate', ({ currentTime}) => {
    console.log("Current time", currentTime)
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

  const handleSkipBackward = () => {
    player.currentTime = Math.max(0, position - 10);
  };

  const handleSkipForward = () => {
    player.currentTime = Math.min(duration, position + 10);
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
        <TouchableOpacity onPress={handleSkipBackward}>
          <Ionicons name="play-back-sharp" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipForward}>
          <Ionicons name="play-forward-sharp" size={36} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Slider 
        size="$1" 
        width="100%" 
        max={100} 
        step={1}
        value={[duration === 0 ? 0 : Math.round((position / duration) * 100)]}
        onValueChange={(value) => {
          // if (duration > 0) {
          //   console.log(Math.floor((value[0] / 100) * duration));
          //   player.seekBy(Math.floor((value[0] / 100) * duration));
          // }
        }}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider> */}

      {/* <Slider
        width = "100%"
        defaultValue={[currentTime]}
        value={[currentTime]}
        min={0}
        max={duration}
        step={1}
        onValueChange={handleSeek}
        size="$1"
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb index={0} circular elevate />
      </Slider> */}

      <View style={styles.timeContainer}>
        <ThemedText>{formatTime(position)}</ThemedText>
        <ThemedText>{formatTime(duration)}</ThemedText>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText>1x</ThemedText>
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
  
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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

