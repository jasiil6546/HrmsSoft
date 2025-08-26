import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const ForgotPasswordModal = ({
  open,
  onClose,
  email,
  setEmail,
  loading,
  error,
  message,
  handleForgotPassword,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Enter Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {loading && <CircularProgress size={24} />}
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="green">{message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleForgotPassword}>
          Send OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
