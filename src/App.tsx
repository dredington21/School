import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login";
import Student from "./pages/Student";
import Staff from "./pages/Staff";
import Advisor from "./pages/Advisor";
import Instructor from "./pages/Instructor";
import { Role } from "./types";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Synchronize state with sessionStorage on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    const role = sessionStorage.getItem("userRole") as Role | null;
    const storedUsername = sessionStorage.getItem("username");

    console.log("Auth Status:", authStatus);
    console.log("Role:", role);
    console.log("Username:", storedUsername);

    setIsAuthenticated(authStatus);
    setUserRole(role);
    setUsername(storedUsername);
  }, []);

  // Handle login and update states
  const handleLogin = (username: string, role: Role, studentId: string) => {
    setIsAuthenticated(true);
    setUsername(studentId); // Set username with the value of studentId
    setUserRole(role);
    console.log("handleLogin called with:", username, role, studentId);
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("username", studentId); // Store studentId as username
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("studentId", studentId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/student/*"
          element={isAuthenticated && userRole === "Student" ? <Student /> : <Navigate to="/login" />}
        />
        <Route
          path="/staff/*"
          element={isAuthenticated && userRole === "Staff" ? <Staff /> : <Navigate to="/login" />}
        />
        <Route
          path="/advisor/*"
          element={isAuthenticated && userRole === "Advisor" ? <Advisor /> : <Navigate to="/login" />}
        />
        <Route
          path="/instructor/*"
          element={isAuthenticated && userRole === "Instructor" ? <Instructor /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;