import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { menuItems } from "../../components/Sidebar/sidebar";
import TopNav from "../../components/Sidebar/Topnav";

const DashboardLayout = () => {
  const location = useLocation();
  const [activeTop, setActiveTop] = useState("");

  // find which sidebar menu is active
  const activeMenu = menuItems.find((item) =>
    location.pathname.startsWith(`/${item.path}`)
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

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;



