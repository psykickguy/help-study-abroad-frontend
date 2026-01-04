import { create } from "zustand";
import axios from "axios";

interface AuthState {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  login: async (username: string, password: string) => {
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.accessToken);
      set({ token: res.data.accessToken });

      return true;
    } catch (err: any) {
      console.error("LOGIN ERROR:", err?.response?.data || err.message);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
