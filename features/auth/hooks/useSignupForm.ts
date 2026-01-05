import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, store } from "@/store";
import { registerAction, getMeAction } from "@/store/actions/authActions";

export function useSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  // Redirect to dashboard when user is logged in
  useEffect(() => {
    console.log("[useSignupForm] useEffect triggered:", {
      isAuthenticated,
      isLoading,
      pathname,
      shouldRedirect:
        isAuthenticated && !isLoading && pathname?.startsWith("/auth"),
    });

    if (isAuthenticated && !isLoading && pathname?.startsWith("/auth")) {
      console.log("[useSignupForm] useEffect: Attempting to redirect to /");
      // Use a small delay to ensure state is fully persisted
      const timer = setTimeout(() => {
        console.log("[useSignupForm] useEffect: Executing router.replace('/')");
        router.replace("/");
      }, 100);
      return () => {
        console.log("[useSignupForm] useEffect: Cleanup timer");
        clearTimeout(timer);
      };
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  const handleSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("[useSignupForm] handleSignup: Starting signup process", {
        email,
      });

      // Validate passwords match
      if (password !== confirmPassword) {
        console.log("[useSignupForm] handleSignup: Passwords do not match");
        return;
      }

      try {
        console.log("[useSignupForm] handleSignup: Dispatching registerAction");
        const registerResult = await dispatch(
          registerAction({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone: phone || undefined,
            country: country || undefined,
          }),
        );
        console.log("[useSignupForm] handleSignup: registerAction result:", {
          type: registerResult.type,
          fulfilled: registerAction.fulfilled.match(registerResult),
          rejected: registerAction.rejected.match(registerResult),
        });

        // Check if registration was successful
        if (registerAction.fulfilled.match(registerResult)) {
          console.log(
            "[useSignupForm] handleSignup: Registration successful!",
            {
              hasToken: !!registerResult.payload?.accessToken,
              token:
                registerResult.payload?.accessToken?.substring(0, 20) + "...",
            },
          );

          // Wait a moment for Redux state to be fully updated and persisted
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Verify token is in state before proceeding
          const currentState = store.getState();
          const tokenInState = currentState.auth.token;
          console.log(
            "[useSignupForm] handleSignup: Token in state after delay:",
            {
              hasToken: !!tokenInState,
              tokenMatches:
                tokenInState === registerResult.payload?.accessToken,
            },
          );

          // Fetch user data first to ensure complete auth state
          try {
            console.log(
              "[useSignupForm] handleSignup: Dispatching getMeAction",
            );
            const getMeResult = await dispatch(getMeAction());
            console.log("[useSignupForm] handleSignup: getMeAction result:", {
              type: getMeResult.type,
              fulfilled: getMeAction.fulfilled.match(getMeResult),
              hasUserInfo: !!getMeResult.payload,
            });

            if (getMeAction.fulfilled.match(getMeResult)) {
              console.log(
                "[useSignupForm] handleSignup: getMeAction successful, navigating to /",
              );
              router.replace("/");
              console.log(
                "[useSignupForm] handleSignup: router.replace('/') called",
              );
            } else {
              console.warn(
                "[useSignupForm] handleSignup: getMeAction failed but navigating anyway",
              );
              router.replace("/");
            }
          } catch (err) {
            console.log(
              "[useSignupForm] handleSignup: getMeAction error:",
              err,
            );
            // Even if getMe fails, we have token and isAuthenticated is true
            // Try to navigate anyway
            console.log(
              "[useSignupForm] handleSignup: Navigating despite getMe error",
            );
            router.replace("/");
          }
        } else {
          // Registration failed - error is already set in the auth slice
          if (registerAction.rejected.match(registerResult)) {
            console.log(
              "[useSignupForm] handleSignup: Registration rejected:",
              registerResult.payload,
            );
          } else {
            console.log(
              "[useSignupForm] handleSignup: Registration failed with unknown result:",
              registerResult,
            );
          }
        }
      } catch (err) {
        // Error is handled by the auth slice
        console.log("[useSignupForm] handleSignup: Exception caught:", err);
      }
    },
    [
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      country,
      dispatch,
      router,
    ],
  );

  return {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    phone,
    country,
    isLoading,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
    setPhone,
    setCountry,
    handleSignup,
  };
}
