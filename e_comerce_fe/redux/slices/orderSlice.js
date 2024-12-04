import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../cofig/axios.config";

// API URL
const API_URL = "order";

// Async Thunk để thêm đơn hàng
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL, orderData);
      return response.data.data; // Trả về dữ liệu đơn hàng sau khi thêm thành công
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Xử lý lỗi
    }
  }
);


export const changeStateOrder = createAsyncThunk(
  "orders/changeStateOrder",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${API_URL}/${orderId}/change-status`,
        { status }
      );
      return response.data.data; // Trả về dữ liệu đơn hàng sau khi thay đổi trạng thái
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Xử lý lỗi
    }
  }
);


// Async Thunk để lấy danh sách đơn hàng của tôi
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/me`);
      return response.data.data; // Trả về danh sách đơn hàng
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Xử lý lỗi
    }
  }
);




// Async Thunk để lấy danh sách đơn hàng của tôi
export const getAllOrder = createAsyncThunk(
  "orders/fetchFullOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}`);
      return response.data.data; // Trả về danh sách đơn hàng
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Xử lý lỗi
    }
  }
);




export const fetchMyFoodOrders = createAsyncThunk(
  "orders/fetchMyFoodOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/my-food-order`);
      console.log(response)
      return response.data.data; // Trả về danh sách đơn hàng
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Xử lý lỗi
    }
  }
);




const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Danh sách các đơn hàng
    myFoodOrderd : [],
    fullOrder : [],
    loading: false, // Trạng thái loading
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thêm đơn hàng
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload); // Thêm đơn hàng mới vào danh sách
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Cập nhật lỗi
      })

      // Lấy danh sách đơn hàng của tôi
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload; // Cập nhật danh sách đơn hàng
        state.loading = false;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Cập nhật lỗi
      })
      .addCase(fetchMyFoodOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyFoodOrders.fulfilled, (state, action) => {
        state.myFoodOrderd = action.payload; // Cập nhật danh sách đơn hàng
        state.loading = false;
      })
      .addCase(fetchMyFoodOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Cập nhật lỗi
      })
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.fullOrder = action.payload; // Cập nhật danh sách đơn hàng
        state.loading = false;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Cập nhật lỗi
      })
       .addCase(changeStateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeStateOrder.fulfilled, (state, action) => {
        // Cập nhật trạng thái đơn hàng sau khi thay đổi
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
        state.loading = false;
      })
      .addCase(changeStateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;