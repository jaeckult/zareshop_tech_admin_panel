import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsData = createAsyncThunk(
  'products/fetchProductsData',
  async () => {
    const token = localStorage.getItem('token');
    // Fetch products
    const productsRes = await fetch('http://localhost:3000/api/products', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!productsRes.ok) throw new Error('Failed to fetch products');
    const productsResult = await productsRes.json();
    // Fetch categories
    const categoriesRes = await fetch('http://localhost:3000/api/categories', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
    const categoriesResult = await categoriesRes.json();
    return {
      categories: categoriesResult.data || [],
      products: productsResult.data || [],
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
    lastFetched: null,
  },
  reducers: {
    clearProductsCache: (state) => {
      state.categories = [];
      state.products = [];
      state.lastFetched = null;
    },
  },
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
        state.lastFetched = Date.now();
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProductsCache } = productsSlice.actions;
export default productsSlice.reducer; 