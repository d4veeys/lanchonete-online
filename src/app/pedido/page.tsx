'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function PedidoPage(){
  const { items, totalPrice } = useCart();
  const { sendOrder } = useWhatsApp();

  console.log('📄 Página Pedido - Items:', items);

  // Se o carrinho estiver vazio, mostra mensagem mas não redireciona
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <span className="text-6xl mb-4 block">🛒</span>
              <h1 className="text-2xl font-bold mb-4">Carrinho Vazio</h1>
              <p className="text-gray-600 mb-6">
                Seu carrinho está vazio. Adicione alguns itens deliciosos!
              </p>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Voltar ao Cardápio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4">
              ← Voltar ao cardápio
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h1>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start pb-3 border-b">
                  <div>
                    <p className="font-medium">{item.quantity}x {item.menuItem.name}</p>
                    {item.selectedAdditives.length > 0 && (
                      <p className="text-sm text-gray-600">
                        + {item.selectedAdditives.length > 0 && (
    <p className="text-sm text-gray-600">
        + {item.selectedAdditives.map((a: { name: string }) => a.name).join(', ')}
    </p>
)}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
              
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-orange-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Finalizar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Button 
              onClick={() => {
                sendOrder();
                // Redireciona para sucesso após enviar
                setTimeout(() => {
                  window.location.href = '/sucesso';
                }, 1000);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg"
            >
              📱 Enviar Pedido via WhatsApp
            </Button>
            <p className="text-sm text-gray-600 text-center mt-3">
              Você será redirecionado para confirmar seu pedido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}