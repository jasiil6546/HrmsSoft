import React from "react";
import { Navigate } from "react-router-dom";

const ProfileCompletionCheckRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default ProfileCompletionCheckRoute;




