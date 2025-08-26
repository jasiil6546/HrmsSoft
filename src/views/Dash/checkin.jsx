import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { checkIn, checkOut, resetMessage } from "../../redux/Slice/attendenceSlice";

const CheckInOut = ({ user_id }) => {
  const dispatch = useDispatch();
  const { checkedIn, checkInTime, checkOutTime, loading, error, message } = useSelector(
    (state) => state.attendance
  );

  const handleClick = () => {
    if (!checkedIn) {
      dispatch(checkIn(user_id));
    } else {
      dispatch(checkOut(user_id));
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetMessage());
    }
    if (error) {
      alert(error);
      dispatch(resetMessage());
    }
  }, [message, error, dispatch]);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Button
        variant="contained"
        color={checkedIn ? "error" : "success"}
        onClick={handleClick}
        disabled={loading}
        size="large"
      >
        {loading ? <CircularProgress size={24} /> : checkedIn ? "⏹ Check-Out" : "✅ Check-In"}
      </Button>

      <Box sx={{ mt: 2 }}>
        {checkInTime && <Typography>✔ Checked in at: {checkInTime}</Typography>}
        {checkOutTime && <Typography>⏹ Checked out at: {checkOutTime}</Typography>}
      </Box>
    </Box>
  );
};




export default CheckInOut;
