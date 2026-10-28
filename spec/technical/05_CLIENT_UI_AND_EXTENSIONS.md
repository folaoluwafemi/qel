# Technical Spec 05: Client UI Architecture, Browser Extension & Android Menus

> *"The pure mymind visual stream, offline-first client architecture, Manifest V3 browser extension, and native Android system menus."*

---

## 1. Client Architecture & Technology Stack

The client follows a unified, modular Clean Architecture to support Mobile (iOS / Android) and Web from a shared design token system:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             CLIENT APP STACK                             │
├────────────────────────────┬─────────────────────────────────────────────┤
│ Framework                  │ React Native / Expo (SDK 52+) & Web (Next.js│
│ UI & Token System          │ NativeWind v4 (Tailwind tokens: Geist/Genos)│
│ State & Offline Sync       │ Zustand + TanStack Query + Local SQLite     │
│ List Virtualization        │ FlashList (Mobile) / TanStack Virtual (Web) │
│ Realtime Communication     │ WebSocket Client -> LiveSessionDO           │
└────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 2. The Pure mymind Visual Stream Implementation

### 2.1 Infinite Masonry Grid with Optimistic UI
* **Masonry Rendering**: 2-column on mobile, 4–6 column responsive on desktop.
* **Instant Optimistic Capture**:
  * When you record an audio note or paste an idea, a placeholder visual card renders **instantly (<50ms)** with a pulsing waveform/shimmer.
  * As the Cloudflare Worker completes transcription, color extraction, and OCR, the card seamlessly hydrates with rich metadata.
* **Smart Spaces as Dynamic Filters**:
  * Switching to a Smart Space applies a client-side + server-side living query filter with smooth layout animations (Reanimated 3).

### 2.2 Modal Navigation: Visual Stream vs. AI Thinking Lens
* **Visual Stream Mode**: Default view. 100% immersive, distraction-free gallery of your raw visual cards.
* **AI Thinking Lens Mode**: Swiped up or toggled via keyboard shortcut (`Cmd + K` / Floating Orb). Opens a calm conversational overlay where you spar with Qel, while referenced visual tiles gently glow in the background.

---

## 3. Browser Extension Architecture (Manifest V3)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   BROWSER EXTENSION (MANIFEST V3)                        │
├──────────────────────────────────────────────────────────────────────────┤
│ Background Service Worker                                                │
│ • Context Menu Listener: Right-click text -> "Save to Qel"               │
│ • Direct API communication with Cloudflare Worker                        │
├──────────────────────────────────────────────────────────────────────────┤
│ Content Script                                                           │
│ • Extracts clean HTML, article body, meta tags, and page screenshots     │
│ • Injects quick reaction tooltip on highlighted text                     │
├──────────────────────────────────────────────────────────────────────────┤
│ Popup UI (React + Tailwind)                                              │
│ • Quick thought drop + instant audio record button in browser toolbar    │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Android Native System Integration

To achieve frictionless capture on mobile, Qel registers system-level intent filters in `AndroidManifest.xml`:

### 4.1 System-Wide Context Menu ("Send to Qel")
Allows highlighting text anywhere in Android (e.g. inside WhatsApp, Chrome, Twitter) and seeing a native **"Send to Qel"** action:

```xml
<activity android:name=".ProcessTextActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.PROCESS_TEXT" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

### 4.2 System Share Sheet Target
Allows sharing images from Pinterest, audio files, or links directly from any Android app into Qel with a single tap:

```xml
<intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="image/*" />
    <data android:mimeType="audio/*" />
    <data android:mimeType="text/plain" />
</intent-filter>
```
