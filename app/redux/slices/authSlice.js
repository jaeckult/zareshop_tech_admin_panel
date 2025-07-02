import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    // Simulate backend with data.json
    const res = await fetch('/data.json');
    const data = await res.json();
    const user = (data.users || []).find(u => u.username === username && u.password === password);
    if (user) {
      // In real app, you'd get a JWT here
      localStorage.setItem('session', JSON.stringify(user));
      return user;
    } else {
      return rejectWithValue('Invalid username or password');
    }
  }
);

// Load user from localStorage
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    const session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('session');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 