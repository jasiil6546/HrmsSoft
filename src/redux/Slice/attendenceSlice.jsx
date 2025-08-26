import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Check-in
export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/attendance/checkin", { user_id });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error checking in");
    }
  }
);

// Check-out
export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/attendance/checkout", { user_id });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error checking out");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    checkedIn: false,
    checkInTime: null,
    checkOutTime: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check-in
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.checkedIn = true;
        state.checkInTime = new Date().toLocaleTimeString();
        state.checkOutTime = null;
        state.message = action.payload.message;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check-out
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.checkedIn = false;
        state.checkOutTime = new Date().toLocaleTimeString();
        state.message = action.payload.message;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = attendanceSlice.actions;
export default attendanceSlice.reducer;
