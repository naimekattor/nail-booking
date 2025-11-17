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
  const res = await apiClient<AuthResponse>("accounts/business-register/email/", {
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
  const res = await apiClient<AuthResponse>("accounts/business-login/email/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setAuthFromResponse(res);
  return res;
}
/**
 * Login
 */
export async function authLogin(payload: {
  method: string;
  success_url: string;
  cancel_url: string;
}): Promise<AuthResponse> {
  const res = await apiClient<AuthResponse>("accounts/business-login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });


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
 * Verify Code
 */
export async function verifyCode(payload: { 
  email: string;
  otp: string ;
}) {
  return apiClient("accounts/bussiness/activate-account/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
/** 
 * Verify Code
 */
export async function resendCode(payload: { 
  email: string;
}) {
  return apiClient("/accounts/bussiness/difiwow889%40canvect.com/request-otp/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Handle login/signup response
 */
export function setAuthFromResponse(res: AuthResponse) {
  const store = useAuthStore.getState();

  if (res?.access_token) {
    store.setToken(res.access_token);
    localStorage.setItem("access_token", res.access_token);
  }

  if (res?.refresh_token) {
    store.setRefreshToken(res.refresh_token);
    localStorage.setItem("refresh_token", res.refresh_token);
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
