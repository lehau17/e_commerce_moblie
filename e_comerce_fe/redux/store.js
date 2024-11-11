// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlices';  // Import categorySlice reducer
import authReducer from './slices/authSlices';  // Import categorySlice reducer
import productReducer from './slices/productSlice';  // Import categorySlice reducer

// Tạo store với các slice
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth :authReducer,
    products: productReducer,  // Kết nối category slice với store
  },
});

export default store;
