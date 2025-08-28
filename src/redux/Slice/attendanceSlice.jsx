import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Check-in
export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async ({ email, name }) => {
    const res = await axios.post("http://localhost:5000/api/attendance/checkin", {
      email,
      name,
    });
    return res.data;
  }
);

// Check-out
export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async ({ email }) => {
    const res = await axios.post("http://localhost:5000/api/attendance/checkout", {
      email,
    });
    return res.data;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    isCheckedIn: false,
    records: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.fulfilled, (state, action) => {
        state.isCheckedIn = true;
        state.records.push(action.payload);
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.isCheckedIn = false;
        const index = state.records.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.records[index] = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
