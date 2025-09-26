import { MenuItem } from '@/types/menu';
import { additionals } from './additionals';

export const menuItems: MenuItem[] = [
  // PÃES
  {
    id: 'pao-da-casa',
    name: 'Pão da Casa',
    description: 'Pão, Queijo Mussarela, Alface, Cebola Roxa, Banana e Touco de Costela Desfiada',
    price: 20.00,
    category: 'paes',
    customizations: [
      {
        id: 'adicionais',
        name: 'Adicionais',
        type: 'multiple',
        options: additionals,
        maxSelection: 4
      }
    ]
  },
  {
    id: 'pao-do-titi',
    name: 'Pão do Titi',
    description: 'Pão, Queijo Mussarela, Alface, Cebola Roxa, Banana, Bacon e 150g de Costela Desfiada',
    price: 27.00,
    category: 'paes',
    customizations: [
      {
        id: 'adicionais',
        name: 'Adicionais',
        type: 'multiple',
        options: additionals,
        maxSelection: 4
      }
    ]
  },

  // BEBIDAS
  {
    id: 'agua-mineral',
    name: 'Água Mineral',
    description: 'Água mineral sem gás 500ml',
    price: 3.00,
    category: 'bebidas'
  },
  {
    id: 'agua-com-gas',
    name: 'Água Mineral c/ Gás',
    description: 'Água mineral com gás 500ml',
    price: 4.00,
    category: 'bebidas'
  },
  {
    id: 'refri-lata',
    name: 'Refrigerante Lata',
    description: 'Refrigerante em lata 350ml',
    price: 5.00,
    category: 'bebidas'
  },
  {
    id: 'refri-1l',
    name: 'Refrigerante 1L',
    description: 'Refrigerante 1 litro',
    price: 10.00,
    category: 'bebidas'
  },

  // PORÇÕES
  {
    id: 'batata-150g',
    name: 'Batata Frita 150g',
    description: 'Porção de batata frita 150g',
    price: 10.00,
    category: 'porcoes'
  },
  {
    id: 'batata-300g',
    name: 'Batata Frita 300g',
    description: 'Porção de batata frita 300g',
    price: 15.00,
    category: 'porcoes'
  }
];