import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SquadPage from "@/pages/Squad";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/squad" element={<SquadPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
