"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export default function ProtectedRoute({ children, requiredPermissions }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: Check authentication and permissions
    const checkAuth = async () => {
      // Simulate auth check (only on client)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true);
        } else {
          router.push("/login");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
