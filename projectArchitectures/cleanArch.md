## 🧰 Feature: `UserProfile` — Clean Architecture Flow

We're modeling this:

```
[ UI Screen ] → [ Presentation Hook ] → [ Use Case ] → [ Domain Contract ]
→ [ Infra Service Impl ] → [ API Layer ] → [ Mapper ] → [ Redux Update ]
```

---

### 📁 `domain/models/User.ts`  
```ts
export interface User {
  id: string;
  name: string;
  membershipLevel: 'Free' | 'Premium';
  membershipExpires: number;
}
```

---

### 📁 `domain/services/IUserService.ts`  
```ts
import { User } from '../models/User';

export interface IUserService {
  getUserProfile(): Promise<User>;
}
```

---

### 📁 `application/user/getUserProfile.ts`  
```ts
import { IUserService } from '../../domain/services/IUserService';
import { User } from '../../domain/models/User';

export const getUserProfile = async (userService: IUserService): Promise<User> => {
  const user = await userService.getUserProfile();

  // Domain rule example
  if (user.membershipExpires < Date.now()) {
    user.membershipLevel = 'Free';
  }

  return user;
};
```

---

### 📁 `infrastructure/user/userApi.ts`  
```ts
import axios from 'axios';

export const fetchUserFromApi = async () => {
  const response = await axios.get('/api/user/profile');
  return response.data;
};
```

---

### 📁 `infrastructure/user/userMapper.ts`  
```ts
import { User } from '../../domain/models/User';

export const mapApiToUser = (data: any): User => ({
  id: data._id,
  name: data.fullName,
  membershipLevel: data.plan || 'Free',
  membershipExpires: new Date(data.expiresAt).getTime(),
});
```

---

### 📁 `infrastructure/user/UserServiceImpl.ts`  
```ts
import { IUserService } from '../../domain/services/IUserService';
import { fetchUserFromApi } from './userApi';
import { mapApiToUser } from './userMapper';
import { User } from '../../domain/models/User';

export class UserServiceImpl implements IUserService {
  async getUserProfile(): Promise<User> {
    const rawData = await fetchUserFromApi();
    return mapApiToUser(rawData);
  }
}
```

---

### 📁 `presentation/userProfile/userSlice.ts`

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../domain/models/User';
import { getUserProfile } from '../../../application/user/getUserProfile';
import { UserServiceImpl } from '../../../infrastructure/user/UserServiceImpl';

type State = {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: State = {
  user: null,
  status: 'idle',
};

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
  const service = new UserServiceImpl(); // DI container could inject this
  return await getUserProfile(service);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.status = 'failed';
      }),
});

export default userSlice.reducer;

export const selectUser = (state: { user: State }) => state.user.user;
export const selectUserStatus = (state: { user: State }) => state.user.status;
```

---

### 📁 `presentation/userProfile/useUserProfile.ts`  
```ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUser, selectUserStatus } from './userSlice';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  return { user, loading: status === 'loading' };
};
```

---

## ✅ Summary of Architectural Integrity

| Layer       | Responsibility                                      |
|-------------|------------------------------------------------------|
| **Domain**  | User entity, IUserService contract                  |
| **App Logic** | `getUserProfile` use case                         |
| **Infra**   | Service implementation, API, and mapper             |
| **Presentation** | Hook, Redux state adapter, UI screen           |

- Presentation never reaches API directly 🔒
- Domain doesn’t know about Redux or Axios ☁️
- Everything is testable and swappable ✅
- 