## 🧬 MVVM Overview

> MVVM is a **design pattern** that organizes your code into three key layers:
- **View**: UI components and screens
- **ViewModel**: Handles UI state, logic, and service orchestration
- **Model**: Represents domain data, DTOs, and business entities

🎯 Primary goal: **Decouple UI from business logic and state orchestration**

---

## 📦 Folder Structure Example (MVVM in React Native)

```plaintext
src/
├── screens/                       # Views (UI only)
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   └── ProfileScreen.tsx

├── viewModels/                   # Hooks managing logic + state
│   ├── useLoginViewModel.ts
│   ├── useDashboardViewModel.ts
│   └── useProfileViewModel.ts

├── models/                       # Domain entities & DTOs
│   ├── User.ts
│   ├── Listing.ts
│   └── Credentials.ts

├── services/                     # Infrastructure APIs or business services
│   ├── AuthService.ts
│   ├── ListingService.ts
│   └── UserService.ts

├── redux/                        # Optional: centralized state
│   ├── slices/
│   │   └── authSlice.ts
│   ├── thunks/
│   │   └── loginThunk.ts
│   └── selectors/

├── shared/                       # Reusable assets and logic
│   ├── components/               # UI building blocks
│   ├── hooks/                    # General-purpose hooks
│   ├── utils/                    # Formatters, validators
│   ├── constants/                # Global keys, enums
│   ├── styles/                   # Global styles, mixins
│   └── theme/                    # Colors, spacing, typography

├── navigation/                   # Routing layer
│   └── AppNavigator.tsx

├── store/                        # Redux store setup (optional)
│   └── index.ts

└── App.tsx                       # Composition root
```

---

## 🧠 MVVM as a Design Pattern

- Focused on **View–ViewModel–Model triad**
- Keeps UI pure (no logic or state mutators)
- ViewModel exposes props, commands, handlers
- Great for organizing **small to medium** screens with reusable hooks

---

## 🏗 MVVM Applied as Architectural Strategy

When used project-wide, MVVM evolves into a **soft architecture style**, especially when:

- You **standardize ViewModel usage** across features
- You **encapsulate side effects and async flows** inside hooks
- You optionally **bridge ViewModel to Redux or MobX** for shared state
- You align MVVM with **Clean Architecture or DDD layering** under-the-hood

🧩 It's common to wrap MVVM inside Clean layering or embed ViewModel inside a feature domain (like DUCK, DDA).

---

## 🔁 MVVM Flow Summary

```
[ View (Screen) ]
      ⬇ props, events
[ ViewModel (Hook) ]
      ⬇ state, commands
[ Model (Entities / Services) ]
```

If using Redux:
- ViewModel dispatches a thunk
- Thunk calls a use case or service
- Redux updates state → View re-renders

---

## ✅ When to Use MVVM

| Situation                              | MVVM Is Ideal                          |
|---------------------------------------|----------------------------------------|
| 📱 UI-heavy apps                       | ViewModel simplifies behavior tracking |
| 🧩 Component-driven presentation logic | Keeps screens lean and focused         |
| 🧪 Unit testing without UI rendering   | ViewModel is mockable and testable     |
| ⚙️ Apps with dynamic forms or flows     | Encapsulates logic + async flows       |
| 🔁 Replacing Redux with lightweight state | Zustand, MobX or local state patterns   |
| 🧼 Embedding inside Clean/DDA systems   | Aligns with layered systems elegantly   |

---

## 🧪 Bonus Insights

- ViewModels can dispatch Redux thunks or call injected use cases
- Services (like AuthService) should reside in `services/`, not inside ViewModel
- ViewModels stay **pure**—no direct API calls, ideally call through async actions
- MVVM is flexible and **plays well** with Redux, Zustand, MobX, or Clean Arch
