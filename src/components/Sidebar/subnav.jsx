import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const SubNav = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#f8f8f8", color: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ minHeight: "40px !important" }}>
        <Typography sx={{ mr: 3, cursor: "pointer" }}>Overview</Typography>
        <Typography sx={{ mr: 3, cursor: "pointer" }}>Dashboard</Typography>
        <Typography sx={{ cursor: "pointer" }}>Calendar</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default SubNav;
