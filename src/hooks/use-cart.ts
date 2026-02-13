"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  serviceId: string;
  serviceName: string;
  price: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.serviceId === item.serviceId);
          if (exists) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (serviceId) =>
        set((state) => ({
          items: state.items.filter((item) => item.serviceId !== serviceId),
        })),
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.length,
    }),
    {
      name: "cart-storage",
    }
  )
);
