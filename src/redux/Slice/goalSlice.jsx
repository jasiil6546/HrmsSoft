import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/goals";

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addGoal = createAsyncThunk("goals/addGoal", async (goalData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const userId = getState().auth.user.id;
    const payload = { ...goalData, createdBy: userId, assignedTo: userId };
    const res = await axios.post(API_URL, payload, { headers: { Authorization: `Bearer ${token}` } });
    return { ...payload, goalId: res.data.goalId, status: 1, rating: null, feedback: null };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateGoal = createAsyncThunk("goals/updateGoal", async ({ goalId, updates }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.put(`${API_URL}/${goalId}`, updates, { headers: { Authorization: `Bearer ${token}` } });
    return { goalId, updates };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (goalId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.delete(`${API_URL}/${goalId}`, { headers: { Authorization: `Bearer ${token}` } });
    return goalId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateGoalStatus = createAsyncThunk("goals/updateGoalStatus", async ({ goalId, newStatus }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.put(`${API_URL}/${goalId}/status`, { newStatus }, { headers: { Authorization: `Bearer ${token}` } });
    return { goalId, newStatus };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const completeGoalWithFeedback = createAsyncThunk("goals/completeGoalWithFeedback", async ({ goalId, rating, feedback }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.put(`${API_URL}/${goalId}/complete`, { rating, feedback }, { headers: { Authorization: `Bearer ${token}` } });
    return { goalId, rating, feedback };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const goalSlice = createSlice({
  name: "goals",
  initialState: { goals: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => { state.status = "loading"; })
      .addCase(fetchGoals.fulfilled, (state, action) => { state.status = "succeeded"; state.goals = action.payload; })
      .addCase(fetchGoals.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(addGoal.fulfilled, (state, action) => { state.goals.push(action.payload); })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const idx = state.goals.findIndex(g => g.goalId === action.payload.goalId);
        if (idx !== -1) state.goals[idx] = { ...state.goals[idx], ...action.payload.updates };
      })
    
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(g => g.goalId !== action.payload);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateGoalStatus.fulfilled, (state, action) => {
        const idx = state.goals.findIndex(g => g.goalId === action.payload.goalId);
        if (idx !== -1) state.goals[idx].status = action.payload.newStatus;
      })
      .addCase(completeGoalWithFeedback.fulfilled, (state, action) => {
        const idx = state.goals.findIndex(g => g.goalId === action.payload.goalId);
        if (idx !== -1) {
          state.goals[idx].rating = action.payload.rating;
          state.goals[idx].feedback = action.payload.feedback;
        }
      });
  }
});

export default goalSlice.reducer;
