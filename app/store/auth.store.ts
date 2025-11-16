import { create } from "zustand";

type User = { id: string; username: string };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    if (u && t) {
      set({
        user: JSON.parse(u),
        token: t,
        isAuthenticated: true,
      });
    }
  },
}));
