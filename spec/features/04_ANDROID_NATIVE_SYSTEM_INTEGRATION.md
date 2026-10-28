# Feature Spec: Android Native System Integration
*System-Wide Context Menu ("Send to Qel"), Universal Share Target & Offline Sync*

---

## 1. Feature Vision: System-Wide OS Capture

To make capture seamless, Qel integrates directly into the Android operating system at the native level, eliminating the need to switch apps to save context.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     ANDROID SYSTEM CAPTURE FLOW                          │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. SYSTEM-WIDE CONTEXT MENU (`ACTION_PROCESS_TEXT`)                      │
│    • Highlight text in any app (Chrome, Twitter, WhatsApp, Notes)        │
│    • Tap "Send to Qel" alongside Copy / Share                            │
│    • A subtle bottom toast confirms instant background capture           │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. UNIVERSAL SHARE SHEET TARGET (`ACTION_SEND`)                          │
│    • Share high-res images from Pinterest / Gallery                      │
│    • Share YouTube / podcast video links                                 │
│    • Share audio files directly into the voice transcription pipeline    │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. OFFLINE-FIRST SYNC ENGINE                                             │
│    • Captures are saved immediately to local on-device SQLite            │
│    • Background worker syncs to Cloudflare Workers & R2 upon network     │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technical Android Native Configuration

### 2.1 Native Intent Filters (`AndroidManifest.xml`)
```xml
<!-- System Text Selection Action -->
<activity android:name=".ProcessTextActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.PROCESS_TEXT" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
</activity>

<!-- Universal Share Target -->
<activity android:name=".ShareTargetActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="*/*" />
    </intent-filter>
</activity>
```

### 2.2 Direct Background Upload Worker
* When an item is shared, a lightweight native Android headless task generates a presigned URL request to Cloudflare Workers, uploads binary media to Cloudflare R2, and dispatches the ingestion event without opening the full UI.
