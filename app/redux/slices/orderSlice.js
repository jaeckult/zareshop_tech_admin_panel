import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch order details');
    const order = await res.json();
    return order || null;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer; 