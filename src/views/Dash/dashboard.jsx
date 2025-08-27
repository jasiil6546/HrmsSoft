import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

import ForgotPasswordModal from "./Forgetpass";
import ChangePasswordModal from "./changepass";
import CheckInOut from "./checkin";

import { changePassword, forgotPassword, resetPassword } from "../../redux/Slice/passSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.pass);
  
  // Get current logged-in user from Redux store
  const currentUser = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);

  // For Change Password modal
  const [openChange, setOpenChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For Forgot Password (OTP Request) modal
  const [openForgot, setOpenForgot] = useState(false);
  const [email, setEmail] = useState("");

  // For Reset Password with OTP modal
  const [openReset, setOpenReset] = useState(false);
  const [otp, setOtp] = useState("");
  const [resetPasswordValue, setResetPasswordValue] = useState("");

  // Menu open/close handlers
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Handle change password action
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(changePassword({ oldPassword, newPassword }));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle forgot password OTP request
  const handleForgotPassword = () => {
    if (!email) {
      alert("Enter your email!");
      return;
    }
    dispatch(forgotPassword(email)).then(() => {
      setOpenForgot(false);
      setOpenReset(true);
    });
  };

  // Handle reset password with OTP
  const handleResetPassword = () => {
    if (!otp || !resetPasswordValue) {
      alert("Fill all fields");
      return;
    }
    dispatch(resetPassword({ email, otp, newPassword: resetPasswordValue }));
    setOtp("");
    setResetPasswordValue("");
  };

  return (
    <>
      <AppBar sx={{color:"#111" , backgroundColor:"#f0ececff" }}position="static">
        {/* Pass user id safely to CheckInOut */}
        <CheckInOut user_id={currentUser?.id} />
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRMS
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar alt={currentUser?.name || "User"}>
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                setOpenChange(true);
                handleClose();
              }}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenForgot(true);
                handleClose();
              }}
            >
              Forgot Password (OTP Reset)
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={openChange}
        onClose={() => setOpenChange(false)}
        oldPassword={oldPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        loading={loading}
        error={error}
        message={message}
        handleChangePassword={handleChangePassword}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={openForgot}
        onClose={() => setOpenForgot(false)}
        email={email}
        setEmail={setEmail}
        loading={loading}
        error={error}
        message={message}
        handleForgotPassword={handleForgotPassword}
      />

      {/* Reset Password Modal */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>Reset Password with OTP</DialogTitle>
        <DialogContent>
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
            value={resetPasswordValue}
            onChange={(e) => setResetPasswordValue(e.target.value)}
          />
          {loading && <CircularProgress size={24} />}
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="success.main">{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReset(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;


