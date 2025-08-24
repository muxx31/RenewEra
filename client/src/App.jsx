import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import SupplierDashboard from "./pages/SupplierDashboard";
import StartupDashboard from "./pages/StartupDashboard";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // Navigate based on role
      if (storedUser.role === "supplier") {
        navigate("/supplier");
      } else if (storedUser.role === "startup") {
        navigate("/startup");
      } else {
        navigate("/"); // fallback for invalid role
      }
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // Navigate based on role after login/signup
    if (userData.role === "supplier") {
      navigate("/supplier");
    } else if (userData.role === "startup") {
      navigate("/startup");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginSignup onLogin={handleLogin} />} />
      <Route
        path="/supplier"
        element={
          user?.role === "supplier" ? (
            <SupplierDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Home />
          )
        }
      />
      <Route
        path="/startup"
        element={
          user?.role === "startup" ? (
            <StartupDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Home />
          )
        }
      />
    </Routes>
  );
}

export default App;
