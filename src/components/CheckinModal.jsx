import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { checkIn, checkOut } from "../redux/Slice/attendanceSlice";

const CheckinModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // logged user info
  const { isCheckedIn } = useSelector((state) => state.attendance);

  const handleCheckIn = () => {
    dispatch(checkIn({ email: user.email, name: user.name }));
    handleClose();
  };

  const handleCheckOut = () => {
    dispatch(checkOut({ email: user.email }));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 3,
          background: "white",
          borderRadius: 2,
          width: 400,
          mx: "auto",
          mt: "20vh",
          boxShadow: 5,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Attendance</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {!isCheckedIn ? (
          <>
            <Typography sx={{ mt: 2 }}>
              Hello <b>{user.name}</b>, ready to Check-In?
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleCheckIn}
            >
              Check In
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2 }}>
              You are currently Checked-In. Want to Check-Out?
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CheckinModal;
