import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar  from "../../components/Sidebar/sidebar";
import TopNav from "../../components/Sidebar/Topnav";
import { menuItems } from "../../Json/menuItems";

const DashboardLayout = () => {
  const location = useLocation();
  const [activeTop, setActiveTop] = useState("");

  // find which sidebar menu is active
  const activeMenu = menuItems.find((item) =>
  location.pathname.toLowerCase().startsWith(`/${item.path.toLowerCase()}`)
);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Show TopNav only if sidebar item has children */}
        {activeMenu?.children && (
          <TopNav
            items={activeMenu.children}
            activeTop={activeTop}
            setActiveTop={setActiveTop}
          />
        )}

        <Box sx={{ flexGrow: 1, p: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;



