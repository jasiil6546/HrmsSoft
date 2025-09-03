import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const subNavItems = {
  "My Space": ["Overview", "Dashboard", "Calendar"],
  Team: ["Team Overview", "Members", "Reports"],
  Organization: ["Structure", "Policies", "Announcements"],
  "My Data": ["Leave Summary", "Leave Balance", "Leave Requests", "Compensatory Request", "Leave Grant"],
  Holidays: ["Holiday List", "Apply Holiday"],
  "Request to work on an Off-day": ["New Request", "My Requests"],
  "Encashment request": ["Encashment Summary", "Apply Encashment"]
};

const SubNav = ({ activeTop }) => {
  const items = subNavItems[activeTop] || [];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f8f8f8", color: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ minHeight: "40px !important" }}>
        {items.map((item) => (
          <Typography key={item} sx={{ mr: 3, cursor: "pointer" }}>
            {item}
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default SubNav;
