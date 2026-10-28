---
name: design-system-ui-components
description: Before building screens, reuse Ds* components in src/core/design_system; always apply safe areas (SafeAreaView / useSafeAreaInsets). Use NativeWind semantic tokens. Avoid flex-1 justify-between form layouts unless spec requires fixed bottom chrome.
---

# Design system UI primitives

Qel’s reusable UI lives under `src/core/design_system/components/`.

## Agents must — before composing new markup

1. **Check existing primitives.** Prefer composing `DsButton`, `DsTextField`, `DsOtpField`, `DsSelectField`, `DsInlineActionField`, and `DsCircleActionButton` over ad-hoc `Pressable` + `TextInput` stacks unless the UX is materially different.

2. **Follow NativeWind semantics.** Extend components with Tailwind semantic classes (`text-content-muted`, `bg-primary`, spacing tokens such as `p-base`, typography such as `text-body-lg`). Raw hex and `StyleSheet.create` styling are forbidden for visuals except where the design-system-nativewind skill explicitly allows theme imports (e.g. Reanimated).

3. **Safe area on every screen.** Full-screen feature UIs must respect device safe areas. Wrap the screen body in `SafeAreaView` from `react-native-safe-area-context` with explicit `edges` (`['top', 'left', 'right', 'bottom']` unless a deliberate edge-to-edge hero needs an exception — then document why and inset the interactive region). Alternative: pad with `useSafeAreaInsets()` on `ScrollView` / `FlatList` `contentContainerStyle`. Do **not** ship layouts that tuck headers or CTAs under the status bar or home indicator.

4. **Form layout: top-down stacking.** Do **not** use `flex-1 justify-between` (or `flexGrow: 1` on scroll content solely) to push primary actions to the viewport bottom unless the spec explicitly requires **fixed** bottom chrome (e.g. a persistent tab bar). Typical auth and form flows stack title → fields → helper/error → primary button → tertiary links with **`mt-*` / `gap-*`** only.

5. **Keyboard handling and ScrollViews.** Always account for keyboard appearances with ScrollViews. When forms are present, prefer using `automaticallyAdjustKeyboardInsets={true}` directly on the `ScrollView` (instead of `KeyboardAvoidingView`) as it triggers native iOS auto-scrolling to the focused text input organically. On Android, `windowSoftInputMode="adjustResize"` in Expo inherently handles it.

6. **Maximize tap targets.** Always account for tap areas when dealing with anything that could be tapped (including tap-to-focus or tap-to-unfocus). Use `hitSlop` on `Pressable`s or apply sufficient structural padding to maximize the clickable surface region without visually compromising or distorting the UI.

7. **Co-locate new primitives.** If a pattern repeats across features and no component fits, add it next to siblings under `buttons/` or `inputs/`, naming with the `Ds` prefix for design-system primitives.

8. **Form Focus Hierarchy & Keyboard Return Keys.** When dealing with forms, ALWAYS pay attention to the focus hierarchy. Use `React.useRef<TextInput>` for inputs. Set `returnKeyType="next"`, `blurOnSubmit={false}`, and use `onSubmitEditing={() => nextFieldRef.current?.focus()}` to smoothly move focus to the next field. On the very last field, use `returnKeyType="done"` and submit the form.

## Safe area snippet

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

export function ExampleScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right', 'bottom']}>
      {/* … */}
    </SafeAreaView>
  );
}
```

## Component map

| Component | Purpose |
|-----------|---------|
| `buttons/DsButton.tsx` | Primary / secondary pill buttons, ghost text actions, optional leading icon |
| `buttons/DsCircleActionButton.tsx` | Circular blue CTA beside inline fields |
| `inputs/DsTextField.tsx` | Pill text field — optional label, helper, errors, accessories |
| `inputs/DsOtpField.tsx` | Labelled 6-slot OTP strip |
| `inputs/DsSelectField.tsx` | Pill select trigger — label, helper, trailing chevron |
| `inputs/DsInlineActionField.tsx` | Row layout pairing a pill field with a trailing action |
| `inputs/DsValueUnitRow.tsx` | Label + value pill TextInput + muted unit pill (`DsPickListModal`) |
| `pickers/DsPickListModal.tsx` | Bottom sheet modal list picker (species, units, etc.) |

## Auth login footer links

URLs for **Terms of Service** and **Privacy Policy** on the email login screen are **not** in `.env`. Edit `src/features/auth/config/legalLinks.json` (`termsOfServiceUrl`, `privacyPolicyUrl`). The phrases stay **brand-primary blue** regardless; `onPress` opens the browser only when that URL string is non-empty.
