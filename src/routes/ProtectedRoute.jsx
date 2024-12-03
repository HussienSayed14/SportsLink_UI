import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect unauthenticated users
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
