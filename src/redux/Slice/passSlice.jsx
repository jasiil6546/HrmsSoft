import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Change Password

export const changePassword = createAsyncThunk(
  "pass/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // get JWT
      const res = await axios.post("/pass/change-password", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || "Error");
    }
  }
);

// Forgot Password (send OTP)
export const forgotPassword = createAsyncThunk(
  "pass/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post("/pass/forgot-password", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.error || "Error");
    }
  }
);

// Reset Password with OTP
export const resetPassword = createAsyncThunk(
  "pass/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/pass/reset-password", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.error || "Error");
    }
  }
);

const passSlice = createSlice({
  name: "pass",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {
    resetMessage: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
 
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = passSlice.actions;
export default passSlice.reducer;

