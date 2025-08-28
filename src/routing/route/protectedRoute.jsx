import React from "react";

const ProtectedRoute = ({ children }) => {
  // Later you can add auth logic here
  return children;
};

export default ProtectedRoute;
