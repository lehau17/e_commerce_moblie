import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config"

// API URL for shipping addresses actions
const API_URL = 'shipping-addresses';

// Thunk to add a new shipping address
export const addShippingAddress = createAsyncThunk(
  'shippingAddresses/addShippingAddress',
  async (addressData) => {
    const response = await axiosInstance.post(API_URL, addressData);
    return response.data.data;
  }
);

// Thunk to remove a shipping address
export const removeShippingAddress = createAsyncThunk(
  'shippingAddresses/removeShippingAddress',
  async (addressId) => {
    await axiosInstance.delete(`${API_URL}/${addressId}`);
    return addressId;
  }
);

// Thunk to update a shipping address
export const updateShippingAddress = createAsyncThunk(
  'shippingAddresses/updateShippingAddress',
  async ({ addressId, updatedData }) => {
    const response = await axiosInstance.patch(`${API_URL}/${addressId}`, updatedData);
    return response.data.data;
  }
);


export const fetchMyAddresses = createAsyncThunk(
  'shippingAddresses/fetchMyAddresses',
  async () => {
    const response = await axiosInstance.get(`${API_URL}/me`);
    console.log("check response",response)
    return response.data.data;  // Adjust based on your API response structure
  }
);

// Thunk to fetch all shipping addresses
export const fetchShippingAddresses = createAsyncThunk(
  'shippingAddresses/fetchShippingAddresses',
  async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;
  }
);




// Initial state for shipping addresses
const initialState = {
  addresses: [],         // List of shipping addresses
  loading: false,        // Loading state
  error: null,           // Error state
};

const shippingAddressesSlice = createSlice({
  name: 'shippingAddresses',
  initialState,
  reducers: {
    // Optional action to clear addresses
    clearAddresses: (state) => {
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add a shipping address
      .addCase(addShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload); // Add the new address to the list
        state.loading = false;
      })
      .addCase(addShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove a shipping address
      .addCase(removeShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeShippingAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        ); // Remove the address by id
        state.loading = false;
      })
      .addCase(removeShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update a shipping address
      .addCase(updateShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload; // Update the address in the list
        }
        state.loading = false;
      })
      .addCase(updateShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch all shipping addresses
      .addCase(fetchShippingAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload; // Populate the addresses with fetched data
        state.loading = false;
      })
      .addCase(fetchShippingAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(fetchMyAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the clear action
export const { clearAddresses } = shippingAddressesSlice.actions;

// Export the reducer
export default shippingAddressesSlice.reducer;

