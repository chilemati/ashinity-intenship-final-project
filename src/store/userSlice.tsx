import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  otherinfo?: string;
}

interface UserState {
  section: string;
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Load persisted user & users from localStorage
const storedUser = localStorage.getItem("currentUser");
const storedUsers = localStorage.getItem("users");

const initialState: UserState = {
  section: "users",
  users: storedUsers ? JSON.parse(storedUsers) : [],
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  status: "idle",
  error: null,
};

// Async-like thunks (simulated with localStorage)
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (newUser: Omit<User, "id">, { getState, rejectWithValue }) => {
    const state = getState() as { users: UserState };

    const exists = state.users.users.find((u) => u.email === newUser.email);
    if (exists) return rejectWithValue("User already exists");

    const created: User = {
      id: Date.now().toString(),
      ...newUser,
    };

    const updatedUsers = [...state.users.users, created];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(created));

    return created;
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (
    {
      id,
      updates,
    }: { id: string; updates: Partial<User> },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as { users: UserState };
    const users = [...state.users.users];

    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return rejectWithValue("User not found");

    const updatedUser = { ...users[idx], ...updates };
    users[idx] = updatedUser;

    localStorage.setItem("users", JSON.stringify(users));

    const currentUser = state.users.currentUser;
    if (currentUser && currentUser.id === id) {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    return updatedUser;
  }
);


export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as { users: UserState };

    const user = state.users.users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return rejectWithValue("Invalid email or password");

    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  localStorage.removeItem("currentUser");
  return null;
});

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (
    { email, newPassword }: { email: string; newPassword: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as { users: UserState };
    const users = state.users.users;

    const idx = users.findIndex((u) => u.email === email);
    if (idx === -1) return rejectWithValue("User not found");

    const updatedUser = { ...users[idx], password: newPassword };
    const updatedUsers = [...users];
    updatedUsers[idx] = updatedUser;

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      if (parsed.email === email) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    }

    return updatedUser;
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = "idle";
      })
      // reset password
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<User>) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
  state.currentUser = action.payload;
  const idx = state.users.findIndex((u) => u.id === action.payload.id);
  if (idx !== -1) state.users[idx] = action.payload;
  state.status = "succeeded";
})
.addCase(updateUserProfile.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload as string;
});
  },
});

export default userSlice.reducer;
