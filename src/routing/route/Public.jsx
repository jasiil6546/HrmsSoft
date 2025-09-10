import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Or your auth method
  return token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;