import React from "react";
import { Navigate } from "react-router-dom";


const ProfileCompletionCheckRoute = ({ children }) => {
// Get token from localStorage/sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
   
// If not logged in, send to login page
  if (!token) return <Navigate to="/auth/login" />;

  
return children;
};

export default ProfileCompletionCheckRoute;

