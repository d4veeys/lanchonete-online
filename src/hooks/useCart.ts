import { useCartStore } from '@/lib/store/cartStore';

export function useCart() {
  const {
    items,
    isOpen,
    addItem,
    removeItem, 
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalItems,  // ✅ Agora é função
    getTotalPrice   // ✅ Agora é função
  } = useCartStore();
  
  // ✅ CORRETO: Chamar as funções para obter os valores
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  console.log('🔄 useCart - Total Items:', totalItems, 'Total Price:', totalPrice);
  
  return {
    items,
    isOpen,
    addItem,
    removeItem, 
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    totalItems,    // ✅ Valor calculado
    totalPrice     // ✅ Valor calculado
  };
}