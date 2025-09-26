import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: any[];
  isOpen: boolean;
  addItem: (menuItem: any, selectedAdditives?: any[], notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;  // ✅ Alterado para função
  getTotalPrice: () => number;  // ✅ Alterado para função
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (menuItem, selectedAdditives = [], notes = '') => {
        const { items } = get();
        
        // 🔧 DEBUG
        console.log('➕ ADDING ITEM:', menuItem.name);
        console.log('➕ ADDITIVES:', selectedAdditives);
        
        // Cálculo CORRETO do preço
        const additivesPrice = selectedAdditives.reduce((sum, add) => sum + add.price, 0);
        const basePrice = menuItem.price || 0;
        const totalPrice = basePrice + additivesPrice;
        
        console.log('💰 PRICE CALCULATION:', { basePrice, additivesPrice, totalPrice });
        
        const newItem = {
          id: `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // ID mais único
          menuItem,
          quantity: 1,
          selectedAdditives,
          notes,
          totalPrice: totalPrice
        };
        
        const newItems = [...items, newItem];
        
        console.log('🛒 ITEMS AFTER ADD:', newItems);
        
        set({ 
          items: newItems,
          isOpen: true 
        });
      },
      
      removeItem: (itemId: string) => {
        const { items } = get();
        const newItems = items.filter(item => item.id !== itemId);
        console.log('🗑️ ITEMS AFTER REMOVE:', newItems);
        set({ items: newItems });
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        
        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === itemId) {
            const additivesPrice = item.selectedAdditives.reduce((sum: any, add: { price: any; }) => sum + add.price, 0);
            const basePrice = item.menuItem.price || 0;
            const newTotalPrice = quantity * (basePrice + additivesPrice);
            
            return {
              ...item,
              quantity,
              totalPrice: newTotalPrice
            };
          }
          return item;
        });
        
        console.log('🔢 ITEMS AFTER QUANTITY UPDATE:', updatedItems);
        set({ items: updatedItems });
      },
      
      clearCart: () => {
        console.log('🧹 CLEARING CART');
        set({ items: [], isOpen: false });
      },
      
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      // ✅ CORRIGIDO: Agora são funções
      getTotalItems: () => {
        const total = get().items.reduce((sum, item) => sum + item.quantity, 0);
        console.log('🛒 TOTAL ITEMS CALC:', total, 'from', get().items.length, 'items');
        return total;
      },
      
      getTotalPrice: () => {
        const total = get().items.reduce((sum, item) => sum + item.totalPrice, 0);
        console.log('💰 TOTAL PRICE CALC:', total, 'from', get().items.length, 'items');
        return total;
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);