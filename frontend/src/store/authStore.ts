import { create } from "zustand";

type User = {
  id: string;

  name: string;
  email?: string;
  mobile?: string;

  addressLine?: string;
  landmark?: string;

  city?: string;
  district?: string;
  state?: string;
  country?: string;

  pincode?: string;

  latitude?: number | string;
  longitude?: number | string;

  createdAt?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;

  hydrate: () => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;

  updateUser: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  // Load User From LocalStorage
  hydrate: () => {
    if (typeof window === "undefined") return;

    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      set({
        user: user ? JSON.parse(user) : null,
        token: token || null,
      });
    } catch (error) {
      console.log("HYDRATE ERROR:", error);
    }
  },

  // Save User + Token
  setAuth: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  // Update User Data
  updateUser: (newData) => {
    const currentUser = get().user;

    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      ...newData,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    set({
      user: updatedUser,
    });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");

    set({
      user: null,
      token: null,
    });
  },
}));