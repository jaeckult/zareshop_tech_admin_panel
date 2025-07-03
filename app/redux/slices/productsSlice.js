import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsData = createAsyncThunk(
  'products/fetchProductsData',
  async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/products', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    // If categories are not provided by backend, set as empty array
    return {
      categories: [],
      products: products || [],
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