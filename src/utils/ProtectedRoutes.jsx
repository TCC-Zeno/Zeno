import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
