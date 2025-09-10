import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/holidays";

// ✅ Fetch active holidays
export const fetchHolidays = createAsyncThunk("holidays/fetchHolidays", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// ✅ Fetch all (including deleted)
export const fetchAllHolidays = createAsyncThunk("holidays/fetchAllHolidays", async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
});

// ✅ Add holiday
export const addHoliday = createAsyncThunk("holidays/addHoliday", async (holiday) => {
  const res = await axios.post(API_URL, holiday);
  return res.data;
});

// ✅ Update holiday
export const updateHoliday = createAsyncThunk("holidays/updateHoliday", async ({ id, data }) => {
  await axios.put(`${API_URL}/${id}`, data);
  return { id, ...data };
});

// ✅ Soft delete
export const deleteHoliday = createAsyncThunk("holidays/deleteHoliday", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// ✅ Restore holiday
export const restoreHoliday = createAsyncThunk("holidays/restoreHoliday", async (id) => {
  await axios.put(`${API_URL}/restore/${id}`);
  return id;
});

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state) => { state.loading = true; })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateHoliday.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h.id === action.payload);
        if (index !== -1) state.items[index].deletedAt = new Date().toISOString();
      })
      .addCase(restoreHoliday.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h.id === action.payload);
        if (index !== -1) state.items[index].deletedAt = null;
      })
      .addMatcher((action) => action.type.endsWith("rejected"), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default holidaySlice.reducer;
