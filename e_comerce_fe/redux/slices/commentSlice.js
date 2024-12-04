import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../cofig/axios.config";

// Thunk để lấy danh sách bình luận theo SPU ID
export const fetchCommentsBySpuId = createAsyncThunk(
  'comments/fetchCommentsBySpuId',
  async (spuId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`comments/${spuId}/spu`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Thunk để tạo bình luận mới
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ spuId, commentText }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`comments`, {
        spu_id: spuId,
        comment_text: commentText,
      });
      return response.data.data; // Trả về bình luận vừa tạo
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create comment');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Khi bắt đầu fetch
      .addCase(fetchCommentsBySpuId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsBySpuId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsBySpuId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch comments';
      })

      // Khi bắt đầu tạo bình luận
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [action.payload, ...state.comments]; // Thêm bình luận mới vào danh sách
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create comment';
      });
  },
});

export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
