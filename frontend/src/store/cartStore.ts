import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  title?: string;
  stock: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i._id === item._id
          );

          if (existing) {
            if (existing.quantity >= existing.stock) {
              return state;
            }

            return {
              items: state.items.map((i) =>
                i._id === item._id
                  ? {
                      ...i,
                      quantity: i.quantity + 1,
                    }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        })),

      increaseQty: (id) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i._id !== id) return i;

            if (i.quantity >= i.stock) return i;

            return {
              ...i,
              quantity: i.quantity + 1,
            };
          }),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i._id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);