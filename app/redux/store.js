import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import dashboardReducer from './slices/dashboardSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
  reducer: {
    order: orderReducer,
    dashboard: dashboardReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store; 