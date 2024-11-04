import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const auth = useAuth()
  const isLoggedin = auth.user;

  return isLoggedin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
