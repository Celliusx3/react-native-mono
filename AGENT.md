# Agent Context - React Native Podcast App

## Project Overview
This is a React Native podcast application built with Expo, featuring a modern tech stack optimized for cross-platform development.

## Tech Stack

### Core Framework
- **React Native**: 0.79.5 with New Architecture enabled
- **Expo**: ~53.0.17 (SDK 53)
- **TypeScript**: ~5.8.3
- **React**: 19.0.0

### UI & Design
- **Tamagui**: ^1.132.10 - Modern styling system and component library
- **Expo Symbols**: Icon system
- **Expo Image**: Optimized image components
- **Expo Blur**: Blur effects
- **React Native Reanimated**: ~3.17.4 - Animations

### Navigation
- **Expo Router**: ~5.1.3 - File-based routing system
- **React Navigation**: Bottom tabs and native navigation

### Media & Video
- **Expo Video**: ^2.2.2 - Video playback capabilities
- **Expo Haptics**: Haptic feedback

### State Management
- **Zustand**: Implied from context (lightweight state management)
- **TanStack React Query**: ^5.51.1 - Server state management

### Performance
- **Shopify FlashList**: ^1.8.3 - High-performance lists
- **React Native Gesture Handler**: Touch handling
- **React Native Screens**: Native screen management

## Project Structure
```
apps/podcast-app/
├── app/                 # Expo Router file-based routing
│   ├── (tabs)/         # Tab navigation layout
│   ├── podcast/        # Podcast-related screens
│   └── settings/       # Settings screens
├── components/         # Reusable components
│   ├── ui/            # UI-specific components
│   └── *.tsx          # Feature components
├── constants/         # App constants
├── hooks/             # Custom React hooks
└── assets/            # Static assets (fonts, images)
```

## Key Features
- Cross-platform podcast app (iOS, Android, Web)
- Video playback support
- Modern UI with Tamagui
- File-based routing
- Performance optimized with FlashList
- Haptic feedback integration
- Responsive design with safe area handling

## Development Commands
- `yarn start` - Start Expo development server
- `yarn android` - Run on Android
- `yarn ios` - Run on iOS  
- `yarn web` - Run on Web
- `yarn lint` - Run ESLint

## Notes for AI Agents
- Use Tamagui components and styling system
- Follow Expo Router conventions for navigation
- Leverage React Query for data fetching
- Use FlashList for performance-critical lists
- Apply proper TypeScript typing
- Maintain cross-platform compatibility
- Consider haptic feedback for user interactions
- Use Expo Video for media playback features