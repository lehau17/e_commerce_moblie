// redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../cofig/axios.config';

// URL của API
const API_URL = 'auth'; // Thay đổi URL theo API thực tế của bạn

// Async thunks cho login và register
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axiosInstance.post(`${API_URL}/login`, credentials);
  return response.data.data; // Lấy phần `data` chứa `accessToken` và `refreshToken`
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/register`, userData);
  return response.data.data; // Lấy phần `data` chứa `accessToken` và `refreshToken`
});

// Tạo slice cho auth
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken; // Lưu accessToken từ response.data
        state.refreshToken = action.payload.refreshToken; // Lưu refreshToken từ response.data
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken; // Lưu accessToken từ response.data
        state.refreshToken = action.payload.refreshToken; // Lưu refreshToken từ response.data
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
