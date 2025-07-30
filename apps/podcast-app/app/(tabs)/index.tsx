import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Home, Info, Settings, Mic } from '@tamagui/lucide-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const DATA = [
  { id: '1', title: 'Home', icon: Home, path: '/' },
  { id: '3', title: 'Details', icon: Info, path: '/details' },
  { id: '4', title: 'Settings', icon: Settings, path: '/(tabs)/settings' },
  { id: '5', title: 'Podcast', icon: Mic, path: '/podcast' },
];

export default function HomeScreen() {
  const colors = useThemeColors();
  const iconColor = colors.icon;
  const itemBackgroundColor = colors.getColor('background', { light: '#f9f9f9', dark: '#2a2a2a' });
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof DATA[0] }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity 
        style={[styles.item, { backgroundColor: itemBackgroundColor }]} 
        onPress={() => router.push(item.path)}
      >
        <IconComponent size={40} color={iconColor} />
        <ThemedText style={styles.title}>{item.title}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        estimatedItemSize={150}
        contentContainerStyle={styles.grid}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  grid: {
    padding: 4,
  },
  item: {
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
  },
});
