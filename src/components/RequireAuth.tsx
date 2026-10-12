import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeForRole, type Role } from "../api/auth";

export function RequireAuth({
  allowedRoles,
  children,
}: {
  allowedRoles?: Role[];
  children: React.ReactNode;
}) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated || !role) return <Navigate to="/login" replace />;

  // Role sem permissao para esta rota: manda para a pagina inicial dela
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={homeForRole(role)} replace />;
  }

  return <>{children}</>;
}
