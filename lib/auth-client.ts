"use client";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { store } from "@/store";

/**
 * Better Auth Client Configuration
 * Connects directly to your backend Better Auth API
 *
 * Uses absolute backend URL from NEXT_PUBLIC_BACKEND_BASE_URL env variable.
 * Backend must have CORS configured to allow requests from frontend origin.
 *
 * @see https://better-auth.com/docs/installation/client
 */

const fetchToken = () => {
  try {
    // Use require to avoid circular dependency
    // const { store } = require("@/store");
    return store.getState().auth.token;
  } catch {
    return "";
  }
};

export const authClient = createAuthClient({
  // Use absolute backend URL directly - no proxy
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://herbel-api.onrender.com",
  // Better Auth API is mounted at /api/auth
  basePath: "/api/auth",
  // Note: We're using Bearer tokens instead of cookies
  // The authClient is kept for Better Auth UI compatibility, but actual auth uses direct fetch with Bearer tokens
  fetchOptions: {
    auth: { type: "Bearer", token: () => fetchToken() ?? "" },
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  },
  // Admin plugin for user management
  plugins: [adminClient()],
  emailVerification: {
    enabled: true,
    expiresIn: 1000 * 60 * 60 * 24,
  },
  // Note: Social providers (like Google) are configured on the backend.
  // Better Auth UI automatically detects available providers from the backend API.
  // The Google button will appear once the backend is configured with Google OAuth.
});








// import { createAuthClient } from "better-auth/client"
// import { adminClient } from "better-auth/client/plugins"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://herbel-api.onrender.com";

// export const authClient = createAuthClient({
//   baseURL: API_BASE_URL,
//   fetchOptions: {
//     credentials: "include", // Include cookies for session management
//     auth: {
//       type: "Bearer",
//       token: () => {
//         if (typeof window === "undefined") return "";
//         return localStorage.getItem("herbel_token") ?? "";
//       },
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   },
//   plugins: [
//     adminClient()
//   ]
// });
