// routes/index.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "../pages/HomePage";
// Import other pages...

const AppRoutes = () => (
  <Router>
    <Routes>{/* <Route path="/" element={<HomePage />} /> */}</Routes>
  </Router>
);

export default AppRoutes;
