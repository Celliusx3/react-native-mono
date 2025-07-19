import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from 'expo-router';

interface AppBarProps {
  title: string;
}

export default function AppBar({ title }: AppBarProps) {
  const iconColor = useThemeColor({}, 'icon');
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.rightContainer} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Adjust padding for Android status bar
    height: Platform.OS === 'android' ? 80 : 60, // Standard header height
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
});
