import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const res = await fetch('/data.json');
    const data = await res.json();
    const orders = data.orders || [];
    const totalOrders = orders.length;
    const activeOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const returnOrders = orders.filter(o => o.status === 'Canceled').length;
    return { totalOrders, activeOrders, completedOrders, returnOrders };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalOrders: 0,
      activeOrders: 0,
      completedOrders: 0,
      returnOrders: 0
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer; 