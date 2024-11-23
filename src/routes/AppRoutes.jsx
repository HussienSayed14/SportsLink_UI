import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../pages/Hero";
import NavBar from "../components/NavBar";
const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
