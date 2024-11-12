import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../cofig/axios.config";

// API URL for Cart actions (adjust according to your backend routes)
const API_URL = 'cart-items';

// Thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem) => {
    const response = await axiosInstance.post(API_URL, cartItem);
    return response.data.data;  // Return the added cart item
  }
);


export const getMyCart = createAsyncThunk(
  'cart/me',
  async () => {
    const response = await axiosInstance.get(`carts/me`);
    return response.data.data;  // Return the added cart item
  }
);

// Thunk to remove an item from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartItemId) => {
    await axiosInstance.delete(`${API_URL}/${cartItemId}`);
    return cartItemId;  // Return the ID of the removed item
  }
);

// Thunk to update a cart item (e.g., changing quantity)
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }) => {
    const response = await axiosInstance.put(`${API_URL}/${cartItemId}`, { quantity });
    return response.data.data;  // Return updated cart item
  }
);

// Thunk to fetch all cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;  // Return list of cart items
  }
);

// Initial state for the cart
const initialState = {
  cartItems: [],  // List of items in the cart
  loading: false,  // Loading state
  error: null,  // Error state
};

// Create the slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to clear the cart (optional)
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add item to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove item from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        ); // Remove the item by id
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update cart item (e.g., change quantity)
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload; // Update the item in the cart
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch all cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Populate the cart with fetched items
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMyCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Populate the cart with fetched items
        state.loading = false;
      })
      .addCase(getMyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions (e.g., clear cart)
export const { clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
