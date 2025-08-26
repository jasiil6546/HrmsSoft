import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

const CheckInOut = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCheckInTime(dayjs().format("HH:mm:ss"));
    setCheckOutTime(null);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckOutTime(dayjs().format("HH:mm:ss"));
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
    
      </Typography>

      {!checkedIn ? (
        <Button variant="contained" color="success" onClick={handleCheckIn}>
          ✅ Check-In
        </Button>
      ) : (
        <Button variant="contained" color="error" onClick={handleCheckOut}>
          ⏹ Check-Out
        </Button>
      )}

      <Box sx={{ mt: 2,mr:5 }}>
        {checkInTime && (
          <Typography>✔ Checked in at: {checkInTime}</Typography>
        )}
        {checkOutTime && (
          <Typography>⏹ Checked out at: {checkOutTime}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CheckInOut;
