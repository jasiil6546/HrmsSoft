import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/sidebar";
import TopNav from "../../components/Sidebar/Topnav";
import { menuItems } from "../../Json/menuItems";
import "../../App.css"

const DashboardLayout = () => {
  const location = useLocation();
  const [activeTop, setActiveTop] = useState("");

  const activeMenu = menuItems.find((item) =>
    location.pathname.toLowerCase().startsWith(`/${item.path.toLowerCase()}`)
  );


  const userRole = localStorage.getItem("userRole");
  const topNavItems =
    activeMenu?.children?.filter(
      (child) => !child.admin || userRole === "admin"
    ) || [];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
     
        {topNavItems.length > 0 && (
          <TopNav
            items={topNavItems}
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





