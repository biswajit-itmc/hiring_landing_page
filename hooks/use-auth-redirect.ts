"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

/**
 * After auth resolves, send the user to the right place:
 *  - no profile  -> /login
 *  - profile but no role -> /role
 *  - profile + role but not onboarded -> /onboarding/<seeker|employer>
 *  - profile + role + onboarded -> /dashboard/<seeker|employer>
 */
export function useAuthRedirect(next?: string) {
  const { loading, profile, role, onboardingCompleted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!profile) return; // stay on auth page
    if (!role) {
      router.replace("/role");
      return;
    }
    if (!onboardingCompleted) {
      router.replace(`/onboarding/${role.toLowerCase()}`);
      return;
    }
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      router.replace(next);
      return;
    }
    router.replace(`/dashboard/${role.toLowerCase()}`);
  }, [loading, profile, role, onboardingCompleted, next, router]);
}
