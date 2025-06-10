// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SquadPage from "@/pages/SquadPage";

interface AppRouterProps {
  user: { email: string; name: string } | null;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  loginError: string;
  isLoading: boolean;
}

export default function AppRouter({
  user,
  onLogin,
  onLogout,
  loginError,
  isLoading,
}: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                onLogin={onLogin}
                error={loginError}
                isLoading={isLoading}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard onLogout={onLogout} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/squad"
          element={
            <SquadPage />
          }
        />
        {/* Tambahkan route lain seperti /crud di sini */}
      </Routes>
    </BrowserRouter>
  );
}
