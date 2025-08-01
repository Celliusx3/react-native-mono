import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Button, Text, Card, Separator, RadioGroup, Label } from 'tamagui';
import { Circle } from '@tamagui/shapes';
import { Check, Sun, Moon } from '@tamagui/lucide-icons';
import { ThemedSafeAreaView } from '@/components/ui';
import { useThemeStore, type ColorScheme } from '@/stores/useThemeStore';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThemeOptionProps {
  value: ColorScheme;
  label: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: (value: ColorScheme) => void;
}

function ThemeOption({ value, label, description, icon, isSelected, onSelect }: ThemeOptionProps) {
  return (
    <Card
      pressStyle={{ scale: 0.98 }}
      onPress={() => onSelect(value)}
      padding="$4"
      backgroundColor={isSelected ? '$blue2' : '$background'}
      borderColor={isSelected ? '$blue8' : '$borderColor'}
      borderWidth={isSelected ? 2 : 1}
    >
      <XStack alignItems="center" space="$3">
        <Circle
          size={40}
          backgroundColor={isSelected ? '$blue9' : '$gray5'}
          justifyContent="center"
          alignItems="center"
        >
          {React.cloneElement(icon as React.ReactElement, {
            size: 20,
            color: isSelected ? 'white' : '$gray11',
          })}
        </Circle>
        
        <YStack flex={1} space="$1">
          <XStack alignItems="center" space="$2">
            <Text fontWeight="600" fontSize="$4" color="$color">
              {label}
            </Text>
            {isSelected && (
              <Circle size={16} backgroundColor="$blue9">
                <Check size={12} color="white" />
              </Circle>
            )}
          </XStack>
          <Text fontSize="$3" color="$color11" numberOfLines={2}>
            {description}
          </Text>
        </YStack>
      </XStack>
    </Card>
  );
}

function ThemePreview() {
  const currentTheme = useColorScheme();
  
  return (
    <Card padding="$4" marginTop="$4">
      <Text fontWeight="600" fontSize="$4" marginBottom="$3" color="$color">
        Current Theme Preview
      </Text>
      
      <YStack space="$3">
        <XStack space="$3" alignItems="center">
          <Circle
            size={24}
            backgroundColor={currentTheme === 'dark' ? '$white1' : '$black1'}
          />
          <Text color="$color">
            Background Color
          </Text>
        </XStack>
        
        <XStack space="$3" alignItems="center">
          <Circle
            size={24}
            backgroundColor={currentTheme === 'dark' ? '$white12' : '$black12'}
          />
          <Text color="$color">
            Text Color
          </Text>
        </XStack>
        
        <XStack space="$3" alignItems="center">
          <Circle
            size={24}
            backgroundColor="$blue9"
          />
          <Text color="$color">
            Accent Color
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
}

export default function SettingsScreen() {
  const { colorScheme, setColorScheme, toggleTheme } = useThemeStore();
  const currentTheme = useColorScheme();

  const themeOptions: Array<{
    value: ColorScheme;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      value: 'light',
      label: 'Light',
      description: 'Clean, bright interface for day use',
      icon: <Sun />,
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes for night listening',
      icon: <Moon />,
    },
  ];

  return (
    <ThemedSafeAreaView 
      edges="top"
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} space="$4">
        {/* Header */}
        <YStack space="$2">
          <Text fontSize="$8" fontWeight="bold" color="$color">
            Settings
          </Text>
          <Text fontSize="$4" color="$color11">
            Customize your podcast experience
          </Text>
        </YStack>

        <Separator />

        {/* Theme Section */}
        <YStack space="$3">
          <YStack space="$1">
            <Text fontSize="$6" fontWeight="600" color="$color">
              Appearance
            </Text>
            <Text fontSize="$3" color="$color11">
              Choose how the app looks on your device
            </Text>
          </YStack>

          <YStack space="$3">
            {themeOptions.map((option) => (
              <ThemeOption
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                icon={option.icon}
                isSelected={colorScheme === option.value}
                onSelect={setColorScheme}
              />
            ))}
          </YStack>

          {/* Quick Toggle Button */}
          <Button
            onPress={toggleTheme}
            size="$4"
            variant="outlined"
            iconAfter={currentTheme === 'dark' ? Sun : Moon}
          >
            Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </YStack>

        {/* Theme Preview */}
        <ThemePreview />

        {/* Additional Settings Placeholder */}
        <Separator marginTop="$4" />
        
        <YStack space="$3">
          <Text fontSize="$6" fontWeight="600" color="$color">
            More Settings
          </Text>
          
          <Card padding="$4" opacity={0.6}>
            <YStack space="$2">
              <Text fontWeight="500" color="$color">
                Playback Settings
              </Text>
              <Text fontSize="$3" color="$color11">
                Audio quality, sleep timer, and more
              </Text>
              <Text fontSize="$2" color="$color10" fontStyle="italic">
                Coming soon...
              </Text>
            </YStack>
          </Card>
          
          <Card padding="$4" opacity={0.6}>
            <YStack space="$2">
              <Text fontWeight="500" color="$color">
                Notifications
              </Text>
              <Text fontSize="$3" color="$color11">
                New episodes, recommendations, and updates
              </Text>
              <Text fontSize="$2" color="$color10" fontStyle="italic">
                Coming soon...
              </Text>
            </YStack>
          </Card>
        </YStack>
        </YStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}