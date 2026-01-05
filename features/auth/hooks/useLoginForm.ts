import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, store } from "@/store";
import { loginAction, getMeAction } from "@/store/actions/authActions";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  // Redirect to dashboard when user is logged in
  useEffect(() => {
    console.log("[useLoginForm] useEffect triggered:", {
      isAuthenticated,
      isLoading,
      pathname,
      shouldRedirect:
        isAuthenticated && !isLoading && pathname?.startsWith("/auth"),
    });

    if (isAuthenticated && !isLoading && pathname?.startsWith("/auth")) {
      console.log("[useLoginForm] useEffect: Attempting to redirect to /");
      // Use a small delay to ensure state is fully persisted
      const timer = setTimeout(() => {
        console.log("[useLoginForm] useEffect: Executing router.replace('/')");
        router.replace("/");
      }, 100);
      return () => {
        console.log("[useLoginForm] useEffect: Cleanup timer");
        clearTimeout(timer);
      };
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("[useLoginForm] handleLogin: Starting login process", {
        email,
      });

      try {
        console.log("[useLoginForm] handleLogin: Dispatching loginAction");
        const loginResult = await dispatch(loginAction({ email, password }));
        console.log("[useLoginForm] handleLogin: loginAction result:", {
          type: loginResult.type,
          fulfilled: loginAction.fulfilled.match(loginResult),
          rejected: loginAction.rejected.match(loginResult),
        });

        // Check if login was successful
        if (loginAction.fulfilled.match(loginResult)) {
          console.log("[useLoginForm] handleLogin: Login successful!", {
            hasToken: !!loginResult.payload?.accessToken,
            token: loginResult.payload?.accessToken?.substring(0, 20) + "...",
          });

          // Wait a moment for Redux state to be fully updated and persisted
          await new Promise((resolve) => setTimeout(resolve, 100));

          // -----Verify token is in state before proceeding
          const currentState = store.getState();
          const tokenInState = currentState.auth.token;
          console.log(
            "[useLoginForm] handleLogin: Token in state after delay:",
            {
              hasToken: !!tokenInState,
              tokenMatches: tokenInState === loginResult.payload?.accessToken,
            },
          );

          // Fetch user data first to ensure complete auth state
          try {
            console.log("[useLoginForm] handleLogin: Dispatching getMeAction");
            const getMeResult = await dispatch(getMeAction());
            console.log("[useLoginForm] handleLogin: getMeAction result:", {
              type: getMeResult.type,
              fulfilled: getMeAction.fulfilled.match(getMeResult),
              hasUserInfo: !!getMeResult.payload,
            });

            if (getMeAction.fulfilled.match(getMeResult)) {
              console.log(
                "[useLoginForm] handleLogin: getMeAction successful, navigating to /",
              );
              router.replace("/");
              console.log(
                "[useLoginForm] handleLogin: router.replace('/') called",
              );
            } else {
              console.warn(
                "[useLoginForm] handleLogin: getMeAction failed but navigating anyway",
              );
              router.replace("/");
            }
          } catch (err) {
            console.log("[useLoginForm] handleLogin: getMeAction error:", err);
            // Even if getMe fails, we have token and isAuthenticated is true
            // Try to navigate anyway
            console.log(
              "[useLoginForm] handleLogin: Navigating despite getMe error",
            );
            router.replace("/");
          }
        } else {
          // Login failed - error is already set in the auth slice
          if (loginAction.rejected.match(loginResult)) {
            console.log(
              "[useLoginForm] handleLogin: Login rejected:",
              loginResult.payload,
            );
          } else {
            console.log(
              "[useLoginForm] handleLogin: Login failed with unknown result:",
              loginResult,
            );
          }
        }
      } catch (err) {
        // Error is handled by the auth slice
        console.log("[useLoginForm] handleLogin: Exception caught:", err);
      }
    },
    [email, password, dispatch, router],
  );

  const handleGoogleLogin = useCallback(() => {
    // Social login will be handled by Better Auth UI
    // The onSessionChange callback in AuthUIProvider will handle navigation

    router.push("/");
  }, [router]);

  return {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
  };
}
