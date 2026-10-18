import { request } from "./client";

export type Role = "CLIENT" | "SOC_ANALYST" | "SOC_ADMIN";

interface LoginResponse {
  token: string;
  role: Role;
}

// Pagina inicial de cada perfil
export function homeForRole(role: Role): string {
  return role === "CLIENT" ? "/upload" : "/dashboard";
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await request<LoginResponse>("/auth/login", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function getUserIdFromToken(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload.sub ? parseInt(payload.sub, 10) : null; 
  } catch {
    return null;
  }
}
