
import { authClient } from "./auth-client";
import type { User } from "./types";
import { getAuthToken, API_BASE_URL } from "./api";
import axios from "axios";


function mapUserRole(role: string): "admin" | "attendant" | "customer" {
  const normalizedRole = role?.toUpperCase();
  if (normalizedRole === "ADMIN") return "admin";
  if (normalizedRole === "ATTENDANT") return "attendant";
  if (normalizedRole === "CUSTOMER") return "customer";
  console.warn(`Unknown role: ${role}, defaulting to customer`);
  return "customer";
}

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      // Use axios directly to call the auth endpoint (same as Thunder Client)
      // Auth endpoints are at /auth/* (excluded from /api prefix in NestJS)
      const response = await axios.post(`${API_BASE_URL}/api/auth/sign-in/email`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true, // Include cookies for session management
      });

      console.log("Login API response:", response.data);

      const responseData = response.data;

      // Check for error in response
      if (responseData?.error) {
        const errorObj = responseData.error;
        console.error("Login error details:", errorObj);
        const errorMessage = errorObj?.message || 
          errorObj?.code ||
          (typeof responseData.error === 'string' ? responseData.error : "Invalid email or password");
        return { user: null, error: errorMessage };
      }

      // Extract token and user directly from response
      // Backend returns: { token, user, redirect }
      const token = responseData?.token || null;
      const userData = responseData?.user;

      if (!userData) {
        return { user: null, error: "Failed to get user data from login response" };
      }

      // Store token if available
      if (token && typeof window !== "undefined") {
        localStorage.setItem("herbel_token", token);
      }

      // Map the user data to our User type
      const mappedUser: User = {
        id: userData.id,
        name: userData.name ?? null,
        email: userData.email,
        emailVerified: userData.emailVerified ?? false,
        image: userData.image ?? null,
        contact: userData.contact ?? userData.phoneNumber ?? null,
        role: mapUserRole(userData.role || "CUSTOMER"),
        branchId: userData.branchId ?? null,
        banned: userData.banned ?? null,
        banReason: userData.banReason ?? null,
        banExpires: userData.banExpires ? new Date(userData.banExpires) : null,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt || userData.createdAt),
      };
      
      return { user: mappedUser, error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      // Handle axios errors
      if (error.response) {
        const errorMessage = error.response.data?.message || 
          error.response.data?.error?.message ||
          error.response.statusText ||
          "Invalid email or password";
        return { user: null, error: errorMessage };
      }
      // Handle JSON parsing errors specifically
      if (error?.message?.includes("JSON") || error?.message?.includes("parse")) {
        console.error("JSON parsing error - response might be malformed:", error);
        return { user: null, error: "Server response error. Please try again." };
      }
      const errorMessage = error?.message || error?.toString() || "An unexpected error occurred during login";
      return { user: null, error: errorMessage };
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = getAuthToken();
      if (!token) {
        return null;
      }

      const session = await authClient.getSession();
      if (!session?.data?.user) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("herbel_token");
        }
        return null;
      }

      if ((session as any).data?.token && (session as any).data.token !== token) {
        localStorage.setItem("herbel_token", (session as any).data.token);
      }

      const user = session.data.user as any; 
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? user.phoneNumber ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("herbel_token");
      }
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("herbel_token");
      }
    }
  },

  signUp: async (email: string, password: string, name: string): Promise<User> => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (response.error) {
        throw new Error(response.error.message || "Sign up failed");
      }

      if (response.data?.token) {
        localStorage.setItem("herbel_token", response.data.token);
      } else if ((response as any).token) {
        localStorage.setItem("herbel_token", (response as any).token);
      }

      const session = await authClient.getSession();
      if (!session?.data?.user) {
        throw new Error("Failed to get user session");
      }

      const user = session.data.user as any;
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? user.phoneNumber ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch (error: any) {
      console.error("Sign up failed:", error);
      throw error;
    }
  },

  verifyEmail: async (token: string): Promise<void> => {
    try {
      const response = await authClient.verifyEmail({
        query: { token },
      });

      if (response.error) {
        throw new Error(response.error.message || "Email verification failed");
      }
    } catch (error: any) {
      console.error("Email verification failed:", error);
      throw error;
    }
  },

  resendVerificationEmail: async (email: string): Promise<void> => {
    try {
      const response = await authClient.sendVerificationEmail({
        email,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to resend verification email");
      }
    } catch (error: any) {
      console.error("Resend verification email failed:", error);
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      const response = await authClient.requestPasswordReset({
        email,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to send password reset email");
      }
    } catch (error: any) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      const response = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (response.error) {
        throw new Error(response.error.message || "Password reset failed");
      }
    } catch (error: any) {
      console.error("Reset password failed:", error);
      throw error;
    }
  },
};

