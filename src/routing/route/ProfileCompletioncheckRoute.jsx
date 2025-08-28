// src/routing/route/ProfileCompletionCheckRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCompletionCheckRoute = ({ children }) => {
  // Get auth data from Redux
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const isAuthenticated = Boolean(token && user);

  // If not logged in -> send to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If logged in and tries to open /auth/* again -> send to dashboard
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Otherwise allow
  return children;
};

export default ProfileCompletionCheckRoute;

