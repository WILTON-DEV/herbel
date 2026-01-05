import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getMeAction } from "@/store/actions/authActions";

/**
 * Hook to sync Better Auth session with Redux store
 * Call this in the root layout or app component to ensure
 * authentication state is synced on page load/refresh
 *
 * This validates the persisted session on page load/refresh.
 * The persisted state is automatically restored by redux-persist,
 * and this hook validates it with the backend.
 */
export const useAuthSync = () => {
  const dispatch = useDispatch();
  const isSyncingRef = useRef(false);
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    // Only sync once on mount (after rehydration)
    if (hasSyncedRef.current || isSyncingRef.current) {
      return;
    }

    const syncAuth = async () => {
      isSyncingRef.current = true;
      hasSyncedRef.current = true;

      try {
        // Import store to get current state after rehydration
        const { store } = await import("@/store");
        const currentState = store.getState();
        const token = currentState.auth.token;

        // Only sync if we have a token in state
        // This prevents calling getMeAction when there's no token
        if (!token) {
          console.log("[useAuthSync] No token found, skipping sync");
          isSyncingRef.current = false;
          return;
        }

        console.log("[useAuthSync] Syncing auth session with token");
        // Get current state after rehydration
        // If we have a persisted token/auth state, validate it with the backend
        // This runs on page load/refresh to verify the session is still valid
        await dispatch(getMeAction() as any);
        // getMeAction will handle clearing auth state if session is invalid
      } catch (error) {
        console.log("Failed to sync auth session:", error);
      } finally {
        isSyncingRef.current = false;
      }
    };

    // Small delay to ensure persisted state is rehydrated by redux-persist
    const timeoutId = setTimeout(() => {
      syncAuth();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };

    // Note: onSessionChange is disabled because the endpoint doesn't exist on the backend
    // Session sync via getSession() on mount is sufficient
    // Session changes will be detected on page refresh/navigation
    // If you need real-time session updates, implement the endpoint on the backend first

    // Uncomment below if you implement /api/auth/on-session-change on the backend:
    /*
    let unsubscribe: (() => void) | undefined;
    try {
      if (typeof authClient.onSessionChange === "function") {
        unsubscribe = authClient.onSessionChange((session) => {
          if (session?.user) {
            const sessionUser = session.user;
            // Type assertion for extended user fields not in Better Auth type definition
            const extendedUser = sessionUser as typeof sessionUser & {
              contact?: string | null;
              role?: string | null;
              gender?: string | null;
            };
            
            // Map gender from session to enum value, defaulting to MALE if invalid
            const mapGender = (gender: string | null | undefined): "MALE" | "FEMAL" => {
              if (gender === "MALE" || gender === "FEMAL") {
                return gender;
              }
              return "MALE";
            };

            // Map role from session to enum value, defaulting to TENANT if null/invalid
            const mapRole = (role: string | null | undefined): "TENANT" | "PROPERTY_OWNER" | "SUPPORT_AGENT" | "SERVICE_PROVIDER" => {
              if (role === "TENANT" || role === "PROPERTY_OWNER" || role === "SUPPORT_AGENT" || role === "SERVICE_PROVIDER") {
                return role;
              }
              return "TENANT";
            };

            const user: User = {
              id: sessionUser.id || "",
              email: sessionUser.email || "",
              name: sessionUser.name || "",
              phone: extendedUser.contact || "", // Map contact to phone
              role: mapRole(extendedUser.role),
              gender: mapGender(extendedUser.gender),
              agreedToTerms: true,
              password: "",
              verified: sessionUser.emailVerified || false,
              accountStatus: "ACTIVE",
            };
            dispatch(loginSuccess(user));
          } else {
            dispatch(logoutSuccess());
          }
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.debug("Session change subscription not available:", error);
      }
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
    */
  }, []); // Only run once on mount (after rehydration)
};
