import { create } from "zustand";
import Cookies from "js-cookie";

type User = { id: string; username: string };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  register: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
  createTeam: (teamData: TeamData) => Promise<void>;
}

interface TeamData {
  teamname: string;
  descriptions: string;
  organization_id: string;
  email: string;
  phoneNumber: string;
  users: string[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  register: (user, token) => {
    // Set cookies with expiration (7 days)
    Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });
    Cookies.set("token", token, { expires: 7, path: "/" });
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("user");
    Cookies.remove("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    const userCookie = Cookies.get("user");
    const tokenCookie = Cookies.get("token");

    if (userCookie && tokenCookie) {
      try {
        const userData = JSON.parse(userCookie);
        set({
          user: userData,
          token: tokenCookie,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
        // Clear invalid cookies
        Cookies.remove("user");
        Cookies.remove("token");
      }
    }
  },

  createTeam: async (teamData: TeamData) => {
    const { token } = get();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch("http://localhost:3001/api/v1/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to create team: ${response.statusText}`
      );
    }

    return await response.json();
  },
}));
