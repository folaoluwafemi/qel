---
name: design-system-nativewind
description: Enforces Qel's NativeWind-based design token system. All UI must use semantic Tailwind classes mapped from the designer's Figma tokens. No ad-hoc colors, no inline styles, no StyleSheet.create for visual styling.
---

# Design System — NativeWind Token Architecture

All UI in this codebase is styled using **NativeWind v4** (Tailwind CSS for React Native). The design tokens originate from Figma and are codified in `tailwind.config.ts`. The canonical reference is `knowledge_base/design_architecture.md`.

## 1. Always Use Semantic Color Classes

Components must reference **semantic** token names, never raw primitive values.

✅ **DO:**
```tsx
<View className="bg-surface">
<Text className="text-content-strong font-heading text-h1">Title</Text>
<Text className="text-content font-body text-body-lg">Body</Text>
<Text className="text-content-muted font-body text-body-sm">Helper</Text>
<TouchableOpacity className="bg-primary active:bg-primary-pressed rounded-lg p-base">
  <Text className="text-white font-body text-btn">Book Now</Text>
</TouchableOpacity>
```

❌ **DO NOT:**
```tsx
// Never use raw hex values
<View style={{ backgroundColor: '#2563FF' }}>
<Text style={{ color: '#334155', fontSize: 16 }}>

// Never use primitive scale classes directly for semantics
<View className="bg-blue-500">
<Text className="text-gray-700">
```

## 2. Always Use Spacing Tokens

Use the defined spacing scale for all padding, margin, and gap values.

✅ **DO:**
```tsx
<View className="p-base gap-sm">         // 16px padding, 8px gap
<View className="px-2xl mt-lg">          // 48px horizontal padding, 24px top margin
```

❌ **DO NOT:**
```tsx
<View className="p-4">                   // Tailwind default, not our token scale
<View style={{ padding: 16 }}>           // Inline style, not token-based
```

## 3. Always Use Typography Presets

Combine `font-heading` or `font-body` with the correct `text-{size}` preset.

✅ **DO:**
```tsx
<Text className="font-heading text-h1 text-content-strong">Screen Title</Text>
<Text className="font-heading-semibold text-h2 text-content-strong">Section Header</Text>
<Text className="font-body text-body-lg text-content">Standard paragraph</Text>
<Text className="font-body text-body-sm text-content-muted">Timestamp</Text>
<Text className="font-body-semibold text-btn text-white">Button</Text>
<Text className="font-body-medium text-label text-content">Nav item</Text>
```

❌ **DO NOT:**
```tsx
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
<Text className="text-2xl font-bold">     // Tailwind defaults, not our presets
```

## 4. Status/Feedback Colors

Use semantic status tokens for all system feedback UI.

```tsx
// Success
<View className="bg-success-surface"><Text className="text-success">Confirmed</Text></View>

// Warning
<View className="bg-warning-surface"><Text className="text-warning">Pending</Text></View>

// Error
<View className="bg-error-surface"><Text className="text-error">Failed</Text></View>
```

## 5. When You Need JS Access to Tokens

For cases where `className` is not sufficient (Reanimated animated values, SVG fill props, charting libraries), import from the theme index:

```tsx
import { colors, spacing } from '@/core/design_system/theme';

// Use in Reanimated
const animatedBg = useAnimatedStyle(() => ({
  backgroundColor: withTiming(colors.primary.DEFAULT),
}));

// Use in SVG
<Circle fill={colors.success.DEFAULT} r={spacing.sm} />
```

## 6. No Dark Mode

There is no dark mode. Do not use `dark:` variant classes. Do not import `useColorScheme` or `DarkTheme` for styling purposes.

## 7. Source of Truth Chain

```
Figma → knowledge_base/design_tokens.md → knowledge_base/design_architecture.md → tailwind.config.ts
```

If you need a color, spacing value, or font size that doesn't exist in `tailwind.config.ts`, do NOT invent one. Flag it as a gap that needs to go through the design architecture update process.

## 8. Safe area (screens)

Every full-screen view must respect safe areas (notch, status bar, Dynamic Island, home indicator). Use `SafeAreaView` from `react-native-safe-area-context` with explicit `edges`, or apply `useSafeAreaInsets()` padding to scroll content. This is required in addition to NativeWind tokens — **do not** infer safe area from spacing classes alone.
