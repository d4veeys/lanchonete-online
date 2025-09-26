'use client';

import React, { useState } from 'react';
import { MenuItem, Additional } from '@/types/menu';
import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const { addItem } = useCart();
  const [selectedAdditives, setSelectedAdditives] = useState<Additional[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!item || !isOpen) return null;

  const additivesPrice = selectedAdditives.reduce((sum, add) => sum + add.price, 0);
  const totalPrice = (item.price + additivesPrice) * quantity;

  const handleAdditiveToggle = (additive: Additional) => {
    const isSelected = selectedAdditives.some(a => a.id === additive.id);
    
    if (isSelected) {
      setSelectedAdditives(selectedAdditives.filter(a => a.id !== additive.id));
    } else {
      setSelectedAdditives([...selectedAdditives, additive]);
    }
  };

  const handleAddToCart = () => {
    addItem(item, selectedAdditives);
    onClose();
    // Reset modal
    setSelectedAdditives([]);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Descrição */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{item.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-gray-900">
                Preço base: {formatPrice(item.price)}
              </span>
            </div>
          </div>

          {/* Quantidade */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Quantidade:</span>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Adicionais (só mostra se o item tiver customizações) */}
          {item.customizations && item.customizations.map((customization) => (
            <div key={customization.id} className="space-y-3">
              <h3 className="font-semibold text-gray-900">{customization.name}</h3>
              
              <div className="grid gap-2">
                {customization.options.map((additive) => (
                  <button
                    key={additive.id}
                    onClick={() => handleAdditiveToggle(additive)}
                    className={`
                      flex justify-between items-center p-3 rounded-lg border-2 transition-all
                      ${selectedAdditives.some(a => a.id === additive.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center
                        ${selectedAdditives.some(a => a.id === additive.id)
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-gray-300'
                        }
                      `}>
                        {selectedAdditives.some(a => a.id === additive.id) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{additive.name}</span>
                    </div>
                    <span className="text-orange-600 font-semibold">
                      +{formatPrice(additive.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Resumo do preço */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{quantity}x {item.name}</span>
                <span>{formatPrice(item.price * quantity)}</span>
              </div>
              
              {selectedAdditives.map((additive) => (
                <div key={additive.id} className="flex justify-between text-sm">
                  <span>+ {additive.name}</span>
                  <span>{formatPrice(additive.price * quantity)}</span>
                </div>
              ))}
              
              <div className="border-t border-orange-200 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-orange-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Adicionar - {formatPrice(totalPrice)}
          </Button>
        </div>
      </div>
    </div>
  );
};