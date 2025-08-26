import React from "react";
import PublicRouter from "./routing/route/PublicRouter";
import PublicRoute from "./routing/route/PublicRoute";
import InhouseRouter from "./routing/route/InhouseRouter";
import ProfileCompletionCheckRoute from "./routing/route/ProfileCompletioncheckRoute"
import { Route, Routes } from "react-router-dom";



const Router = () => {
  return (
    <Routes>
      <Route path="/*" 
      element={
        <ProfileCompletionCheckRoute>
          <InhouseRouter/>
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

