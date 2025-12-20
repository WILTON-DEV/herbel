"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/lib/types";
import { authApi } from "@/lib/api-client";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isAttendant: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("herbel_token");
        }
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authApi.login(email, password);
      if (result.user) {
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error || "Login failed" };
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage = error?.message || error?.toString() || "An unexpected error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === "admin",
    isAttendant: user?.role === "attendant",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

