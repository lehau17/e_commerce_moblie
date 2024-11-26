// src/store/paymentMethodSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config";

// API URL for payment methods
const API_URL = 'payment-methods';

// Fetch all payment methods
export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchPaymentMethods',
  async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;  // Data from API
  }
);

// Fetch payment method by ID
export const fetchPaymentMethodById = createAsyncThunk(
  'paymentMethods/fetchPaymentMethodById',
  async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data.data;  // Data from API
  }
);

// Create a new payment method
export const createPaymentMethod = createAsyncThunk(
  'paymentMethods/createPaymentMethod',
  async (paymentMethod) => {
    const response = await axiosInstance.post(API_URL, paymentMethod);
    return response.data.data;  // Data from API
  }
);

// Update an existing payment method
export const updatePaymentMethod = createAsyncThunk(
  'paymentMethods/updatePaymentMethod',
  async ({ id, updatedPaymentMethod }) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedPaymentMethod);
    return response.data.data;  // Data from API
  }
);

// Delete a payment method
export const deletePaymentMethod = createAsyncThunk(
  'paymentMethods/deletePaymentMethod',
  async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
    return id;  // Return deleted payment method ID
  }
);

// Initial state
const initialState = {
  paymentMethods: [],  // List of payment methods
  paymentMethodDetail: {},  // Payment method detail by ID
  loading: false,  // Loading state
  error: null,  // Error state
};

// Slice for payment methods
const paymentMethodSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all payment methods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;  // Update payment methods list
        state.loading = false;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handle fetching payment method by ID
      .addCase(fetchPaymentMethodById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethodById.fulfilled, (state, action) => {
        state.paymentMethodDetail = action.payload;  // Update payment method detail
        state.loading = false;
      })
      .addCase(fetchPaymentMethodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle creating a new payment method
      .addCase(createPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods.push(action.payload);  // Add the new payment method
        state.loading = false;
      })
      .addCase(createPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle updating a payment method
      .addCase(updatePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const index = state.paymentMethods.findIndex((method) => method.id === action.payload.id);
        if (index !== -1) {
          state.paymentMethods[index] = action.payload;  // Update payment method
        }
        state.loading = false;
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle deleting a payment method
      .addCase(deletePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods = state.paymentMethods.filter((method) => method.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer to connect with the store
export default paymentMethodSlice.reducer;
