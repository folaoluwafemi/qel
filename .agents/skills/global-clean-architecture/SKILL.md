---
name: global-clean-architecture
description: Enforces the Lean Clean Architecture folder structure, Singletons for DI, pnpm package management, and strict zero-waste coding conventions for Qel.
---

# Global Clean Architecture Rules

You must strictly adhere to the Qel SDD (Spec-Driven Development) standards. Our core philosophy is keeping things lean, minimizing abstraction bloat, and utilizing zero-waste code techniques. 

## 1. Feature-First Layer-Second
Group modules strictly by feature first, and architectural layers second. 

The purpose of this approach is to keep context tightly localized to the feature it belongs to, reducing cognitive load and preventing a tangled global "monolith" of generic models or screens. 

Each feature must follow this strict sub-layered architecture:

### presentation/
This layer contains what the user sees and interacts with.
- **screens/**: The top-level screen containers (pages) for this feature.
- **store/**: The business logic for the feature. This pipes data to and from the data layer and maintains the feature's state. It is strictly separate from pure UI logic.
- **hooks/**: The UI logic (e.g., animation states, layout handlers, UI-specific lifecycle).
- **components/**: Feature-specific UI components (generic/reusable components belong in `src/core/design_system`).
- **ui_models/**: Custom data models needed specifically to pass things around the UI (e.g., enums, view state interfaces, localized JSON shapes) that don't belong in the core domain entity.

### data/
This layer acts as the bridge between the external world (network/DB) and the application.
- **services/**: These services make calls to the core APIs (which are abstracted by the infrastructural classes in `core/{name_infra}`). They handle the actual data fetching and mutation.
- **data_models/**: (Optional) Used if necessary to communicate between services and infrastructure (e.g., DTOs, network request/response shapes). These are explicitly different from domain entities.

### domain/
This layer contains the core business rules and product direction.
- **entities/**: These model the core data that reflects the top contour product direction (e.g., `User`, `Pet`, `PetOwner`, `ServiceProvider`). Entities represent pure business rules and data shapes that are used across the current feature or elsewhere in the application.

❌ **DO NOT Structure like this:**
```text
src/
  models/       (Do not mix booking models with pet models)
  screens/      (Do not dump all screens globally)
  controllers/
```

## 2. Dependency Injection
Rely strictly on a Service Locator (Singleton resolution) for domain/data dependencies. Do not use complex DI container libraries. 
React Context is exclusively for pure UI state/theme dependencies, not for business logic services.

✅ **DO Inject like this:**
```typescript
import { locator } from '@/core/locator';

// Data/Domain dependencies resolve implicitly via singleton
const bookingService = locator.get('BookingService');

// Perform action
await bookingService.process();
```

## 3. Secrets & Environment Variables
**NEVER** hardcode sensitive information such as API keys, Supabase URLs, publishable keys, or environment-specific tokens directly in the codebase as fallbacks.
All secrets must strictly be consumed from `.env` files via `process.env.EXPO_PUBLIC_*`. Fail loudly if the secrets are undefined instead of falling back to development defaults.

✅ **DO:**
```typescript
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
if (!url) throw new Error("Missing Supabase URL in .env");
```

## 4. Git Conventions & Zero-Waste Code
- **Never generate unnecessary block comments** or docstrings that just repeat the code. Trust function and variable naming.
- **Never leave console.log debugging.** Use the defined Logger utility.
- **Commit using semantic prefixes.**

✅ **DO:**
```bash
git commit -m "feat: implement booking repository layer"
git commit -m "chore: update pnpm configurations"
git commit -m "refactor: simplify useShallow mapping in booking"
```
