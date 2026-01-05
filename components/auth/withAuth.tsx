"use client";

import { ComponentType } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * Higher-Order Component (HOC) for protecting routes
 * Wraps a component with authentication checking
 *
 * @example
 * ```tsx
 * export default withAuth(DashboardPage);
 * ```
 */
export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options?: {
    redirectTo?: string;
  },
) {
  return function WithAuthComponent(props: P) {
    return (
      <ProtectedRoute redirectTo={options?.redirectTo}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
