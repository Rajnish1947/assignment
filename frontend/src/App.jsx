import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Donation from "./pages/Donation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/donation" element={<Donation />} />
      </Routes>
    </Router>
  );
};

export default App;
