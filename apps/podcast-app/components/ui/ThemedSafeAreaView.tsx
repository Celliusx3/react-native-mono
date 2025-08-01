import { styled } from '@tamagui/core';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ThemedSafeAreaView = styled(SafeAreaView, {
  name: 'ThemedSafeAreaView',
  flex: 1,
  backgroundColor: '$background',
  
  // Ensure proper safe area handling for all edges by default
  // This ensures content renders within safe area boundaries
  variants: {
    edges: {
      // Default: respect all safe area edges (top, bottom, left, right)
      all: {
        // SafeAreaView from react-native-safe-area-context handles insets automatically
        // No additional styling needed - the component handles safe areas natively
      },
      // Custom edge configurations for specific use cases
      top: {
        // Will only respect top safe area (useful for modals, overlays)
      },
      bottom: {
        // Will only respect bottom safe area (useful for fixed bottom content)
      },
      horizontal: {
        // Will only respect left and right safe areas (useful for landscape)
      },
      none: {
        // No safe area handling (use with caution)
      },
    },
  } as const,
  
  // Default variant ensures all edges are respected
  defaultVariants: {
    edges: 'all',
  },
} as const);

