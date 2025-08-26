import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dash/dashboard";

const InhouseRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  );
};

export default InhouseRouter;
