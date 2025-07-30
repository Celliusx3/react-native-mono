import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColors } from '@/hooks/useThemeColors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const DATA = [
  { id: '1', title: 'Home', icon: 'house.fill', path: '/' },
  { id: '2', title: 'Send', icon: 'paperplane.fill', path: '/explore' },
  { id: '3', title: 'Details', icon: 'info.circle.fill', path: '/details' },
  { id: '4', title: 'Settings', icon: 'gearshape.fill', path: '/settings' },
  { id: '5', title: 'Podcast', icon: 'mic.fill', path: '/podcast' },
];

export default function HomeScreen() {
  const colors = useThemeColors();
  const iconColor = colors.icon;
  const itemBackgroundColor = colors.getColor('background', { light: '#f9f9f9', dark: '#2a2a2a' });
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof DATA[0] }) => (
    <TouchableOpacity 
      style={[styles.item, { backgroundColor: itemBackgroundColor }]} 
      onPress={() => router.push(item.path)}
    >
      <IconSymbol name={item.icon as any} size={40} color={iconColor} />
      <ThemedText style={styles.title}>{item.title}</ThemedText>
    </TouchableOpacity>
  );

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
