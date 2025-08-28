// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCheckedIn: false,
  checkinTime: null,
  checkoutTime: null,
  status: 'not completed',
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCheckin(state, action) {
      state.isCheckedIn = true;
      state.checkinTime = action.payload.time;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.status = 'not completed';
    },
    setCheckout(state, action) {
      state.isCheckedIn = false;
      state.checkoutTime = action.payload.time;
      state.status = 'completed';
    },
  },
});

export const { setCheckin, setCheckout } = userSlice.actions;
export default userSlice.reducer;
