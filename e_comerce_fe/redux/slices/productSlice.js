// src/store/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config";

// API URL
const API_URL = 'spu';
const TOP_RECOMMENDED_URL = 'spu/top';
const PRODUCT_BY_CATE_URL = 'spu/cate/';//+id


export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const response = await axiosInstance.get(`${PRODUCT_BY_CATE_URL}${categoryId}`);
    return response.data.data;  // Response from API
  }
);

// Gọi API để lấy chi tiết sản phẩm theo ID
export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (id) => {
    const response = await axiosInstance.get(`spu/${id}/detail`);
    console.log("check response",response)
    return response.data.data;  // Dữ liệu trả về từ API
  }
);



// Gọi API để lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);

// Gọi API để tạo mới sản phẩm
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    const response = await axiosInstance.post(API_URL, product);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);


export const createSku = createAsyncThunk(
  'products/createsku',
  async (data) => {
    const response = await axiosInstance.post(API_URL+"/sku", data);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);

// Gọi API để cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedProduct }) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedProduct);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);

// Gọi API để xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
    return id;  // Trả về ID của sản phẩm đã xóa
  }
);

// Gọi API để lấy top sản phẩm được recommend
export const fetchTopRecommendedProducts = createAsyncThunk(
  'products/fetchTopRecommendedProducts',
  async () => {
    const response = await axiosInstance.get(TOP_RECOMMENDED_URL);
    return response.data.data;  // Dữ liệu trả về từ API
  }
);




// Khởi tạo state mặc định
const initialState = {
  products: [],  // Danh sách sản phẩm
  topRecommended: [],  // Danh sách sản phẩm recommend
  productByCate : [],
  productDetail : [],
  loading: false,  // Trạng thái loading
  error: null,  
};

// Tạo slice cho sản phẩm
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi đang gọi API
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi gọi API thành công (Fetch products)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); 
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Khi đang gọi API để lấy top sản phẩm recommend
      .addCase(fetchTopRecommendedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi gọi API thành công (Top Recommended Products)
      .addCase(fetchTopRecommendedProducts.fulfilled, (state, action) => {
        state.topRecommended = action.payload;  // Cập nhật danh sách recommend
        state.loading = false;
      })
      // Khi có lỗi trong quá trình gọi API (Top Recommended Products)
      .addCase(fetchTopRecommendedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productByCate = action.payload;  // Update productByCate
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload; // Lưu dữ liệu chi tiết sản phẩm vào state
        state.loading = false;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
            .addCase(createSku.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSku.fulfilled, (state, action) => {
        state.productDetail = action.payload; // Lưu dữ liệu chi tiết sản phẩm vào state
        state.loading = false;
      })
      .addCase(createSku.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// Xuất slice reducer để kết nối với store
export default productSlice.reducer;
