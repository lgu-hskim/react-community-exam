import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      setCart: (cart) => set({ cart }),
      clearCart: () => set({ cart: [] }),
      addCart: (c) => set({ ...cart, c }),
    }),
    {
      name: "fast-community-cart", // localStorage key
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
