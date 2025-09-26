'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';

export const Header: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🍔</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                {APP_CONFIG.name}
              </h1>
              <p className="text-sm text-gray-600 font-medium">Cardápio Digital</p>
            </div>
          </div>
          
          {/* Carrinho */}
          <button 
            onClick={toggleCart}
            className="relative p-3 gradient-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 group"
          >
            <span className="text-white text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg pulse">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>
    </header>
  );
};