// redux/slices/shippingAddressSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../cofig/axios.config';

// URL của API
const API_URL = 'shipping-addresses';

// Async thunk để lấy địa chỉ của người dùng
export const getMyAddress = createAsyncThunk('shippingAddress/getMyAddress', async () => {
  const response = await axiosInstance.get(`${API_URL}/me`);
  return response.data.data; // Trả về dữ liệu từ API
});

// Tạo slice cho shipping address
const shippingAddressSlice = createSlice({
  name: 'shippingAddress',
  initialState: {
    data: [], // Chứa thông tin địa chỉ shipping
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer để xóa dữ liệu địa chỉ nếu cần
    clearAddress: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu địa chỉ vào state
      })
      .addCase(getMyAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAddress } = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
