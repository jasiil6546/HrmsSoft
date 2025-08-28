// src/components/ForgotPasswordModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ForgotPasswordModal = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = React.useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(email)}
        >
          Send OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
