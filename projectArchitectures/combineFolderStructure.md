
## 🧱 High-Level Folder Structure: DDA + Clean Architecture for React Native

```plaintext
src/
├── demand/                             # Feature Domain: Demand POD
│   ├── presentation/                   # RN Screens & feature-specific UI
│   │   ├── screens/
│   │   ├── components/
│   │   ├── redux/
│   │   │   ├── slice.ts
│   │   │   ├── selectors.ts
│   │   │   └── thunks.ts               # Inject use cases here
│   │   └── assets/                     # Images, lotties, icons (local to domain)
│   ├── application/                    # Use case orchestration
│   │   └── useCases/
│   ├── domain/                         # Business rules
│   │   ├── entities/
│   │   ├── valueObjects/
│   │   ├── services/                   # Domain interfaces like IDemandRepo
│   │   └── types/
│   └── infrastructure/                # External implementations
│       ├── repositories/              # ApiDemandRepository implements IDemandRepo
│       ├── mappers/                   # DTO ↔ domain transformation
│       └── analytics/                 # MoEngage, Firebase hooks (if scoped locally)
│
├── edge/
│   └── ... same layered breakdown
├── seller/
│   └── ... same layered breakdown

├── common/                             # Shared domain modules
│   ├── domain/
│   │   ├── entities/                   # User.ts, Location.ts
│   │   ├── valueObjects/
│   │   ├── services/                   # AuthService, LocationService
│   │   └── types/
│   ├── application/
│   │   └── useCases/
│   └── infrastructure/
│       ├── repositories/
│       └── mappers/

├── shared/                             # Cross-domain reusable layer
│   ├── ui/                             # Global atomic design system
│   │   ├── atoms/                      # Button, Text, Icon
│   │   ├── molecules/                  # SearchBar, FormField
│   │   ├── organisms/                  # Header, ListItem
│   │   ├── templates/                  # Layout skeletons
│   │   └── pages/                      # Global full screens
│   ├── hooks/                          # useDebounce, useAuthListener
│   ├── utils/                          # formatCurrency, deepMerge
│   ├── constants/                      # Status codes, keys
│   ├── strings/                        # i18n files or copy blocks
│   ├── styles/                         # Global spacing, typography, mixins
│   └── theme/                          # Colors, dark/light mode tokens

├── navigation/
│   ├── AppNavigator.tsx                # Entry point for stack/tab navigation
│   ├── linkingConfig.ts               # Deep linking setup
│   └── routeTypes.ts                  # Typed route declarations

├── store/                              # Global Redux setup
│   ├── index.ts                        # combineReducers + configureStore()
│   ├── injectDependencies.ts          # Injection function for DI containers
│   ├── dependencies.ts                # Instantiation & binding of useCases + infra
│   └── persist.ts                     # Redux persist config (if any)

├── services/                           # Global cross-domain tools
│   ├── analytics/
│   │   └── Firebase.ts
│   │   └── MoEngage.ts
│   │   └── Branch.ts
│   └── notifications/
│       └── PushService.ts

├── assets/                             # App-wide media
│   ├── fonts/
│   ├── images/
│   ├── lottie/
│   └── domainAssets/                  # e.g. edge/images, seller/icons

└── App.tsx                             # Bootstrapping: Provider, DI, Store
```

---

## 🔁 ✅ Dependency Injection Flow

### Step-by-step wiring:

```plaintext
[store/dependencies.ts]           # Instantiate all use cases and infra services

const demandRepo = new ApiDemandRepository(apiClient);
const getMatchedListings = new GetMatchedListingsUseCase(demandRepo);

export const dependencies = {
  useCases: {
    demand: {
      getMatchedListings,
    },
    edge: { ... },
  },
  analytics: {
    firebase: new FirebaseService(),
    moEngage: new MoEngageService(),
  }
};
```

```ts
// store/injectDependencies.ts
export function injectDependencies(thunkAPI) {
  return {
    ...dependencies,
    dispatch: thunkAPI.dispatch,
    getState: thunkAPI.getState
  };
}
```

```ts
// demand/presentation/redux/demandThunks.ts
export const fetchMatchedListings = createAsyncThunk(
  'demand/fetchListings',
  async (payload, thunkAPI) => {
    const deps = injectDependencies(thunkAPI);
    return await deps.useCases.demand.getMatchedListings.execute(payload);
  }
);
```

💡 *Thunks call use cases, use cases call domain interfaces, which are implemented by infrastructure services—clean, testable, and perfectly scoped.*

---

## 🔍 Where Everything Lives

| Resource Type                      | Location                                      |
|------------------------------------|-----------------------------------------------|
| Domain logic (entities/interfaces) | `domain/` inside each bounded context         |
| Use Cases                          | `application/useCases/` per domain            |
| Async state (Redux)                | `presentation/redux/` inside each domain      |
| API/Repo implementations           | `infrastructure/repositories/` per domain     |
| Shared UI components (Atomic)      | `shared/ui/`                                  |
| Common services (analytics, push)  | `services/`                                   |
| Global styles & colors             | `shared/styles/`, `shared/theme/`             |
| Navigation configuration           | `navigation/`                                 |
| App bootstrapping                  | `App.tsx`                                     |
| Fonts, images, animations          | `assets/` + optional per-domain subfolder     |

