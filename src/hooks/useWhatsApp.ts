import { useCart } from './useCart';
import { APP_CONFIG } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function useWhatsApp() {
    const { items } = useCart();

    const sendOrder = () => {
        if (items.length === 0) return;

        let message = `*${APP_CONFIG.name} - Novo Pedido!*\n\n`;
        message += `*ITENS DO PEDIDO:*\n`;
        
        items.forEach((item, index) => {
            message += `\n${index + 1}. ${item.quantity}x ${item.menuItem.name}`;
            message += ` - ${formatPrice(item.totalPrice)}`;
            
            if (item.selectedAdditives.length > 0) {
                message += ` (Adicionais: ${item.selectedAdditives.map((a: { name: string }) => a.name).join(', ')})`;
            }
        });
        
        const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
        message += `\n\n*TOTAL: ${formatPrice(total)}*`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${APP_CONFIG.phone}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Redireciona para sucesso após 1 segundo
        setTimeout(() => {
            window.location.href = '/sucesso';
        }, 1000);
    };

    return { sendOrder };
}