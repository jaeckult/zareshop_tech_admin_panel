import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsData = createAsyncThunk(
  'products/fetchProductsData',
  async () => {
    const res = await fetch('/data.json');
    const data = await res.json();
    return {
      categories: data.categories || [],
      products: data.products || [],
    };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.products = action.payload.products;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer; 