// stores/useAuthStore.ts
"use client";

import { create } from "zustand";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user }),
  setToken: (accessToken) => {
    localStorage.setItem("access_token", accessToken);
    set({ accessToken });
  },
  setRefreshToken: (refreshToken) => {
    localStorage.setItem("refresh_token", refreshToken);
    set({ refreshToken });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
