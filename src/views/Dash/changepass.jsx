import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetMessage } from "../../redux/Slice/passSlice";

const ChangePasswordModal = ({
  open,
  onClose,
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
}) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.pass);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(changePassword({ oldPassword, newPassword }));
  };

  useEffect(() => {
    if (message) {
      alert(message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
      dispatch(resetMessage());
    }
    if (error) {
      alert(error);
      dispatch(resetMessage());
    }
  }, [message, error, dispatch, onClose, setOldPassword, setNewPassword, setConfirmPassword]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Old Password"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
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
        {loading && <CircularProgress size={24} style={{ marginTop: 10 }} />}
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="green">{message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleChangePassword} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Update Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
