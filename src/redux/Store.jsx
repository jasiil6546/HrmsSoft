// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slice/authslice";
import passReducer from "../redux/Slice/passSlice";
import AttenReducer from "../redux/Slice/attendenceSlice"

export const store = configureStore({
  reducer: {
     auth: authReducer,
     pass: passReducer,
     atten:AttenReducer,
  }, 
});

export default store;


