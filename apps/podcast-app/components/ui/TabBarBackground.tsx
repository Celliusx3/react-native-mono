import { View } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

// Tab bar background for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const colors = useThemeColors();
  const backgroundColor = colors.background;
  
  return (
    <View 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor,
      }}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
