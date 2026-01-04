import { create } from "zustand";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company?: {
    name: string;
  };
}

interface UserState {
  users: User[];
  total: number;
  loading: boolean;
  cache: Record<string, { users: User[]; total: number }>;
  fetchUsers: (limit: number, skip: number, query?: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  cache: {},

  fetchUsers: async (limit, skip, query) => {
    const key = `${limit}-${skip}-${query || ""}`;
    const cached = get().cache[key];

    // ✅ Return cached data if available
    if (cached) {
      set({
        users: cached.users,
        total: cached.total,
      });
      return;
    }

    set({ loading: true });

    const url = query
      ? `https://dummyjson.com/users/search?q=${query}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await axios.get(url);

    set((state) => ({
      users: res.data.users,
      total: res.data.total,
      loading: false,
      cache: {
        ...state.cache,
        [key]: {
          users: res.data.users,
          total: res.data.total,
        },
      },
    }));
  },
}));
