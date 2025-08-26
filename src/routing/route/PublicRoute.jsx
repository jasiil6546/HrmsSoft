// src/routing/route/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = false;
return !isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PublicRoute;