// src/axios.js

import axios from 'axios';
import { navigate } from './navigationRef';  // Giả sử bạn đã setup navigationRef
import AsyncStorage from '@react-native-async-storage/async-storage';  // Nếu bạn dùng AsyncStorage

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Lấy accessToken từ AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    // Kiểm tra nếu request không phải là login hoặc register, thì thêm accessToken vào header
    if (config.url && !config.url.includes('login') && !config.url.includes('register') && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;  // Thêm accessToken vào header Authorization
    }

    // Log request URL để kiểm tra
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    // Kiểm tra nếu response là từ login hoặc register
    if (response.config.url.includes('login') || response.config.url.includes('register')) {
      // Nếu thành công, lưu accessToken và refreshToken
      if (response.data && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;

        // Lưu tokens vào AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        navigate('Home');
      } else {
        // Nếu không có token trong response
        console.log('Error: Missing tokens in response');
        navigate('Login');
      }
    }
    return response;
  },
  (error) => {
    // Handle lỗi nếu có, như Unauthorized hoặc các lỗi khác
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - Redirecting to login');
      navigate('Login');  // Điều hướng đến trang Login nếu Unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
