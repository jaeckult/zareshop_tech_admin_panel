import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId) => {
    const res = await fetch('/data.json');
    const data = await res.json();
    return data.orderDetails?.[`#${orderId}`] || null;
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