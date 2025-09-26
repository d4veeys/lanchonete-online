'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart'; // ✅ Agora funciona!
import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/utils';

export const CartDrawer: React.FC = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    totalPrice, 
    totalItems,
    removeItem,
    updateQuantity 
  } = useCart();

  console.log('🎯 CART DRAWER DEBUG:');
  console.log(' - isOpen:', isOpen);
  console.log(' - items count:', items.length);
  console.log(' - items:', items);
  console.log(' - totalItems:', totalItems);
  console.log(' - totalPrice:', totalPrice);

  // Resto do código...

  if (!isOpen) return null;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Cálculo manual de backup
  const calculatedTotal = items.reduce((sum, item) => {
    return sum + (item.totalPrice || 0);
  }, 0);

  const displayTotal = totalPrice > 0 ? totalPrice : calculatedTotal;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={closeCart} />
      
      <div className="fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Carrinho ({totalItems})</h2>
            <button onClick={closeCart} className="text-2xl">×</button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🛒</span>
                <p className="text-gray-600">Carrinho vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                      <span>🍔</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.menuItem.name}</h4>
                      {item.selectedAdditives?.length > 0 && (
                        <p className="text-sm text-gray-600">
                          + {item.selectedAdditives.map((a: any) => a.name).join(', ')}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded border"
                          >-</button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border"
                          >+</button>
                        </div>
                        <span className="font-bold text-orange-600">
                          {formatPrice(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                    
                    <button onClick={() => removeItem(item.id)} className="text-gray-400">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span className="text-orange-600">{formatPrice(displayTotal)}</span>
              </div>
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  closeCart();
                  window.location.href = '/pedido';
                }}
              >
                Finalizar Pedido
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};