// src/routing/route/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = false; // 🔑 replace with real auth logic later
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;