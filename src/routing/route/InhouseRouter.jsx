import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../../views/Dash/dashboard";

const InhouseRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
       {/* More user-only routes */}
    </Routes>
  );
};

export default InhouseRouter;
