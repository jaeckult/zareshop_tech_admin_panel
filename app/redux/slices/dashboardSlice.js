import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/users/admin/stats', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const result = await res.json();
    return result.data || {};
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {},
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearDashboardCache: (state) => {
      state.stats = {};
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearDashboardCache } = dashboardSlice.actions;
export default dashboardSlice.reducer; 