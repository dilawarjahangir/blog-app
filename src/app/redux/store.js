// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice" // Ensure the path is correct

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
