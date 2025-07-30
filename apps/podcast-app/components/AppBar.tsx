import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigation } from 'expo-router';
import { H4 } from 'tamagui';

interface AppBarProps {
  title: string;
}

export default function AppBar({ title }: AppBarProps) {
  const colors = useThemeColors();
  const iconColor = colors.icon;
  const borderColor = colors.getColor('icon', { light: '#ccc', dark: '#444' });
  const navigation = useNavigation();

  return (
    <ThemedView style={[styles.headerContainer, { borderBottomColor: borderColor }]}>
      <View style={styles.leftContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <H4>{title}</H4>
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
