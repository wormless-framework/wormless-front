import { createContext, useContext, useState, type ReactNode } from "react";
import type { Role } from "../api/auth";

interface AuthContextValue {
  role: Role | null;
  isAuthenticated: boolean;
  setRole: (role: Role | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const VALID_ROLES: Role[] = ["CLIENT", "SOC_ANALYST", "SOC_ADMIN"];

// Le a data de expiracao (exp) que o backend coloca dentro do JWT
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch {
    return true; // token malformado = invalido
  }
}

// So considera logado se token e role existem, a role e valida e o token nao expirou.
function readStoredRole(): Role | null {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") as Role | null;

  if (token && role && VALID_ROLES.includes(role) && !isTokenExpired(token)) {
    return role;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(readStoredRole);

  const setRole = (newRole: Role | null) => {
    setRoleState(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, isAuthenticated: role !== null, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return ctx;
}
