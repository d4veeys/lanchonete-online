import React from 'react';
import { APP_CONFIG } from '@/lib/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🍔</span>
              </div>
              <h3 className="text-xl font-bold">{APP_CONFIG.name}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Os melhores hambúrgueres artesanais da cidade. 
              Qualidade e sabor em cada mordida.
            </p>
          </div>
          
          {/* Contato */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Contato & Horário</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center justify-center space-x-2">
                <span>📞</span>
                <span>{APP_CONFIG.phone.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '($1) $2 $3-$4')}</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span>🕒</span>
                <span>{APP_CONFIG.hours.open} às {APP_CONFIG.hours.close}</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span>📍</span>
                <span>{APP_CONFIG.address}</span>
              </p>
            </div>
          </div>
          
          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Siga-nos</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <button className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <span>📱</span>
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <span>📷</span>
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <span>📘</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © {currentYear} {APP_CONFIG.name}. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Desenvolvido com ❤️ para amantes de hambúrguer
          </p>
        </div>
      </div>
    </footer>
  );
};