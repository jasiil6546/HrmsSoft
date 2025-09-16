import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./routing/route/PublicRouter";
import AdminRouter from "./routing/route/AdminRouter";
import MainRouter from "./routing/route/MainRouter";
import ProfileCompletionCheckRoute from "./routing/route/ProfileCompletionCheckRoute";
import PublicRoute from "./routing/route/Public";

const Router = () => {
  return (
    <Routes>
      {/* Public (auth) routes */}

      <Route path="/auth/*" element={
        <PublicRoute>
        <PublicRouter /> 
        </PublicRoute>} />

      {/* Main dashboard (protected) */}
      <Route
        path="/*"
        element={
          <ProfileCompletionCheckRoute>
            <MainRouter />
          </ProfileCompletionCheckRoute>
        }
      />


      {/* Admin routes (protected) */}
      <Route
        path="/admin/*"
        element={
          <ProfileCompletionCheckRoute>
            <AdminRouter />
          </ProfileCompletionCheckRoute>
        }
      />
    </Routes>
  );
};

export default Router;


