# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
React Native monorepo containing a podcast application built with modern cross-platform development tools and best practices.

## Repository Structure
```
react-native-mono/
└── apps/
    └── podcast-app/          # Main podcast application
        ├── app/              # Expo Router file-based routing
        │   ├── (tabs)/       # Tab-based navigation screens
        │   ├── podcast/      # Podcast-specific screens
        │   └── settings/     # Settings screens
        ├── components/       # Reusable components
        │   └── ui/          # Base UI components
        ├── constants/        # App-wide constants
        ├── hooks/           # Custom React hooks
        ├── stores/          # Zustand state stores
        └── assets/          # Static assets (fonts, images)
```

## Core Technologies

### Framework Stack
- **React Native**: 0.79.5 with New Architecture
- **Expo**: SDK 53 (~53.0.17) for cross-platform development
- **TypeScript**: ~5.8.3 with strict mode enabled
- **React**: 19.0.0

### UI & Styling
- **Tamagui**: ^1.132.15 - Primary design system and component library
- **Design System**: Follows Tailwind CSS v4 principles with theme variables and design tokens
- **Custom Font System**: Noto Sans with Tailwind-inspired semantic variants (body, heading, caption, mono)
- **Theme System**: Light/dark mode support with Tamagui themes and CSS custom properties

### Navigation & Routing
- **Expo Router**: ~5.1.3 - File-based routing system with built-in navigation components

### State Management
- **Zustand**: ^5.0.6 - Lightweight state management
- **TanStack React Query**: ^5.51.1 - Server state and caching

### Performance
- **Shopify FlashList**: ^1.8.3 - Virtualized lists for large datasets
- **React Native Reanimated**: ~3.17.4 - High-performance animations
- **React Native Screens**: Native screen management

## Development Commands

Navigate to `apps/podcast-app/` before running these commands:

### Development
- `yarn start` - Start Expo development server with Metro bundler
- `yarn android` - Launch on Android device/emulator
- `yarn ios` - Launch on iOS device/simulator  
- `yarn web` - Launch web version in browser

### Code Quality
- `yarn lint` - Run ESLint with Expo configuration
- No test framework configured currently

### Project Management
- `yarn reset-project` - Reset to blank project structure

## Architecture Guidelines

### Component Development
- Use Tamagui components as building blocks (`XStack`, `YStack`, `Text`, etc.)
- Follow Tailwind v4 design token approach with semantic naming
- Leverage semantic font variants: `body`, `heading`, `caption`, `mono`
- Apply Tailwind-inspired utility classes through Tamagui props
- Follow Expo Router file-based routing conventions (no React Navigation)
- Use Expo Router's built-in navigation hooks (`useNavigation`, `useRouter`, `useLocalSearchParams`)
- Implement proper TypeScript interfaces for all props

### State Management Patterns
- Use Zustand stores for global application state
- Leverage React Query for server state, caching, and data synchronization
- Custom hooks in `/hooks` directory for reusable logic

### Performance Considerations
- Use FlashList instead of FlatList for large datasets
- Implement proper memoization with React.memo and useMemo
- Optimize images with Expo Image component
- Consider haptic feedback for enhanced user experience

### Design System (Tailwind v4 Inspired)
- **Theme Variables**: Design tokens defined as CSS custom properties following Tailwind v4 principles
- **Typography Scale**: Follows Tailwind's semantic sizing (text-sm, text-base, text-lg, etc.) mapped to Tamagui
- **Color System**: Semantic color palette with numerical scales (50-950) for consistent theming
- **Spacing System**: Uses Tailwind's spacing scale (4px base unit) for consistent margins, padding, and gaps
- **Font Variants**: Semantic font families aligned with Tailwind naming conventions
- **Utility-First Approach**: Component composition using atomic design principles
- Use `@/` path alias for clean imports

### Cross-Platform Compatibility
- Maintain iOS, Android, and web compatibility
- Test responsive layouts across different screen sizes
- Consider platform-specific UI patterns when necessary

## Design System Implementation

### Tailwind v4 Principles Applied
- **Theme Variables**: Design tokens stored as CSS custom properties in Tamagui config
- **Utility-First**: Component composition using atomic Tamagui props
- **Semantic Naming**: Color and spacing scales follow Tailwind conventions
- **Modern CSS**: Leverages CSS custom properties for dynamic theming

### Typography Scale (Tailwind Aligned)
```
Size Scale:  Tailwind    Tamagui     Use Case
1 (11px)  -> text-xs  -> caption   -> Fine print, badges
2 (12px)  -> text-sm  -> body-sm   -> Small body text
3 (13px)  -> text-sm  -> body      -> Default mobile text
4 (14px)  -> text-base -> body-lg  -> Primary body text
5 (16px)  -> text-lg  -> heading-sm -> Small headings
6 (18px)  -> text-xl  -> heading   -> Section headings
7 (20px)  -> text-2xl -> heading-lg -> Page headings
8+ (24px+) -> text-3xl+ -> display  -> Hero text
```

### Color System (Tailwind Style)
```
Semantic Colors:
- Primary: --color-primary-{50-950}
- Secondary: --color-secondary-{50-950}
- Accent: --color-accent-{50-950}
- Neutral: --color-neutral-{50-950}
- Success/Warning/Error: Standard semantic scales
```

### Spacing Scale (4px Base Unit)
```
Tailwind -> Tamagui -> Pixels
space-1  -> $1      -> 4px
space-2  -> $2      -> 8px
space-3  -> $3      -> 12px
space-4  -> $4      -> 16px
space-6  -> $6      -> 24px
space-8  -> $8      -> 32px
```

## Key Files

### Configuration
- `app/_layout.tsx` - Root layout with Tailwind-inspired theme configuration (Expo Router only)
- `app/(tabs)/_layout.tsx` - Tab navigation layout using Expo Router's Tabs component
- `tsconfig.json` - TypeScript configuration with strict mode
- `eslint.config.js` - ESLint configuration using Expo preset

### Core Constants
- `constants/Colors.ts` - Tailwind-style color tokens for light/dark modes
- `constants/Api.ts` - API endpoints and configuration

### Custom Hooks
- `hooks/useColorScheme.ts` - Theme detection and management
- `hooks/useQuery.ts` - React Query client configuration
- `hooks/usePodcast.ts` - Podcast-specific data fetching