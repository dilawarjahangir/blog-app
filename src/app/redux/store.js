// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice"; // Ensure the path is correct
import blogReducer from "./Blogslicer"; // Consider renaming to blogReducer for consistency

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer, 
  },
});

export default store;
