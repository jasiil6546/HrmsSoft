import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook

const TopNav = ({ items = [], activeTop, setActiveTop }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // ✅ define navigate here

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    if (action === "logout") {
      // clear auth/session storage
      localStorage.removeItem("authToken");
      sessionStorage.clear();

      // navigate to logout route
      navigate("/logout"); // ✅ now it works
    } else if (action === "forgetPassword") {
      navigate("/forget-password");
    } else if (action === "changePassword") {
      navigate("/change-password");
    }

    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1b2a4e", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          minHeight: "48px !important",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {/* Left side nav items */}
        <div>
          {items.map((item) => (
            <Typography
              key={item.label}
              onClick={() => setActiveTop(item.label)}
              sx={{
                mr: 3,
                cursor: "pointer",
                borderBottom:
                  activeTop === item.label ? "2px solid #00bfff" : "none",
                color: "#fff",
                display: "inline-block"
              }}
            >
              {item.label}
            </Typography>
          ))}
        </div>

        {/* Right side profile dropdown */}
        <div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleAction("forgetPassword")}>
              Forget Password
            </MenuItem>
            <MenuItem onClick={() => handleAction("changePassword")}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => handleAction("logout")}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;





