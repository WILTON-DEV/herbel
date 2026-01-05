"use client";

import { useAuthSync } from "@/features/auth/hooks";

/**
 * Client component that syncs authentication on mount
 * Must be inside ReduxProvider
 */
export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  useAuthSync();
  return <>{children}</>;
}
