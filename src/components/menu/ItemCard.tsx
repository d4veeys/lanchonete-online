'use client';

import React from 'react';
import { MenuItem } from '@/types/menu';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/utils';

interface ItemCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onCustomize }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Imagem do produto */}
        <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
          <span className="text-6xl">🍔</span>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
            <span className="font-bold text-orange-600 text-lg">
              {formatPrice(item.price)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {item.description}
          </p>
          
          <Button 
            onClick={() => onCustomize(item)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {item.customizations ? 'Personalizar' : 'Adicionar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};