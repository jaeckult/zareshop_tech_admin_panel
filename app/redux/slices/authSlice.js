import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ phone_number, password }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number, password })
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }
      const user = await res.json();
      if (user.token) {
        localStorage.setItem('token', user.token);
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load user from localStorage
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    const token = localStorage.getItem('token');
    if (token) {
      return { token };
    }
    return null;
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/users/admin/stats', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const stats = await res.json();
    // Map backend keys to frontend keys
    return {
      totalOrders: stats.orders,
      activeOrders: 0, // or whatever logic you want
      completedOrders: 0,
      returnOrders: 0,
      users: stats.users,
      products: stats.products,
      categories: stats.categories,
    };
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/orders', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const result = await res.json();
    return result.data || [];
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    token: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('session');
      localStorage.removeItem('token');
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
        if (action.payload && action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload && action.payload.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.token = null;
          state.isAuthenticated = false;
        }
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 