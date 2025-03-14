import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const login = useSelector((state) => state.userReducer.login);
  return login ? <Outlet /> : <Navigate to="/login" />;
}
