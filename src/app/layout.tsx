import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer'; // ← ADICIONAR ESTA LINHA

export const metadata: Metadata = {
  title: 'Lanchonete Online',
  description: 'Cardápio online da lanchonete',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer /> {/* ← ADICIONAR ESTE COMPONENTE */}
      </body>
    </html>
  );
}