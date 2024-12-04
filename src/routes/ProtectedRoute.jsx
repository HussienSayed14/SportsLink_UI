import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingDots from "../components/LoadingDots";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useUser();

  if (loading) {
    return <LoadingDots />;
  }

  console.log("User", user);

  console.log("Is Authenticated: ", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect unauthenticated users
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
