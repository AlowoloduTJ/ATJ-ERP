"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render AuthProvider until client-side hydration is complete
  if (!mounted) {
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
}
