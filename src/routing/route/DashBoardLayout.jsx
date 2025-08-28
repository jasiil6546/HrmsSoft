import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/sidebar";
import TopNav from "../../components/Sidebar/Topnav";
import SubNav from "../../components/Sidebar/subnav";


const DashBoardLayout = () => {
  return (
    <>
    
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
         <TopNav />

        <SubNav /> 

        {/* Main White Content */}
        <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "#ffffffff" }}>
          <Outlet />
        </Box>

       
      </Box>
    </Box>
    </>
  );
};

export default DashBoardLayout;
