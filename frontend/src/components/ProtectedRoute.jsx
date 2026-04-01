import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Simple check: look for a token in sessionStorage
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    // Redirect to login with a return url
    console.log("No token, redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
