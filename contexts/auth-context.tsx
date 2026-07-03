"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
  type User as FbUser,
} from "firebase/auth";
import { firebaseAuth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { authApi, setDevToken, type BackendUser, type UserRole } from "@/lib/api";

const SESSION_COOKIE = "oyenaukri_logged_in";
const DEV_ROLE_KEY = "oyenaukri_dev_role";
const DEV_PROFILE_KEY = "oyenaukri_dev_profile";

function setSessionCookie(present: boolean) {
  if (typeof document === "undefined") return;
  if (present) {
    document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
  } else {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
  }
}

function devProfileFromStorage(): BackendUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(DEV_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BackendUser;
  } catch {
    return null;
  }
}

export interface AuthContextValue {
  loading: boolean;
  isAuthenticated: boolean;
  firebaseUser: FbUser | null;
  profile: BackendUser | null;
  role: UserRole | null;
  onboardingCompleted: boolean;
  isDevMode: boolean;
  error: string | null;
  clearError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  refreshProfile: () => Promise<void>;
  markOnboardingComplete: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FbUser | null>(null);
  const [profile, setProfile] = useState<BackendUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Keeps the latest idToken available for the api wrapper in dev mode.
  const devUidRef = useRef<string | null>(null);

  const isDevMode = !isFirebaseConfigured;

  // Load backend profile from a firebase user.
  async function loadProfileFromFirebase(user: FbUser) {
    try {
      // Use the user supplied by Firebase's auth result/callback directly.
      // Reading auth.currentUser here can briefly return null during a login
      // transition, which caused requests without an Authorization header.
      const idToken = await user.getIdToken();
      const { user: backendUser } = await authApi.session(idToken);
      setProfile(backendUser);
      setError(null);
    } catch (e) {
      // Do not invent a local profile for a real Firebase account. Doing so
      // lets role selection continue after a rejected session and bypasses the
      // backend's onboarding state.
      setProfile(null);
      setError(friendlyError(e));
      throw e;
    }
  }

  useEffect(() => {
    if (isFirebaseConfigured && firebaseAuth) {
      const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
        setLoading(true);
        if (user) {
          setFirebaseUser(user);
          setSessionCookie(true);
          try {
            await loadProfileFromFirebase(user);
          } catch {
            // The error is exposed through context; remain on the auth page.
          }
        } else {
          setFirebaseUser(null);
          setProfile(null);
          setSessionCookie(false);
        }
        setLoading(false);
      });
      return unsub;
    }

    // ---- Dev mode (Firebase not configured) ----
    const stored = devProfileFromStorage();
    if (stored) {
      setProfile(stored);
      setFirebaseUser({
        uid: stored.firebaseUid,
        email: stored.email,
        displayName: stored.displayName ?? null,
      } as FbUser);
      devUidRef.current = stored.firebaseUid;
      setSessionCookie(true);
    }
    setLoading(false);
    return;
  }, [isFirebaseConfigured]);

  function friendlyError(e: unknown): string {
    const code = (e as { code?: string })?.code ?? "";
    const map: Record<string, string> = {
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/email-already-in-use": "An account already exists for this email.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
      "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
    return map[code] ?? (e instanceof Error ? e.message : "Something went wrong.");
  }

  async function signInWithEmail(email: string, password: string) {
    setError(null);
    try {
      if (isFirebaseConfigured && firebaseAuth) {
        const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
        await loadProfileFromFirebase(cred.user);
        setFirebaseUser(cred.user);
        setSessionCookie(true);
      } else {
        await devSignIn(email, "Job Seeker");
      }
    } catch (e) {
      setError(friendlyError(e));
      throw e;
    }
  }

  async function signUpWithEmail(email: string, password: string, displayName: string) {
    setError(null);
    try {
      if (isFirebaseConfigured && firebaseAuth) {
        const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        if (displayName) await updateProfile(cred.user, { displayName });
        await loadProfileFromFirebase(cred.user);
        setFirebaseUser(cred.user);
        setSessionCookie(true);
      } else {
        await devSignIn(email, displayName || "New User");
      }
    } catch (e) {
      setError(friendlyError(e));
      throw e;
    }
  }

  async function signInWithGoogle() {
    setError(null);
    try {
      if (isFirebaseConfigured && firebaseAuth) {
        const cred = await signInWithPopup(firebaseAuth, googleProvider);
        await loadProfileFromFirebase(cred.user);
        setFirebaseUser(cred.user);
        setSessionCookie(true);
      } else {
        await devSignIn(`dev-${Date.now()}@example.com`, "Google Dev User");
      }
    } catch (e) {
      setError(friendlyError(e));
      throw e;
    }
  }

  // Dev-mode fake sign-in (only used when Firebase is not configured).
  async function devSignIn(email: string, displayName: string) {
    const uid = `dev-${email}`;
    devUidRef.current = uid;
    const token = `dev:${uid}:${email}`;
    setDevToken(token);
    const stored = devProfileFromStorage();
    const devProfile: BackendUser =
      stored && stored.email === email
        ? stored
        : {
            id: uid,
            firebaseUid: uid,
            email,
            emailVerified: true,
            displayName,
            provider: "PASSWORD",
            role: null,
            onboardingCompleted: false,
          };
    localStorage.setItem(DEV_PROFILE_KEY, JSON.stringify(devProfile));
    setProfile(devProfile);
    setFirebaseUser({ uid, email, displayName } as FbUser);
    setSessionCookie(true);
  }

  async function selectRole(role: UserRole) {
    setError(null);
    if (!profile) return;
    try {
      if (isFirebaseConfigured && firebaseAuth?.currentUser) {
        const idToken = await firebaseAuth.currentUser.getIdToken();
        const { user: updated } = await authApi.setRole(role, idToken);
        setProfile(updated);
      } else {
        const updated: BackendUser = { ...profile, role, roleSelectedAt: new Date().toISOString() };
        localStorage.setItem(DEV_PROFILE_KEY, JSON.stringify(updated));
        localStorage.setItem(DEV_ROLE_KEY, role);
        setProfile(updated);
      }
    } catch (e) {
      setError(friendlyError(e));
      throw e;
    }
  }

  async function refreshProfile() {
    if (isFirebaseConfigured && firebaseAuth?.currentUser) {
      try {
        const { user } = await authApi.me();
        setProfile(user);
      } catch {
        /* ignore */
      }
    } else {
      const stored = devProfileFromStorage();
      if (stored) setProfile(stored);
    }
  }

  async function markOnboardingComplete() {
    if (!profile) return;
    if (isFirebaseConfigured && firebaseAuth?.currentUser) {
      try {
        const { user } = await authApi.me();
        setProfile(user);
      } catch {
        setProfile({ ...profile, onboardingCompleted: true });
      }
    } else {
      const updated: BackendUser = { ...profile, onboardingCompleted: true };
      localStorage.setItem(DEV_PROFILE_KEY, JSON.stringify(updated));
      setProfile(updated);
    }
  }

  async function signOut() {
    setError(null);
    if (isFirebaseConfigured && firebaseAuth) {
      await fbSignOut(firebaseAuth);
    }
    setDevToken(null);
    localStorage.removeItem(DEV_PROFILE_KEY);
    localStorage.removeItem(DEV_ROLE_KEY);
    setProfile(null);
    setFirebaseUser(null);
    setSessionCookie(false);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      isAuthenticated: Boolean(profile),
      firebaseUser,
      profile,
      role: profile?.role ?? null,
      onboardingCompleted: profile?.onboardingCompleted ?? false,
      isDevMode,
      error,
      clearError: () => setError(null),
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      selectRole,
      refreshProfile,
      markOnboardingComplete,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, profile, firebaseUser, isDevMode, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
