"use client";

import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

interface User {
  email: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo credentials - tambahkan lebih banyak user
    const validUsers = [
      //TODO: API user list
      { email: "admin@example.com", password: "admin123", name: "Admin User" },
      { email: "edu@gmail.com", password: "admin123", name: "Edu User" },
      { email: "user@test.com", password: "password", name: "Test User" },
      { email: "edu@gmail.com", password: "tes123", name: "Test User" },
    ];

    const user = validUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setUser({ email: user.email, name: user.name });
    } else {
      setLoginError("Email atau password salah");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setLoginError("");
  };

  return (
    <div className="App">
      <div className="">This is App</div>
    </div>
  );
}
