'use client';

import React, { useState, useMemo } from 'react';
import { CategoryTabs } from '@/components/menu/CategoryTabs';
import { ItemCard } from '@/components/menu/ItemCard';
import { ItemModal } from '@/components/menu/ItemModal';
import { MenuItem } from '@/types/menu';
import { menuItems } from '@/data/menu-items';
import { categories } from '@/data/categories';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('paes');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      // No Hero Section, substitua por:
<section className="relative gradient-bg py-16 overflow-hidden">
  <div className="absolute inset-0 bg-black/5"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 fade-in">
        Cardápio <span className="text-orange-500">Online</span>
      </h1>
      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
        Descubra os sabores autênticos dos nossos hambúrgueres artesanais. 
        Feitos com ingredientes selecionados e muito amor!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
          🚀 Entrega Rápida
        </span>
        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          💰 Preço Justo
        </span>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          👍 Qualidade Garantida
        </span>
      </div>
    </div>
  </div>
  
  {/* Elementos decorativos */}
  <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300/20 rounded-full blur-xl"></div>
  <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl"></div>
</section>
      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Menu Items */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <span className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Nenhum item nesta categoria
            </h3>
            <p className="text-gray-600">Em breve novidades!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onCustomize={handleItemClick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal de Personalização */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}