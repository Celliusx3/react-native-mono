import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void; // New prop
  onClear?: () => void;
}

export default function SearchBar({ placeholder = "Search", value, onChangeText, onSearch, onClear }: SearchBarProps) {
  const colors = useThemeColors();
  const iconColor = colors.icon;
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  const handleSubmit = () => {
    onSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <IconSymbol name="magnifyingglass" size={20} color={iconColor} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={iconColor}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          onSubmitEditing={handleSubmit} // Trigger search on submit
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <IconSymbol name="x.circle.fill" size={16} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      {isFocused && (
        <TouchableOpacity onPress={() => setIsFocused(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFF0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  clearButton: {
    padding: 5,
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#007AFF', // Standard iOS blue color
    fontSize: 16,
  },
});
