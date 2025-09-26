import { create } from 'zustand';
import { CartItem } from '@/types/order';

interface OrderStore {
  currentOrder: CartItem[] | null;
  setCurrentOrder: (items: CartItem[]) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: null,
  setCurrentOrder: (items) => set({ currentOrder: items }),
  clearCurrentOrder: () => set({ currentOrder: null }),
}));