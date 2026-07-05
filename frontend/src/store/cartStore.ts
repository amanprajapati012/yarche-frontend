import { create } from "zustand";
import { persist } from "zustand/middleware";


type CartItem = {
  _id: string;                 // Product ID

  variant_id?: string | null;
  isVariant?: boolean;

  name: string;

  title?: string;              // Variant Title

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
    variantId?: string | null
  ) => void;

  increaseQty: (
    id: string,
    variantId?: string | null
  ) => void;

  decreaseQty: (
    id: string,
    variantId?: string | null
  ) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

     addToCart: (item) => {
  // Product out of stock
  if (item.stock <= 0) {
    return false;
  }

  let added = false;

  set((state) => {
    const existing = state.items.find(
    (i) =>
        i._id === item._id &&
        (i.variant_id || null) === (item.variant_id || null)
);

    if (existing) {
      if (existing.quantity >= existing.stock) {
        return state;
      }

      added = true;

      return {
       items: state.items.map((i) =>
  i._id === item._id &&
  (i.variant_id || null) === (item.variant_id || null)
    ? {
        ...i,
        quantity: i.quantity + 1,
      }
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
          quantity: 1,
        },
      ],
    };
  });

  return added;
},

      removeFromCart: (id, variantId = null) =>
        set((state) => ({
         items: state.items.filter(
    (i) =>
        !(
            i._id === id &&
            (i.variant_id || null) === variantId
        )
),
        })),

     increaseQty: (id, variantId = null) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (
    i._id !== id ||
    (i.variant_id || null) !== variantId
)
    return i;

            if (i.quantity >= i.stock) return i;

            return {
              ...i,
              quantity: i.quantity + 1,
            };
          }),
        })),

      decreaseQty: (id, variantId = null) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i._id === id &&
(i.variant_id || null) === variantId
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