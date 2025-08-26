import React from "react";
import PublicRouter from "./routing/route/PublicRouter";
import PublicRoute from "./routing/route/PublicRoute";
import InhouseRouter from "./routing/route/InhouseRouter";
import AdminRouter from "./routing/route/AdminRouter";
import ProfileCompletionCheckRoute from "./routing/route/ProfileCompletioncheckRoute"
import { Route, Routes } from "react-router-dom";



const Router = () => {
  return (
    <Routes>
      <Route path="/user/*" 
      element={
        <ProfileCompletionCheckRoute>
          <InhouseRouter/>
          </ProfileCompletionCheckRoute>
          } 
          />

            <Route
        path="/admin/*"
        element={
          <ProfileCompletionCheckRoute>
            <AdminRouter />
          </ProfileCompletionCheckRoute>
        }
      />
  <Route
    path="/auth/*"
    element={
      <PublicRoute>
        <PublicRouter />
      </PublicRoute>
    }
  />
</Routes>
  );
};

export default Router;

