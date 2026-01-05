import { AuthState } from "@/zod/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginAction,
  registerAction,
  logoutAction,
  getMeAction,
  updateProfileAction,
  googleLoginAction,
  forgotPasswordAction,
  changePasswordAction,
} from "../actions/authActions";

const initialState: AuthState = {
  token: null,
  userInfo: null,
  isAuthenticated: false,
  hasSeenOnboarding: false,
  isLoading: false,
  error: null,
  message: null,
  screen: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnboardingStatus: (state, action) => {
      state.hasSeenOnboarding = action.payload;
      if (action.payload === true) {
        state.hasSeenOnboarding = true;
      }
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.message = null;
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        console.log("[authSlice] loginAction.pending");
        state.isLoading = true;
        state.screen = "login";
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        console.log("[authSlice] loginAction.fulfilled", {
          hasToken: !!payload.accessToken,
          tokenLength: payload.accessToken?.length,
        });
        state.isLoading = false;
        state.token = payload.accessToken;
        state.isAuthenticated = true;
        state.hasSeenOnboarding = true;
        state.message = "Login successful";
        state.error = null;
        console.log("[authSlice] State updated:", {
          isAuthenticated: state.isAuthenticated,
          hasToken: !!state.token,
          isLoading: state.isLoading,
        });
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(updateProfileAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload;
        state.message = "Profile updated successfully";
        state.error = null;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.screen = "register";
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.accessToken;
        state.isAuthenticated = true;
        state.hasSeenOnboarding = true;
        state.message = "Registration successful";
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(googleLoginAction.pending, (state) => {
        state.isLoading = true;
        state.screen = "googleLogin";
        state.error = null;
      })
      .addCase(googleLoginAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(googleLoginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPasswordAction.pending, (state) => {
        state.isLoading = true;
        state.screen = "forgot-password";
        state.error = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "Password reset email sent successfully";
        state.error = null;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changePasswordAction.pending, (state) => {
        state.isLoading = true;
        state.screen = "change-password";
        state.error = null;
      })
      .addCase(changePasswordAction.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "Password changed successfully";
        state.error = null;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
        state.screen = "logout";
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.userInfo = null;
        state.isAuthenticated = false;
        state.message = "Logout successful";
        state.error = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getMeAction.pending, (state) => {
        console.log("[authSlice] getMeAction.pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMeAction.fulfilled, (state, action) => {
        console.log("[authSlice] getMeAction.fulfilled", {
          hasUserInfo: !!action.payload,
          userEmail: action.payload?.email,
        });
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        console.log("[authSlice] State updated:", {
          isAuthenticated: state.isAuthenticated,
          hasUserInfo: !!state.userInfo,
          isLoading: state.isLoading,
        });
      })
      .addCase(getMeAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setOnboardingStatus,
  setMessage,
  setError,
  clearMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
