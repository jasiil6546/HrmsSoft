import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/lmages/logo (2).png";
import { menuItems } from "../../Json/menuItems";
import "../../App.css"

const drawerWidth = 80;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole"); 

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
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 0, mb: 2 }}>
        <img src={Logo} alt="Logo" style={{ width: 110, height: 70 }} />
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, i) => {
          // filter out admin-only items if user is not admin
          const showItem = !item.admin || userRole === "admin";
          if (!showItem) return null;

          const fullPath = `/${item.path}`;
          const isActive = location.pathname.startsWith(fullPath);

          return (
            <ListItem key={i} disablePadding sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
              <ListItemButton
                sx={{
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: isActive ? "#00c3ffff" : "transparent",
                  borderRadius: isActive ? "12px" : "0px",
                  "&:hover": { backgroundColor: "#2e4a7b" },
                }}
                onClick={() => {
                  // Navigate to first allowed child if exists
                  if (item.children && item.children.length > 0) {
                    const firstChild = item.children.find(c => !c.admin || userRole === "admin");
                    navigate(firstChild ? `/${firstChild.path}` : fullPath);
                  } else {
                    navigate(fullPath);
                  }
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
                  {typeof item.icon === "string" && item.icon.endsWith(".png") ? (
                    <img src={item.icon} alt={item.label} style={{ width: 34, height: 34 }} />
                  ) : (
                    <Icon icon={item.icon} fontSize={26} />
                  )}
                </ListItemIcon>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: "white", fontSize: "0.65rem", mt: 0.5, width: 70, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis" }}
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




