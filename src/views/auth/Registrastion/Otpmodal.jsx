// components/OTPModal.jsx
import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const OTPModal = ({ open, onClose, email, otp, setOtp, onVerify }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Enter OTP sent to {email}</Typography>
          <TextField
            label="OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={onVerify}>
            Verify OTP
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OTPModal;