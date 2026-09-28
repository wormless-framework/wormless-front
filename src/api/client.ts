const API_URL = "http://localhost:8080";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && !options.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
    throw new Error("Nao autenticado");
  }

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return response.status !== 204 ? (response.json() as Promise<T>) : (null as T);
}
