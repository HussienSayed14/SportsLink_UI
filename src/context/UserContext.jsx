import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { Navigate } from "react-router";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  //   const navigate = useNavigate();

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getUserDetails();
        setUser(response.data); // Save user data
        setIsAuthenticated(true); // Set authenticated
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false); // Set unauthenticated
        return <Navigate to="/" />; // Redirect unauthenticated users
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
