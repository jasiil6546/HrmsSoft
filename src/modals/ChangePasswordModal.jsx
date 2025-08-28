// src/components/ChangePasswordModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ChangePasswordModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Old Password"
          name="oldPassword"
          type="password"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="New Password"
          name="newPassword"
          type="password"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(formData)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
