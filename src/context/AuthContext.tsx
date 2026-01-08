"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session (only on client)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // TODO: Validate token and fetch user
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login API call
    const mockUser: User = {
      id: "1",
      email,
      name: "Admin User",
      role: "admin",
      permissions: ["*"],
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "mock-token");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    return user.permissions.includes("*") || user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
