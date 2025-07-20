
import React from 'react';
import { ThemedText } from './ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Sheet } from 'tamagui';

interface PlaybackSpeedBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeedChange: (speed: number) => void;
  currentSpeed: number;
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function PlaybackSpeedBottomSheet({
  isOpen,
  onClose,
  onSpeedChange,
  currentSpeed,
}: PlaybackSpeedBottomSheetProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[50]}
      modal
    >
      <Sheet.Overlay
        animation="lazy"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame>
        <Sheet.Handle />
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>Playback speed</ThemedText>
          {playbackSpeeds.map((speed) => (
            <TouchableOpacity
              key={speed}
              style={styles.speedOption}
              onPress={() => onSpeedChange(speed)}
            >
              <ThemedText>{speed}x</ThemedText>
              {currentSpeed === speed && <View style={styles.selectedIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </Sheet.Frame>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  speedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});
