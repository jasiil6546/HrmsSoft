import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCompletionCheckRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth); // get token from Redux
  const user = useSelector(state => state.auth.user);

  // Redirect if not logged in
  if (!token) return <Navigate to="/auth/login" />;

  // // Optional: check profile completion
  // const profileCompletionDone = user?.profileCompleted || true; // default true
  // if (!profileCompletionDone) return <Navigate to="/profile-completion" />;

  return children;
};

export default ProfileCompletionCheckRoute;

