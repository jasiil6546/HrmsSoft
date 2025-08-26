import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

// Fetch today's attendance status
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (email) => {
    const res = await axios.get(`http://localhost:5000/status?email=${email}&date=${today}`);
    return res.data;
  }
);

// Check-In action
export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (email) => {
    const res = await axios.post("http://localhost:5000/checkin", { email });
    return res.data;
  }
);

// Check-Out action
export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (email) => {
    const res = await axios.post("http://localhost:5000/checkout", { email });
    return res.data;
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        if (action.payload.check_in_time) {
          state.checkedIn = !action.payload.check_out_time;
          state.checkInTime = dayjs(action.payload.check_in_time).format("HH:mm:ss");
          if (action.payload.check_out_time)
            state.checkOutTime = dayjs(action.payload.check_out_time).format("HH:mm:ss");
        }
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.checkedIn = true;
        state.checkInTime = dayjs(action.payload.checkInTime).format("HH:mm:ss");
        state.checkOutTime = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.checkedIn = false;
        state.checkOutTime = dayjs(action.payload.checkOutTime).format("HH:mm:ss");
      });
  },
});

export default attendanceSlice.reducer;
