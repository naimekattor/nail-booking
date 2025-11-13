// lib/auth.ts
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Type definitions (optional but recommended)
 */
interface AuthResponse {
  status: string;
  code: number;
  data: {
    Message?: string;
    refresh_token: string;
    access_token: string;
    user?: any; // define your user model here
  };
  error?: Record<string, any>;
  meta?: { timestamp: string };
}

/**
 * Signup
 */
export async function signup(payload: {
  email: string;
  password: string;
  signup_method?: string;
}): Promise<AuthResponse> {
  const res = await apiClient<AuthResponse>("accounts/bussiness-register/email/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setAuthFromResponse(res);
  return res;
}

/**
 * Login
 */
export async function login(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await apiClient<AuthResponse>("user_service/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setAuthFromResponse(res);
  return res;
}

/**
 * Forgot Password
 */
export async function forgotPassword(payload: { email: string }) {
  return apiClient("user_service/forgot-password/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Reset Password
 */
export async function resetPassword(payload: {
  token: string;
  password: string;
}) {
  return apiClient("user_service/reset-password/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Verify Email
 */
export async function verifyEmail(payload: { token: string }) {
  return apiClient("user_service/verify-email/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Handle login/signup response
 */
export function setAuthFromResponse(res: AuthResponse) {
  const store = useAuthStore.getState();

  if (res?.data?.access_token) {
    store.setToken(res.data.access_token);
    localStorage.setItem("access_token", res.data.access_token);
  }

  if (res?.data?.refresh_token) {
    store.setRefreshToken(res.data.refresh_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
  }

  if (res?.data?.user) {
    store.setUser(res.data.user);
  }

  console.log("✅ Auth stored:", res?.data?.user);
}

/**
 * Optional: Verify token validity
 */
export async function verifyToken() {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!token) return false;

    const res = await apiClient("user_service/verify-token/", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch {
    return false;
  }
}
