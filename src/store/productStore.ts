import { create } from "zustand";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  categories: string[];
  cache: Record<string, { products: Product[]; total: number }>;

  fetchProducts: (
    limit: number,
    skip: number,
    search?: string,
    category?: string
  ) => Promise<void>;

  fetchCategories: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  categories: [],
  cache: {},

  fetchProducts: async (limit, skip, search, category) => {
    const key = `${limit}-${skip}-${search || "all"}-${category || "all"}`;
    const cached = get().cache[key];

    // ✅ Use cached data if present
    if (cached) {
      set({
        products: cached.products,
        total: cached.total,
      });
      return;
    }

    set({ loading: true });

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await axios.get(url);

    set((state) => ({
      products: res.data.products,
      total: res.data.total,
      loading: false,
      cache: {
        ...state.cache,
        [key]: {
          products: res.data.products,
          total: res.data.total,
        },
      },
    }));
  },

  fetchCategories: async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    set({ categories: res.data });
  },
}));
