
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config";

// API URL
const API_URL = 'spu/my-shop';

// Gọi API để lấy sản phẩm của cửa hàng
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    const response = await axiosInstance.delete(`spu/${id}`);
    return response.data.data; // Trả về dữ liệu sản phẩm
  }
);

export const fetchMyProducts = createAsyncThunk(
  'products/fetchMyProducts',
  async () => {
    const response = await axiosInstance.get(API_URL);
    console.log(response.data)
    return response.data.data; // Trả về dữ liệu sản phẩm
  }
);

// Khởi tạo state mặc định
const initialState = {
  products: [],  // Danh sách sản phẩm của cửa hàng
  loading: false,  // Trạng thái loading
  error: null,  // Lỗi nếu có
};

const productManagerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchMyProducts
      .addCase(fetchMyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.products = action.payload; // Cập nhật danh sách sản phẩm
        state.loading = false;
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Cập nhật lỗi
      })
      // Xử lý deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.spu_id !== action.payload.id // Loại bỏ sản phẩm bị xóa
        );
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Cập nhật lỗi nếu có
      });
  },
});


// Xuất slice reducer để kết nối với store
export default productManagerSlice.reducer;
