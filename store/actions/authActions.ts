import {
  AuthResponse,
  ChangePasswordModel,
  ForgotPasswordModel,
  LoginModel,
  RegisterFormModel,
  UserModel,
} from "@/zod/schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../slices/authSlice";
import type { RootState } from "../index";

const serializeUser = (user: any): UserModel => {
  if (!user) return user;
  return {
    ...user,
    createdAt: user.createdAt
      ? typeof user.createdAt === "string"
        ? user.createdAt
        : user.createdAt.toISOString()
      : undefined,
    updatedAt: user.updatedAt
      ? typeof user.updatedAt === "string"
        ? user.updatedAt
        : user.updatedAt.toISOString()
      : undefined,
  };
};

const getErrorMessage = (error: any): string => {
  if (error.responseText) {
    try {
      const errorData = JSON.parse(error.responseText);
      if (errorData.message) return errorData.message;
      if (errorData.code) return getErrorMessageFromCode(errorData.code);
    } catch (e) {
      // Ignore parse errors
    }
  }
  if (error.code) {
    return getErrorMessageFromCode(error.code);
  }

  if (error.error?.code) {
    return getErrorMessageFromCode(error.error.code);
  }

  if (error.message) {
    return error.message;
  }

  const status = error.status || error.error?.status || error.response?.status;
  switch (status) {
    case 401:
      return "Invalid email or password. Please try again.";
    case 500:
      return "Server error. Please try again later.";
    case 404:
      return "Service not found. Please contact support.";
    case 403:
      return "Access denied. Please check your credentials.";
    case 400:
      return "Bad request. Please check your input and try again.";
    default:
      return "An error occurred. Please try again.";
  }
};

const getErrorMessageFromCode = (code: string): string => {
  const errorMessages: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password. Please try again.",
    INVALID_PASSWORD:
      "The current password you entered is incorrect. Please try again.",
    VALIDATION_ERROR: "Please check your email and password.",
    USER_NOT_FOUND: "No account found with this email.",
    ACCOUNT_DISABLED: "Your account has been disabled. Please contact support.",
    TOO_MANY_REQUESTS: "Too many login attempts. Please try again later.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    RESET_PASSWORD_ISNT_ENABLED:
      "Password reset is not enabled. Please contact support for assistance.",
  };
  return errorMessages[code] || "An error occurred. Please try again.";
};

export const getMeAction = createAsyncThunk<
  UserModel,
  void,
  { rejectValue: string; state: RootState }
>("auth/getMe", async (_, { rejectWithValue, dispatch, getState }) => {
  try {
    console.log("[getMeAction] Starting getMe request");

    // Get Bearer token from Redux state
    const token = getState().auth.token;
    console.log(
      "[getMeAction] Token from state:",
      token ? token.substring(0, 20) + "..." : "NO TOKEN",
    );

    if (!token) {
      console.log("[getMeAction] No token found in state");
      return rejectWithValue("No token found");
    }

    // Use Bearer token to get session
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";
    const url = `${baseURL}${basePath}/get-session`;

    console.log("[getMeAction] Making request to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      "[getMeAction] Response status:",
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      const status = response.status;
      console.log("[getMeAction] Request failed:", { status });
      if (status === 401) {
        console.log("[getMeAction] 401 Unauthorized, dispatching logout");
        dispatch(logoutAction());
      }
      const errorText = await response.text();
      let errorMessage = "Failed to get session";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }

    const data = await response.json();
    console.log("[getMeAction] Response data:", {
      hasUser: !!data?.user,
      userEmail: data?.user?.email,
    });

    if (!data?.user) {
      console.log("[getMeAction] No user in response:", data);
      return rejectWithValue("No session found");
    }

    console.log("[getMeAction] getMe successful, returning user");
    return serializeUser(data.user) as UserModel;
  } catch (error: any) {
    console.log("[getMeAction] Exception caught:", error);
    const status = error.response?.status || error.status;
    if (status === 401) {
      console.log("[getMeAction] 401 in catch, dispatching logout");
      dispatch(logoutAction());
    }
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to get session";
    return rejectWithValue(errorMessage);
  }
});

export const updateProfileAction = createAsyncThunk<
  UserModel,
  any,
  { rejectValue: string; state: RootState }
>("auth/updateProfile", async (updateData, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";

    // Update user profile
    const updateResponse = await fetch(`${baseURL}${basePath}/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      let errorMessage = "Failed to update profile";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }

    // Get updated session
    const sessionResponse = await fetch(`${baseURL}${basePath}/get-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!sessionResponse.ok) {
      return rejectWithValue("Profile updated but failed to refresh session");
    }

    const sessionData = await sessionResponse.json();

    if (!sessionData?.user) {
      return rejectWithValue(
        "Profile updated but failed to refresh session: no user found",
      );
    }

    return serializeUser(sessionData.user) as UserModel;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to update profile";
    return rejectWithValue(errorMessage);
  }
});

export const loginAction = createAsyncThunk<
  AuthResponse,
  LoginModel,
  { rejectValue: string }
>("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    console.log("[loginAction] Starting login request", {
      email: loginData.email,
    });

    // Use direct fetch to get Bearer token from response
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";
    const url = `${baseURL}${basePath}/sign-in/email`;

    console.log("[loginAction] Making request to:", url);

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password,
        }),
      });
    } catch (fetchError: any) {
      console.log("[loginAction] Fetch error (network/CORS):", fetchError);
      return rejectWithValue(
        fetchError.message || "Network error. Please check your connection.",
      );
    }

    console.log(
      "[loginAction] Response status:",
      response.status,
      response.statusText,
      "Content-Type:",
      response.headers.get("content-type"),
    );

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
        console.log("[loginAction] Request failed:", {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText || "(empty response body)",
          contentType: response.headers.get("content-type"),
        });
      } catch (textError) {
        console.log("[loginAction] Failed to read error response:", textError);
        errorText = "";
      }

      let errorMessage = "Invalid email or password. Please try again.";

      // Try to parse JSON error if response has content
      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message ||
            getErrorMessageFromCode(errorData.code) ||
            errorMessage;
        } catch {
          // If it's not JSON, use the text as error message (or default)
          errorMessage =
            errorText.length > 200
              ? "Invalid email or password. Please try again."
              : errorText || errorMessage;
        }
      } else {
        // No error text, use status-based message
        if (response.status === 401) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (response.status === 404) {
          errorMessage = "Login endpoint not found. Please contact support.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = `Login failed (${response.status}). Please try again.`;
        }
      }

      return rejectWithValue(errorMessage);
    }

    const data = await response.json();
    console.log("[loginAction] Response data:", {
      hasSession: !!data?.session,
      hasToken: !!data?.token,
      sessionToken: data?.session?.token?.substring(0, 20) + "...",
      directToken: data?.token?.substring(0, 20) + "...",
    });

    // Extract token from response - Better Auth returns token in session.token
    const token = data?.session?.token || data?.token || "";

    if (!token) {
      console.log("[loginAction] No token found in response:", data);
      return rejectWithValue("Login successful but no token received");
    }

    console.log("[loginAction] Login successful, returning token");
    return {
      accessToken: token,
      refreshToken: "",
    } as AuthResponse;
  } catch (error: any) {
    console.log("[loginAction] Exception caught:", error);
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});

export const logoutAction = createAsyncThunk<
  void,
  void,
  { rejectValue: string; state: RootState }
>("auth/logout", async (_, { rejectWithValue, dispatch, getState }) => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";

    // Get token from state before clearing it
    const token = getState().auth.token;

    // Dispatch logout reducer to clear local state first
    dispatch(logout());

    // Call sign-out endpoint with Bearer token if available
    if (token) {
      try {
        const response = await fetch(`${baseURL}${basePath}/sign-out`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = "Failed to sign out";
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
          // Don't fail logout if API call fails - we've already cleared local state
          console.warn("Sign out API call failed:", errorMessage);
        }
      } catch (apiError) {
        // Don't fail logout if API call fails - we've already cleared local state
        console.warn("Sign out API call error:", apiError);
      }
    }

    return;
  } catch (error: any) {
    // Even if signOut fails, local state is already cleared
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});

export const googleLoginAction = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/googleLogin", async (_, { rejectWithValue }) => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";

    // Get the current origin for the callback URL
    const callbackURL =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "https://herbel-api.onrender.com/auth/callback";

    // Better Auth social login typically returns a redirect URL
    const response = await fetch(`${baseURL}${basePath}/sign-in/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: "google",
        callbackURL: callbackURL,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Google login failed";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage =
          errorData.message ||
          getErrorMessageFromCode(errorData.code) ||
          errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }

    const data = await response.json();
    console.log(data, "google login data");

    // Check if response contains a redirect URL
    if (data?.url || data?.redirectUrl) {
      // Redirect to the OAuth provider
      if (typeof window !== "undefined") {
        window.location.href = data.url || data.redirectUrl;
      }
      return;
    }

    // If no redirect URL, the response might contain the token directly
    // This would happen if OAuth flow is handled differently
    if (data?.session?.token || data?.token) {
      // Token received directly - this shouldn't happen with OAuth but handle it
      console.log("Token received directly from Google login");
      return;
    }

    // If we get here, the response format is unexpected
    console.warn("Unexpected Google login response format:", data);
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const registerAction = createAsyncThunk<
  AuthResponse,
  RegisterFormModel,
  { rejectValue: string }
>("auth/register", async (registerData, { rejectWithValue }) => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";

    // Register user
    const response = await fetch(`${baseURL}${basePath}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerData.email.trim(),
        password: registerData.password,
        name: `${registerData.first_name} ${registerData.last_name}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Registration failed. Please try again.";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage =
          errorData.message ||
          getErrorMessageFromCode(errorData.code) ||
          errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }

    const data = await response.json();

    // Extract token from response
    const token = data?.session?.token || data?.token || "";

    if (!token) {
      return rejectWithValue("Registration successful but no token received");
    }

    // Update user profile with additional fields after successful registration
    if (token && (registerData.country || registerData.phone)) {
      const updateData: Record<string, any> = {};
      if (registerData.country) updateData.country = registerData.country;
      if (registerData.phone) updateData.contact = registerData.phone;

      if (Object.keys(updateData).length > 0) {
        try {
          await fetch(`${baseURL}${basePath}/update-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          });
        } catch (updateError) {
          // Log but don't fail registration if profile update fails
          console.warn(
            "Failed to update user profile after registration:",
            updateError,
          );
        }
      }
    }

    return {
      accessToken: token,
      refreshToken: "",
    } as AuthResponse;
  } catch (error: any) {
    console.log("Registration exception:", error);
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});

export const forgotPasswordAction = createAsyncThunk<
  void,
  ForgotPasswordModel,
  { rejectValue: string }
>("auth/forgotPassword", async (forgotPasswordData, { rejectWithValue }) => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      "https://api.epicrealtylistings.com";
    const basePath = "/api/auth";

    const response = await fetch(`${baseURL}${basePath}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotPasswordData.email.trim(),
        redirectTo: "/change-password",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to send password reset email";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage =
          errorData.message ||
          getErrorMessageFromCode(errorData.code) ||
          errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }

    return;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const changePasswordAction = createAsyncThunk<
  void,
  ChangePasswordModel,
  { rejectValue: string; state: RootState }
>(
  "auth/changePassword",
  async (changePasswordData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("No token found");
      }

      const baseURL =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
        "https://api.epicrealtylistings.com";
      const basePath = "/api/auth";

      const response = await fetch(`${baseURL}${basePath}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: changePasswordData.current_password,
          newPassword: changePasswordData.new_password,
          revokeOtherSessions: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Failed to change password";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message ||
            getErrorMessageFromCode(errorData.code) ||
            errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        return rejectWithValue(errorMessage);
      }

      return;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
