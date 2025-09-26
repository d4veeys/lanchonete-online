import { MenuItem, Additional } from './menu';

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAdditives: Additional[];
  notes?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  createdAt: Date;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: Address;
}

export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}