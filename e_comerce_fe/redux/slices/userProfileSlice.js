import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../cofig/axios.config';

const API_URL = "user";

// Thunk để lấy dữ liệu profile
export const getMyProfile = createAsyncThunk(
  'user/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/me`);
      return response.data.data; // Trả về data profile
    } catch (error) {
      // Trả về lỗi nếu có
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


// Thunk để lấy dữ liệu profile
export const updateMe = createAsyncThunk(
  'user/update/me',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`${API_URL}/update/me`,data );
      return response.data.data; // Trả về data profile
    } catch (error) {
      // Trả về lỗi nếu có
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);




// Slice quản lý trạng thái của user profile
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    data: {}, // Lưu dữ liệu profile
    loading: false, // Trạng thái đang tải
    error: null, // Thông báo lỗi (nếu có)
  },
  reducers: {
    resetProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi khi bắt đầu tải
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu profile
        state.error = null;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi nếu request thất bại
      })
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi khi bắt đầu tải
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu profile
        state.error = null;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi nếu request thất bại
      });
  },
});

// Xuất reducer để thêm vào store
export const { resetProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
