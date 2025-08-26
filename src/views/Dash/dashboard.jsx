import React, { useState } from "react";
import ForgotPasswordModal from "./Forgetpass";
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
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  forgotPassword,
  resetPassword,
  clearState,
} from "../../redux/Slice/passSlice";
import CheckInOut from "./checkin";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.pass);

  const [anchorEl, setAnchorEl] = useState(null);

  // Change Password modal
  const [openChange, setOpenChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Forgot Password (OTP Request) modal
  const [openForgot, setOpenForgot] = useState(false);
  const [email, setEmail] = useState("");

  // Reset Password with OTP modal
  const [openReset, setOpenReset] = useState(false);
  const [otp, setOtp] = useState("");
  const [resetPasswordValue, setResetPasswordValue] = useState("");

  // Menu handlers
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Change password
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

  // Forgot password (send OTP)
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

  // Reset password with OTP
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
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRMS
          </Typography>
            
                  <CheckInOut userEmail="user@example.com" />
           
          {/* Avatar Menu */}
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar alt="User">U</Avatar>
            
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
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
      <Dialog open={openChange} onClose={() => setOpenChange(false)}>
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
          {loading && <CircularProgress size={24} />}
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="green">{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChange(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

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
          {message && <Typography color="green">{message}</Typography>}
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






