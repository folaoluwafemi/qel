---
name: api-and-data-contracts
description: Strict guidelines for Supabase networking, cursor-based pagination, and handling offline-sync conflicts via the CASE framework.
---

# API, Pagination & Offline Protocols

## 1. Supabase Strict Usage
All remote backend interactions MUST go through `@supabase/supabase-js`. 
Do NOT write raw `fetch` calls or use `axios` for standard database/auth operations. Let the Supabase client manage headers and tokens.

✅ **DO:**
```typescript
const { data, error } = await supabase.from('profiles').select('*').eq('id', userId);
```

## 2. Cursor-Based Pagination
Never use traditional Offset/Limit pagination (`.range()`) in endless scroll tables or feeds. It fails when elements push downward in real-time. Use cursor-based extraction referencing explicit primary keys or standardized timestamps.

✅ **DO Paginate like this:**
```typescript
// Fetching the next page reliant on the last ID seen
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .lt('id', lastCursorId) // Cursor boundary
  .order('id', { ascending: false })
  .limit(20);
```

## 3. Offline Sync Mutations (CASE Framework)
When a user attempts to mutate/modify an existing data array with no verified Internet Connection, do not attempt complex "Last-Write-Wins" state merging. Safely block the edit. Queueing is purely utilized for *new inserts* or *tracking requests*.

✅ **DO Block Conflicting Offline Mutations:**
```typescript
async function updateMedicalRecord(recordId: string, payload: any) {
  if (!networkState.isConnected) {
    // Immediately block the conflicting mutate action
    throw new Error('Requires internet connection to update this record.');
  }
  
  return await updateRecordInSupabase(recordId, payload);
}
```

## 4. Local Auth Lifecycles
Never write bespoke local token cycling. Trust Supabase sessions. Allow persistence engines natively configured in the Supabase constructor (like mmkv) to decay valid offline tokens.

## 5. Media & File Storage (Cloudflare R2)
All media, images, and file uploads/deletions MUST go through the Cloudflare R2 infrastructure service. Do NOT write raw `fetch` calls or set up custom AWS SDK S3 clients in feature-level code.

✅ **DO use the Singleton `r2Storage`:**
```typescript
import { r2Storage } from '@/core/r2_infra';

// Uploading a local file from the device
const result = await r2Storage.uploadFile(localFileUri, {
  storagePath: 'profile_pic.jpg',
  folder: 'avatars', // Will place it in 'avatars/profile_pic.jpg'
});
```
