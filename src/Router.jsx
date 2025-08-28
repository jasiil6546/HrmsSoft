import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./routing/route/PublicRouter";
import PublicRoute from "./routing/route/PublicRoute";
import InhouseRouter from "./routing/route/InhouseRouter";
import AdminRouter from "./routing/route/AdminRouter";
import MainRouter from "./routing/route/MainRouter";
import ProfileCompletionCheckRoute from "./routing/route/ProfileCompletioncheckRoute";

const Router = () => {
  return (
    <Routes>
      {/* Public pages */}
      <Route
        path="/*"
        element={
          <ProfileCompletionCheckRoute>
            <PublicRouter />
          </ProfileCompletionCheckRoute>
        }
      />

      {/* Auth pages */}
      <Route
        path="/auth/*"
        element={
          <PublicRoute>
            <PublicRouter />
          </PublicRoute>
        }
      />

      {/* User (dashboard) routes */}
      <Route
        path="/user/*"
        element={
          <ProfileCompletionCheckRoute>
            <MainRouter />
          </ProfileCompletionCheckRoute>
        }
      />

      {/* Inhouse routes */}
      <Route
        path="/inhouse/*"
        element={
          <ProfileCompletionCheckRoute>
            <InhouseRouter />
          </ProfileCompletionCheckRoute>
        }
      />

      {/* Admin routes */}
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


