## 🦆 What Is DUCK Architecture (Summary)

> DUCK Architecture organizes your app **by feature**, rather than by type (like reducers/components/actions).

Each feature folder contains:
- Its own **UI**, **Redux state**, **side effects**, and **data access**
- Promotes **encapsulation**, **modularity**, and **team autonomy**
- Keeps feature logic **close and discoverable**

It’s especially perfect for RN apps with Redux + async flows like thunks, sagas, or epics.

---

## 🧩 Example Folder Structure (DUCK + Redux in RN)

```plaintext
src/
├── app/
│   └── App.tsx                        # Composition root & Redux provider
│
├── navigation/
│   └── AppNavigator.tsx              # Central nav config
│
├── features/
│   ├── user/
│   │   ├── components/               # Feature-scoped UI (e.g. <UserCard />)
│   │   ├── userScreen.tsx           # Main screen
│   │   ├── userSlice.ts             # Redux slice (actions + reducer)
│   │   ├── userThunks.ts            # Async actions (e.g. fetchUser)
│   │   ├── userSelectors.ts         # Selectors for accessing user state
│   │   ├── userApi.ts               # API calls for this feature
│   │   ├── userMapper.ts            # DTO → domain model
│   │   ├── constants.ts             # Feature-specific strings/enums
│   │   └── index.ts                 # Re-export public APIs
│
│   ├── dashboard/
│   │   ├── components/
│   │   ├── dashboardScreen.tsx
│   │   ├── dashboardSlice.ts
│   │   ├── dashboardThunks.ts
│   │   ├── dashboardSelectors.ts
│   │   ├── dashboardApi.ts
│   │   ├── dashboardMapper.ts
│   │   ├── constants.ts
│   │   └── index.ts
│
├── shared/
│   ├── components/                  # Global UI components (e.g. <Button />, <Modal />)
│   ├── hooks/                       # Common hooks (e.g. useDebounce)
│   ├── utils/                       # Utility functions (e.g. formatDate)
│   ├── constants/                   # App-wide static values
│   ├── strings/                     # i18n/localized text
│   ├── theme/                       # Colors, typography, spacing
│   └── types/                       # Global interfaces and types

├── store/
│   ├── index.ts                     # Redux configureStore(), rootReducer, middleware
│   └── persist.ts                   # Optional: Redux Persist config
```

---

## 🚀 RN DUCK Flow in Action

```
[UI] userScreen.tsx
   ↓
[State] dispatch(fetchUserProfile)
   ↓
[Thunk] userThunks.ts → userApi.ts
   ↓
[Transform] userMapper.ts → domain model
   ↓
[State Update] userSlice.ts → Redux store
   ↓
[Selector] selectUserProfile → UI
```

This flow makes **Redux + domain + infra + UI feel like one cohesive unit** ✨

---

## 🧠 When to Use DUCK Architecture

| Ideal For                              | Because…                                    |
|----------------------------------------|---------------------------------------------|
| Feature-rich RN apps                   | Promotes modular ownership                  |
| Medium-to-large teams                  | Co-location reduces coordination overhead   |
| Apps with isolated feature logic       | Easy to test and reason about               |
| Apps using Redux (RTK / Thunk / Saga)  | State, actions, and logic stay tight-knit   |

