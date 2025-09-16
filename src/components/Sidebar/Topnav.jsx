import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const TopNav = ({ items = [], activeTop, setActiveTop }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  // Profile menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAction = (action) => {
    if (action === "logout") {
      localStorage.removeItem("authToken");
      sessionStorage.clear();
      navigate("/logout");
    } else if (action === "forgetPassword") {
      navigate("/forget-password");
    } else if (action === "changePassword") {
      navigate("/change-password");
    }
    handleMenuClose();
  };

  const handleNavClick = (item) => {
    setActiveTop(item.label);
    navigate(item.path);
  };

  // Filter out admin-only items if user is not admin
  const filteredItems = items.filter(item => !item.admin || userRole === "admin");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1b2a4e", boxShadow: "none" }}>
      <Toolbar sx={{ minHeight: "48px !important", display: "flex", justifyContent: "space-between" }}>
        {/* Navigation Items */}
        <Box sx={{ display: "flex" }}>
          {filteredItems.map((item) => (
            <Typography
              key={item.label}
              onClick={() => handleNavClick(item)}
              sx={{
                mr: 3,
                cursor: "pointer",
                borderBottom: activeTop === item.label ? "2px solid #00bfff" : "none",
                color: "#fff"
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notification Feature */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleAction("forgetPassword")}>Forget Password</MenuItem>
            <MenuItem onClick={() => handleAction("changePassword")}>Change Password</MenuItem>
            <MenuItem onClick={() => handleAction("logout")}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;

