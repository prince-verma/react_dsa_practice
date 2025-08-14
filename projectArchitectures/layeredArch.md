## 🧰 Layered Architecture Flow Template: User Profile Feature

### 🎯 **Use Case**  
Fetch and render user profile data using a layered approach with Redux and domain-use-case orchestration.

---

### 🧭 **Architecture Layers & Flow**

```
📁 presentation/
    └── screens/UserProfileScreen.tsx
        └── uses → useUserProfile() hook
            └── calls → initFetchUserDetails() [domain/usecase]

📁 domain/
    └── usecases/initFetchUserDetails.ts
        └── dispatches → fetchUserDetails() (Redux thunk)
    └── services/IUserProfileService.ts (interface)
    └── models/User.ts (domain entity)

📁 data/
    └── redux/userSlice.ts
        ├── fetchUserDetails (asyncThunk)
        ├── reducers (handle loading, success, error)
        └── selectors (selectUserProfile, selectStatus)
    └── repositories/UserProfileServiceImpl.ts
        └── implements IUserProfileService
    └── datasources/userApi.ts (raw API call)
    └── mappers/userMapper.ts (transform API → domain model)
```

---

### 🧠 **Flow Description**

1. **UI Screen** → uses `useUserProfile()` hook to trigger loading.
2. **Custom Hook** → calls `initFetchUserDetails()` from domain layer.
3. **Domain Use Case** → dispatches `fetchUserDetails()` Redux async thunk.
4. **Redux Thunk** (in data layer):
   - Sets `status = loading`
   - Instantiates `UserProfileServiceImpl` (repository)
   - Calls `getUserProfile()` from data source
   - Maps raw response to domain `User` entity
   - Returns data and dispatches to reducer
5. **Reducer** → stores user data and updates loading state.
6. **Selector** → used inside hook/UI to read state and render profile.

---

### 🧾 **Benefits**
- ✅ Clean separation of responsibilities across layers
- ✅ Pure business logic in domain (no Redux or API leakage)
- ✅ Easily testable at each layer (unit, integration, UI)
- ✅ Composable and extensible for other user-related operations

---

### 📌 Example Key Files

| Layer         | File                             | Responsibility                               |
|---------------|----------------------------------|----------------------------------------------|
| Presentation  | `useUserProfile.ts`              | Wraps selector + use case trigger            |
| Domain        | `initFetchUserDetails.ts`        | Orchestrates async call                      |
| Domain        | `IUserProfileService.ts`         | Contract to abstract implementation          |
| Data          | `fetchUserDetails.ts` (thunk)    | Handles async logic + Redux updates          |
| Data          | `UserProfileServiceImpl.ts`      | Implements domain contract                   |
| Data          | `userApi.ts`                     | Axios/Fetch raw call                         |
| Data          | `userMapper.ts`                  | Shapes response into domain model            |


### folder structure
```src/
├── presentation/         ← screens, components, hooks
├── domain/               ← models, interfaces, utils, constants
├── data/                 ← api, repositories, mappers
```
