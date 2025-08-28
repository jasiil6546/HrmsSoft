import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/Slice/authslice";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(forgotPassword({ email }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Send Reset Link</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
