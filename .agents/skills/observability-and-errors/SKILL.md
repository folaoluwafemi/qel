---
name: observability-and-errors
description: Guidelines standardizing the filtering of HTTP errors into human-readable UI warnings alongside local custom logging techniques. Mandates Sentry.
---

# Observability, Tracking, and Errors

## 1. Sentry Enforced (No Firebase)
We strictly use **Sentry** for crash reporting and fatal error tracking across all platforms. 
**DO NOT** use, suggest, or install Firebase Crashlytics.

✅ **DO:**
```typescript
import * as Sentry from '@sentry/react-native';

try {
  await checkoutProcess();
} catch (e) {
  Sentry.captureException(e);
  // handle locally for UI
}
```

## 2. The Custom Exception Interceptor
Avoid spilling 500/400 generic server log errors cleanly into the user interface components. Catch exceptions dynamically resolving logic strings safely inside your `data` or `domain` layers natively before it reaches the UI.

✅ **DO Trickle friendly errors:**
```typescript
export function parseNetworkError(error: any): string {
  // If parsing a Supabase error
  if (error?.code === '23505') {
    return 'This email is already registered in our system.'; 
  }
  
  if (error?.message?.includes('Failed to fetch')) {
    return 'We cannot reach the servers right now. Please check your connection.';
  }
  
  // Generic fallback shielding raw technical issues
  return 'Something unexpected happened. We have tracked this bug securely.';
}

// Inside a UI Component
try {
  await repo.createProfile();
} catch (e) {
  setAuthMessage(parseNetworkError(e));
}
```

## 3. Local Logging Taxonomy
Ensure Sentry strictly triggers only on fatal errors natively to save quota. For local debug interactions, utilize explicit `[TAG]` formatting parsing directly to the standard console safely protecting console noise variables.

✅ **DO Log efficiently:**
```typescript
import { Logger } from '@/core/tools/Logger';

// Local parsing tracking explicitly targeting domains
Logger.info('BookingService', 'Processing payload block from local state.');
Logger.debug('DataSync', 'Flushing offline user telemetry to queue.');
Logger.error('AuthService', 'Failed to rotate token.', err);
```
