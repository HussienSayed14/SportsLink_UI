import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await authService.getUserDetails();
        setUser(response.data.userData); // Save user data
        setIsAuthenticated(true); // Set authenticated
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false); // Set unauthenticated
        setUser(null);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
