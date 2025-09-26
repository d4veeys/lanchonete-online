'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/lib/constants';

export default function SucessoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Ícone de sucesso */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pedido Enviado!
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Seu pedido foi enviado para o WhatsApp da lanchonete. 
              Aguarde a confirmação e o tempo de preparo.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-green-800 mb-2">Próximos passos:</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Aguarde a confirmação do pedido</li>
                <li>• Tempo de preparo: ~30-40 minutos</li>
                <li>• Mantenha o WhatsApp aberto para updates</li>
              </ul>
            </div>

            {/* Informações de contato */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-800 mb-2">Dúvidas?</h3>
              <p className="text-orange-700 text-sm">
                Entre em contato: {APP_CONFIG.phone}
              </p>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.open(`https://wa.me/${APP_CONFIG.phone}`, '_blank')}
              >
                Abrir WhatsApp
              </Button>
              
              <Link href="/" className="block">
                <Button variant="outline" className="w-full">
                  Fazer Novo Pedido
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}