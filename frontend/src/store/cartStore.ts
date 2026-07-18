import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  _id: string; // Product ID or Combo ID

  variant_id?: string | null;
  isVariant?: boolean;

  type?: "product" | "combo"; // 👈 NEW

  name: string;

  title?: string;

  price: number;
  originalPrice?: number;

  image?: string;

  stock: number;

  quantity: number;
};

type CartState = {
  items: CartItem[];

  addToCart: (item: CartItem) => boolean;

  removeFromCart: (
    id: string,
    variantId?: string | null,
    type?: "product" | "combo"
  ) => void;

  increaseQty: (
    id: string,
    variantId?: string | null,
    type?: "product" | "combo"
  ) => void;

  decreaseQty: (
    id: string,
    variantId?: string | null,
    type?: "product" | "combo"
  ) => void;

  clearCart: () => void;
};

const matchItem = (
  i: CartItem,
  id: string,
  variantId: string | null,
  type: "product" | "combo"
) =>
  i._id === id &&
  (i.variant_id || null) === variantId &&
  (i.type || "product") === type;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        if (item.stock <= 0) {
          return false;
        }

        let added = false;

        const itemType = item.type || "product";

        set((state) => {
          const existing = state.items.find((i) =>
            matchItem(i, item._id, item.variant_id || null, itemType)
          );

          if (existing) {
            if (existing.quantity >= existing.stock) {
              return state;
            }

            added = true;

            return {
              items: state.items.map((i) =>
                matchItem(i, item._id, item.variant_id || null, itemType)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          added = true;

          return {
            items: [
              ...state.items,
              {
                ...item,
                type: itemType,
                quantity: 1,
              },
            ],
          };
        });

        return added;
      },

      removeFromCart: (id, variantId = null, type = "product") =>
        set((state) => ({
          items: state.items.filter((i) => !matchItem(i, id, variantId, type)),
        })),

      increaseQty: (id, variantId = null, type = "product") =>
        set((state) => ({
          items: state.items.map((i) => {
            if (!matchItem(i, id, variantId, type)) return i;
            if (i.quantity >= i.stock) return i;

            return { ...i, quantity: i.quantity + 1 };
          }),
        })),

      decreaseQty: (id, variantId = null, type = "product") =>
        set((state) => ({
          items: state.items
            .map((i) =>
              matchItem(i, id, variantId, type)
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);