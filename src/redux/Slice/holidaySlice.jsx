import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/holidays";

export const fetchHolidays = createAsyncThunk("holidays/fetchHolidays", async () => {
  const res = await axios.get(API_URL);
  // Normalize dates to ISO string to ensure consistent date format in the state
  return res.data.map(holiday => ({
    ...holiday,
    date: holiday.date ? new Date(holiday.date).toISOString() : null,
  }));
});

export const addHoliday = createAsyncThunk("holidays/addHoliday", async (holiday) => {
  const res = await axios.post(API_URL, holiday);
  return {
    ...res.data,
    date: res.data.date ? new Date(res.data.date).toISOString() : null,
  };
});

export const updateHoliday = createAsyncThunk(
  "holidays/updateHoliday",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    
    return {
      id,
      ...data,
      date: data.date ? new Date(data.date).toISOString() : null,
    };
  }
);

export const deleteHoliday = createAsyncThunk("holidays/deleteHoliday", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
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
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addHoliday.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateHoliday.fulfilled, (state, action) => {
        const index = state.items.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(deleteHoliday.fulfilled, (state, action) => {
        // Soft delete: remove from items list
        state.items = state.items.filter((h) => h.id !== action.payload);
      });
  },
});

export default holidaySlice.reducer;
