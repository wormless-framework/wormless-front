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
  const data = await request<LoginResponse>("/api/auth/login", {
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
