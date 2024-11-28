import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) return <div>Loading...</div>; // Show a loader while fetching user data

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect unauthenticated users
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
