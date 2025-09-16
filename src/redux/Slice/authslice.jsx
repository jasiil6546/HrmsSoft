import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { name, email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Registration failed");
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// --- Load token from storage and decode user ---
const tokenFromStorage = localStorage.getItem("token");
let userFromToken = null;

if (tokenFromStorage) {
  try {
    userFromToken = jwtDecode(tokenFromStorage);
  } catch (err) {
    console.error("Invalid token in storage:", err);
    localStorage.removeItem("token");
  }
}

const initialState = {
  user: userFromToken,  // decoded user from token
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        try {
          state.user = jwtDecode(action.payload.token);
        } catch (err) {
          console.error("Failed to decode token:", err);
          state.user = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
