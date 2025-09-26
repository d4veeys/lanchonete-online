export interface Additional {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'paes' | 'bebidas' | 'porcoes' | 'adicionais';
  image?: string;
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: Additional[];
  required?: boolean;
  maxSelection?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  order: number;
}