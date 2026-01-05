"use client";

import { FullPageSkeleton } from "@/components/ui/skeletons";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 * Wraps components that require authentication
 * Redirects to login page if user is not authenticated
 *
 * @param children - Child components to render if authenticated
 * @param requireAuth - Whether authentication is required (default: true)
 * @param redirectTo - Where to redirect if not authenticated (default: /auth/sign-in)
 */
export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/auth/sign-in",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    // Only redirect if:
    // 1. Not currently loading
    // 2. Auth is required
    // 3. Not authenticated
    // 4. Not already on the redirect page (to avoid redirect loops)
    if (
      !isLoading &&
      requireAuth &&
      !isAuthenticated &&
      typeof window !== "undefined" &&
      window.location.pathname !== redirectTo
    ) {
      // User is not authenticated, redirect to login
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <FullPageSkeleton />;
  }

  // If auth is required but user is not logged in, show nothing (will redirect)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // User is authenticated or auth is not required, render children
  return <>{children}</>;
}
