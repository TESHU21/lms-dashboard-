import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem("authToken");

  if (token) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from || "/app"} replace />;
  }

  return children;
};

export default PublicRoute;
