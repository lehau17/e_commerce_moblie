// store/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config"

// API URL
const API_URL = 'categories';

// Gọi API để lấy danh sách các category
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);

// Khởi tạo state mặc định
const initialState = {
  categories: [],    // Danh sách categories
  loading: false,    // Trạng thái loading
  error: null,       // Lỗi nếu có
};

// Tạo slice cho categories
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi đang gọi API
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi gọi API thành công
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      // Khi có lỗi trong quá trình gọi API
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Xuất slice reducer để kết nối với store
export default categorySlice.reducer;
