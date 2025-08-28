import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./DashBoardLayout";
import UserDashboard from "../../views/Dash/dashboard";


const InhouseRouter = () => {
  return (
    <Routes>
    
<Route element={<DashBoardLayout />}>
  <Route path="/dashboard" element={<UserDashboard />} />
</Route>


       {/* More user-only routes */}
    </Routes>
  );
};

export default InhouseRouter;
