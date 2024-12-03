import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect unauthenticated users
  }

  if (!user.role === "ROLE_OWNER" && !user.role === "ROLE_ADMIN") {
    return <Navigate to="/dashboard" />; // Redirect users without admin or owner role
  }

  return children;
};

export default OwnerRoute;
