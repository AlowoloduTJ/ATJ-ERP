import { apiClient } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    permissions: string[];
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  async logout(): Promise<void> {
    return apiClient.post("/auth/logout");
  },

  async refreshToken(): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/refresh");
  },
};
