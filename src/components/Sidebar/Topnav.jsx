import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopNav = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1b2a4e", boxShadow: "none" }}>
      <Toolbar sx={{ minHeight: "48px !important" }}>
        <Typography sx={{ mr: 3, cursor: "pointer" }}>My Space</Typography>
        <Typography sx={{ mr: 3, cursor: "pointer" }}>Team</Typography>
        <Typography sx={{ cursor: "pointer" }}>Organization</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
