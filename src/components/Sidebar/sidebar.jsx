// Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/lmages/logo (2).png";

const drawerWidth = 80;

export const menuItems = [
  {
    icon: "mdi:home",
    label: "Home",
    path: "dashboard",
    children: [
      { label: "My Space", path: "myspace" },
      { label: "Team", path: "team" },
      { label: "Organization", path: "organization" },
    ],
  },
  {
    icon: "mdi:account-group",
    label: "OKR",
    path: "okr",
    children: [
      { label: "Objectives", path: "objectives" },
      { label: "Key Results", path: "key-results" },
    ],
  },
  {
    icon: "mdi:chart-line",
    label: "Performance",
    path: "performance",
    children: [
      { label: "Reviews", path: "reviews" },
      { label: "Goals", path: "goals" },
    ],
  },
  {
    icon: "mdi:calendar",
    label: "Leave",
    path: "leave",
    children: [
      { label: "Leave Summary", path: "summary" },
      { label: "Leave Balance", path: "balance" },
      { label: "Requests", path: "requests" },
      { label: "Compensatory Request", path: "compensatory" },
      { label: "Grant Leave", path: "grant" }
    ]
  },
   {
    icon: "mdi:clipboard-check",
    label: "Attendance",
    path: "attendance",
    children: [
      { label: "Daily Logs", path: "daily" },
      { label: "Monthly Report", path: "monthly" },
      { label: "Late Coming", path: "late-coming" },
      { label: "Early Exit", path: "early-exit" }
    ]
  },
   {
    icon: "mdi:format-list-checkbox",
    label: "Tasks",
    path: "tasks",
    children: [
      { label: "My Tasks", path: "my-tasks" },
      { label: "Assigned", path: "assigned" },
      { label: "Completed", path: "completed" },
      { label: "Pending", path: "pending" }
    ]
  },
   {
    icon: "mdi:file-document",
    label: "Files",
    path: "files",
    children: [
      { label: "My Files", path: "my-files" },
      { label: "Shared with Me", path: "shared" },
      { label: "Recent", path: "recent" }
    ]
  },
   {
    icon: "mdi:dots-horizontal",
    label: "More",
    path: "more",
    children: [
      { label: "Settings", path: "settings" },
      { label: "Notifications", path: "notifications" },
      { label: "Integrations", path: "integrations" }
    ]
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#1b2a4e",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
          overflowY: "hidden",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 0,
          mb: 2,
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: 110, height: 70 }} />
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, i) => {
          const fullPath = `/${item.path}`;
         const isActive = location.pathname.startsWith(fullPath);

          return (
            <ListItem
              key={i}
              disablePadding
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <ListItemButton
                sx={{
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: isActive ? "#00c3ffff" : "transparent",
                  borderRadius: isActive ? "12px" : "0px",
                  "&:hover": { backgroundColor: "#2e4a7b" },
                }}
                onClick={() => navigate(fullPath)}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
                  <Icon icon={item.icon} fontSize={26} />
                </ListItemIcon>
                <Typography
                  variant="caption"
                  sx={{ color: "white", fontSize: "0.65rem", mt: 0.5 }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;


