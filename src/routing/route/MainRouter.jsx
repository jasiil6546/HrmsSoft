import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoardLayout from "./DashBoardLayout";
import Fof from "../../components/fof";
import Logout from "../../views/auth/Login/Logout";
import Overview from "../../views/Dash/sidetopchild/Overview";
import Calender from "../../views/Dash/sidetopchild/Calender";
import Roletaple from "../../views/Admin/RoleTable";
import LeaveSummary from "../../views/leave/LeaveSummary";
import LeaveBalance from "../../views/leave/LeaveBalance";
import LeaveRequests from "../../views/leave/LeaveRequests";
import Holidays from "../../views/leave/Holidays";


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardLayout />}>
        {/* Dashboard children */}
        <Route path="dashboard/overview" element={<Overview />} />
        <Route path="dashboard/calender" element={<Calender />} />

        {/* Role children */}
        <Route path="role/roletable" element={<Roletaple />} />

        {/* Other routes */}
        <Route path="leave/summary" element={<LeaveSummary />} />
        <Route path="leave/balance" element={<LeaveBalance />} />
        <Route path="leave/request" element={<LeaveRequests />} />
        <Route path="leave/Holiday" element={<Holidays />} />
        
        <Route path="logout" element={<Logout />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Fof />} />
    </Routes>
  );
};

export default MainRouter;


