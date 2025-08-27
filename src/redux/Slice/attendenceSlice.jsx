// src/redux/Slice/attendenceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/attendance";

export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/checkin`, { user_id });
      return data; // { message, checkInTime }
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error checking in");
    }
  }
);

export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/checkout`, { user_id });
      return data; // { message, sessionMinutes, totalMinutesToday }
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error checking out");
    }
  }
);

export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/status/${user_id}`);
      return data; // { checkedIn, lastCheckInTime, totalMinutesToday }
    } catch (err) {
      return rejectWithValue("Error fetching attendance");
    }
  }
);

const attendenceSlice = createSlice({
  name: "attendance",
  initialState: {
    checkedIn: false,
    lastCheckInTime: null,     // ISO string from server
    totalMinutesToday: 0,      // accumulated minutes from finished sessions
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
      // Check In
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.checkedIn = true;
        state.lastCheckInTime = action.payload.checkInTime; // server time
        state.message = action.payload.message || "Checked in";
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Out
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.checkedIn = false;
        state.lastCheckInTime = null;
        // server returns updated daily total; prefer that
        if (typeof action.payload.totalMinutesToday === "number") {
          state.totalMinutesToday = action.payload.totalMinutesToday;
        }
        state.message = action.payload.message || "Checked out";
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch status (on refresh / mount)
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.checkedIn = action.payload.checkedIn;
        state.lastCheckInTime = action.payload.lastCheckInTime || null;
        state.totalMinutesToday = action.payload.totalMinutesToday || 0;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = attendenceSlice.actions;
export default attendenceSlice.reducer;
