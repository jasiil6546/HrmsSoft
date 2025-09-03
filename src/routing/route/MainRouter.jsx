import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoardLayout from "./DashBoardLayout";
import Dashboard from "../../views/Dash/dashboard";
import Fof from "../../components/fof";
import OKRPage from "../../views/Dash/sidebar/okr";
import Performance from "../../views/Dash/sidebar/Performance";
import Logout from "../../views/auth/Login/Logout"

const MainRouter = () => {
  return (
    <Routes>

      <Route path="/"
        element={ <DashBoardLayout />}      >
    
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="okr" element={<OKRPage />} />
        <Route path="performance" element={<Performance />} />
        <Route path='overview' element ={<</>}></Route>
        <Route path="/logout" element={<Logout />} />
      </Route>

   
      <Route path="*" element={<Fof />} />
    </Routes>
  );
};

export default MainRouter;

