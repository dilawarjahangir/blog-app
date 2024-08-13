import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isBlogAvailable: false,
  blogs: null,
  loading: false,
  error: null,
};

export const loadBlogs = createAsyncThunk(
  "post/loadBlog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/post/getallposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "An error occurred");
      }

      const data = await response.json();
      return data.blogs;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBlogs.fulfilled, (state, action) => {
        state.isBlogAvailable = true;
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(loadBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.isBlogAvailable = false;
        state.loading = false;
      });
  },
});

export const { clearErrors } = blogSlice.actions;

export default blogSlice.reducer;
