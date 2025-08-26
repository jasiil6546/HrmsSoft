import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

const ResetPasswordModal = ({
  open,
  onClose,
  email,
  otp,
  newPassword,
  confirmPassword,
  setOtp,
  setNewPassword,
  setConfirmPassword,
  loading,
  error,
  message,
  handleResetPassword,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          disabled
        />
        <TextField
          margin="dense"
          label="OTP"
          type="text"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {loading && <CircularProgress size={24} />}
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="green">{message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleResetPassword}>
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordModal;
