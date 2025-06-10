import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SquadPage from "@/pages/Squad";
import { IsLoggedIn, RequiredLogin } from "@/guard/AuthGuard";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<RequiredLogin />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/squad" element={<SquadPage />} />
      </Route>
      <Route element={<IsLoggedIn />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
