"use client";

import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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
      { email: "admin@example.com", password: "admin123", name: "Admin User" },
      { email: "edu@gmail.com", password: "admin123", name: "Edu User" },
      { email: "user@test.com", password: "password", name: "Test User" },
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
      {user ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} error={loginError} isLoading={isLoading} />
      )}
    </div>
  );
}
