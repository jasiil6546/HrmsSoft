import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------- FETCH ROLES -------------------
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/roles");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch roles");
    }
  }
);

// ------------------- ADD ROLE -------------------
export const addRole = createAsyncThunk(
  "roles/addRole",
  async ({ role_name, description }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/roles", { role_name, description });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add role");
    }
  }
);

// ------------------- EDIT ROLE -------------------
export const editRole = createAsyncThunk(
  "roles/editRole",
  async ({ id, role_name, description }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5000/roles/${id}`, { role_name, description });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit role");
    }
  }
);

// ------------------- SOFT DELETE ROLE -------------------
export const softDeleteRole = createAsyncThunk(
  "roles/softDeleteRole",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      await axios.patch(`http://localhost:5000/roles/${id}/soft-delete`, { userWhoDeleted: user });
      return id; // return id to remove from frontend
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete role");
    }
  }
);

// ------------------- SLICE -------------------
const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Role
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      // Edit Role
      .addCase(editRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.roles[index] = action.payload;
      })
      // Soft Delete Role
      .addCase(softDeleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((r) => r.id !== action.payload);
      });
  },
});

export default roleSlice.reducer;

