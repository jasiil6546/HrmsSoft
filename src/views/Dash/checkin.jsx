import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Paper, Typography, Alert } from "@mui/material";
import { checkIn, checkOut, resetMessage } from "../../redux/Slice/attendenceSlice";

function CheckInOut({ user_id }) {
  const dispatch = useDispatch();

  // ✅ must use state.attendance (not atten)
  const { checkedIn, checkInTime, checkOutTime, loading, error, message } =
    useSelector((state) => state.attendance);

  const handleCheckIn = () => {
    if (!user_id) {
      alert("User ID not found. Please login again.");
      return;
    }
    dispatch(checkIn(user_id));
  };

  const handleCheckOut = () => {
    if (!user_id) {
      alert("User ID not found. Please login again.");
      return;
    }
    dispatch(checkOut(user_id));
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => dispatch(resetMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  return (
    <Paper elevation={3} sx={{ maxWidth: 360, mx: "auto", mt: 5, p: 4, textAlign: "center" }}>
      <Box sx={{ mb: 2 }}>
        {!checkedIn ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckIn}
            disabled={loading}
          >
            {loading ? "Checking in..." : "Check In"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleCheckOut}
            disabled={loading}
          >
            {loading ? "Checking out..." : "Check Out"}
          </Button>
        )}
      </Box>

      <Box sx={{ minHeight: 32, mb: 2 }}>
        {checkedIn && (
          <Typography color="success.main" fontWeight="bold">
            Checked in at: <b>{checkInTime}</b>
          </Typography>
        )}
        {!checkedIn && checkOutTime && (
          <Typography color="info.main" fontWeight="bold">
            Checked out at: <b>{checkOutTime}</b>
          </Typography>
        )}
      </Box>

      {message && <Alert severity="success" sx={{ mb: 1 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
    </Paper>
  );
}

export default CheckInOut;


