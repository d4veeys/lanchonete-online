'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/types/order';
import { useCart } from '@/hooks/useCart';
import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
      {/* Ícone */}
      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
        <span className="text-xl">🍔</span>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-gray-900 truncate">
            {item.menuItem.name}
          </h4>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 text-lg"
          >
            ×
          </button>
        </div>

        {/* Adicionais */}
        {item.selectedAdditives.length > 0 && (
          <p className="text-sm text-gray-600 mb-2">
            + {item.selectedAdditives.map(a => a.name).join(', ')}
          </p>
        )}

        {/* Controles */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </Button>
            <span className="font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </Button>
          </div>
          
          <span className="font-bold text-orange-600">
            {formatPrice(item.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};