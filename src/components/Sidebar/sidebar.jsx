import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Icon } from "@iconify/react";

const drawerWidth = 60;

const menuItems = [
  { icon: "mdi:home" },
  { icon: "mdi:account-group" },
  { icon: "mdi:chart-line" },
  { icon: "mdi:calendar" },
  { icon: "mdi:clipboard-check" },
  { icon: "mdi:format-list-checkbox" },
  { icon: "mdi:file-document" },
  { icon: "mdi:dots-horizontal" },
  { icon: "mdi:chart-pie" },
];

const Sidebar = () => {
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
          justifyContent: "space-between",
        },
      }}
    >
      <List>
        {menuItems.map((item, i) => (
          <ListItem key={i} disablePadding sx={{ mt :1}}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
                <Icon icon={item.icon} fontSize={24} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

