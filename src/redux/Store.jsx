// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slice/authslice";
import passReducer from "../redux/Slice/passSlice";
import AttenReducer from "../redux/Slice/attendenceSlice";
import roleReducer from "../redux/Slice/roleSlice";
import holidayReducer from "../redux/Slice/holidaySlice";

export const store = configureStore({
  reducer: {
     auth: authReducer,
     pass: passReducer,
    attendance: AttenReducer,
    roles: roleReducer,
    holidays: holidayReducer,
  }, 
});

export default store;


