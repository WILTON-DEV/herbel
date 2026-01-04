import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  basePath:'/api/auth',
  fetchOptions: {
    credentials: "include",
    auth: {
      type: "Bearer",
      token: () => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("herbel_token") ?? "";
      },
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  plugins: [
    adminClient()
  ]
});
