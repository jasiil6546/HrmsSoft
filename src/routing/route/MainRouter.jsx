import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import DashBoardLayout from "./DashBoardLayout";
import Dashboard from "../../views/Dash/dashboard";
import Fof from "../../components/fof";

const MainRouter = () => {
  return (
    <Routes>
      {/* Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashBoardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add more dashboard pages here */}
      </Route>

      {/* Global 404 route */}
      <Route path="*" element={<Fof />} />
    </Routes>
  );
};

export default MainRouter;

