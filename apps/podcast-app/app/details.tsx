import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ui';

export default function DetailsScreen() {
  return (
    <ThemedSafeAreaView 
      alignItems="center"
      justifyContent="center"
    >
      <ThemedText type="title">Details Screen</ThemedText>
    </ThemedSafeAreaView>
  );
}
