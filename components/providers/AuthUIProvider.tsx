"use client";

import { AuthUIProvider as BetterAuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeAction, loginAction } from "@/store/actions/authActions";
import { RootState } from "@/store";
import { authClient } from "@/lib/auth-client";



export function AuthUIProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <BetterAuthUIProvider
      authClient={authClient as any}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={async (session?: unknown) => {
        console.log("[AuthUIProvider] onSessionChange triggered", {
          hasToken: !!token,
          isAuthenticated,
          pathname,
          hasSession: !!session,
        });

        try {
          // After OAuth callback, get the session from Better Auth
          // and extract the token to store in Redux
          if (session && !token) {
            console.log(
              "[AuthUIProvider] onSessionChange: Session found after OAuth, extracting token",
            );

            try {
              // Get the full session from Better Auth client
              const fullSession = await authClient.getSession();
              console.log("[AuthUIProvider] Full session:", fullSession);

              // Try to get token from session - Better Auth might store it differently
              let sessionToken: string | null = null;

              // Check various possible locations for the token
              // Type assertion needed because Better Auth types don't include token property
              const sessionData = fullSession?.data as any;
              if (sessionData?.session?.token) {
                sessionToken = sessionData.session.token;
              } else if (sessionData?.token) {
                sessionToken = sessionData.token;
              } else if (typeof window !== "undefined") {
                // Try to get token from cookies (Better Auth might store it there)
                const cookies = document.cookie.split(";");
                for (const cookie of cookies) {
                  const [name, value] = cookie.trim().split("=");
                  if (
                    name === "better-auth.session_token" ||
                    name === "better-auth.token"
                  ) {
                    sessionToken = decodeURIComponent(value);
                    break;
                  }
                }
              }

              if (sessionToken) {
                console.log(
                  "[AuthUIProvider] Token extracted from session, storing in Redux",
                );
                // Import store to dispatch action directly
                const { store } = await import("@/store");
                store.dispatch(
                  loginAction.fulfilled(
                    {
                      accessToken: sessionToken,
                      refreshToken: "",
                    },
                    "auth/googleLogin",
                    { email: "", password: "" }, // Dummy LoginModel for OAuth flow
                  ) as any,
                );
              } else {
                console.log(
                  "[AuthUIProvider] No token found in session, will try getMeAction with Better Auth session",
                );
              }
            } catch (sessionError) {
              console.log(
                "[AuthUIProvider] Error getting session:",
                sessionError,
              );
            }
          }

          // Wait a bit for Redux state to update if we just set the token
          if (session && !token) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          // Clear router cache (protected routes)
          router.refresh();

          // Check if we have a session and are on an auth page (including callback)
          if (pathname?.startsWith("/auth")) {
            try {
              // Get current token from Redux state
              const { store } = await import("@/store");
              const currentState = store.getState();
              const currentToken = currentState.auth.token;

              if (currentToken) {
                console.log(
                  "[AuthUIProvider] onSessionChange: Calling getMeAction",
                );
                // Fetch user data to Redux
                await dispatch(getMeAction() as any);

                // Redirect to home after a short delay to ensure state is updated
                setTimeout(() => {
                  console.log(
                    "[AuthUIProvider] onSessionChange: Navigating to /",
                  );
                  router.replace("/");
                }, 300);
              } else {
                console.log(
                  "[AuthUIProvider] onSessionChange: No token available yet",
                );
              }
            } catch (error) {
              console.log("Failed to check session on change:", error);
            }
          }
        } catch (error) {
          console.log("[AuthUIProvider] onSessionChange error:", error);
        }
      }}
      Link={Link}
      social={{
        providers: ["google"],
      }}
    >
      {children}
    </BetterAuthUIProvider>
  );
}
