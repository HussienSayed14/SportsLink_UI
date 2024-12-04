import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingDots from "../components/LoadingDots";

const OwnerRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useUser();

  if (loading) {
    return <LoadingDots />;
  }

  console.log("User Data Owner: ", user);
  console.log("Is authenticated: ", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect unauthenticated users
  }

  if (user.role !== "ROLE_OWNER" && user.role !== "ROLE_ADMIN") {
    return <Navigate to="/search" />; // Redirect users without admin or owner role
  }

  return children;
};

export default OwnerRoute;
