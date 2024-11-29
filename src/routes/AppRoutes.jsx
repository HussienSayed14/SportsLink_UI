import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../pages/Hero";
import NavBar from "../components/NavBar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import VerifyUser from "../pages/VerifyUser";
import LoadingDots from "../components/LoadingDots";
import { useUser } from "../context/UserContext";

const AppRoutes = () => {
  const { loading } = useUser();

  return (
    <Router>
      {loading && <LoadingDots />}
      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Register />} />
          <Route path="/verify" element={<VerifyUser />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
