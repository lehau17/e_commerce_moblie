// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlices';  // Import categorySlice reducer
import authReducer from './slices/authSlices';  // Import categorySlice reducer
import productReducer from './slices/productSlice';
import addressReducer from "./slices/shipping_addressesSlice" 
import cartReducer from "./slices/cartSlice" // Import categorySlice reducer
import shippingAddressReducer from './slices/shippingAddressSlice';
import userProfileReducer from './slices/userProfileSlice'; 
import paymentMethodsReducer from "./slices/paymentSlice"
import productManagerReducer from "./slices/productManager"
import orderReducer from "./slices/orderSlice"
import commentReducer from "./slices/commentSlice"
// Tạo store với các slice
const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    categories: categoryReducer,
    auth :authReducer,
    products: productReducer,
    addresses : addressReducer,
    order :  orderReducer,
    carts : cartReducer,
    shippingAddress: shippingAddressReducer,
    paymentMethods : paymentMethodsReducer,
    productManager : productManagerReducer,
    comments: commentReducer, // Kết nối category slice với store
  },
});

export default store;
