
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config";

// API URL
const API_URL = 'spu/my-shop';

// Gọi API để lấy sản phẩm của cửa hàng
export const fetchMyProducts = createAsyncThunk(
  'products/fetchMyProducts',
  async (userId) => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data; // Trả về dữ liệu sản phẩm
  }
);

// Khởi tạo state mặc định
const initialState = {
  products: [],  // Danh sách sản phẩm của cửa hàng
  loading: false,  // Trạng thái loading
  error: null,  // Lỗi nếu có
};

// Tạo slice cho sản phẩm
const productManagerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi đang gọi API
      .addCase(fetchMyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi gọi API thành công (Fetch my products)
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.products = action.payload; // Lưu sản phẩm vào state
        state.loading = false;
      })
      // Khi có lỗi trong quá trình gọi API (Fetch my products)
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Xuất slice reducer để kết nối với store
export default productManagerSlice.reducer;
