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

import { menuItems } from "../../Json/menuItems";

const drawerWidth = 80;

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
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    navigate(`/${item.children[0].path}`);
                  } else {
                    navigate(fullPath);
                  }
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
  {typeof item.icon === "string" && item.icon.endsWith(".png") ? (
    <img
      src={item.icon}
      alt={item.label}
      style={{ width: 34, height: 34 }} 
    />
  ) : (
    <Icon icon={item.icon} fontSize={26} />
  )}
</ListItemIcon>

                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    color: "white",
                    fontSize: "0.65rem",
                    mt: 0.5,
                    width: 70,
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
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


