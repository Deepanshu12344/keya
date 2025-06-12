import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Blouse Premium',
    description: 'Luxurious silk blouse with elegant draping and mother-of-pearl buttons. Perfect for both office and evening wear.',
    price: 189,
    originalPrice: 249,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['ivory', 'black', 'navy'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 124,
    tags: ['silk', 'premium', 'elegant']
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    description: 'Ultra-soft 100% cashmere sweater with ribbed knit detailing. The perfect layer for sophisticated comfort.',
    price: 295,
    images: [
      'https://images.pexels.com/photos/7679336/pexels-photo-7679336.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'sweaters',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['camel', 'charcoal', 'cream'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 89,
    tags: ['cashmere', 'luxury', 'cozy']
  },
  {
    id: '3',
    name: 'Tailored Blazer',
    description: 'Sharp, contemporary blazer with peak lapels and structured shoulders. A modern classic for the professional wardrobe.',
    price: 385,
    images: [
      'https://images.pexels.com/photos/7679448/pexels-photo-7679448.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'blazers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'navy', 'charcoal'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 67,
    tags: ['tailored', 'professional', 'structured']
  },
  {
    id: '4',
    name: 'Flowing Midi Dress',
    description: 'Ethereal midi dress in silk chiffon with delicate pleating and a flattering A-line silhouette.',
    price: 225,
    originalPrice: 295,
    images: [
      'https://images.pexels.com/photos/7679683/pexels-photo-7679683.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['blush', 'sage', 'midnight'],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 156,
    tags: ['flowy', 'elegant', 'midi']
  },
  {
    id: '5',
    name: 'High-Waisted Trousers',
    description: 'Classic high-waisted trousers with a wide leg and pressed crease. Timeless sophistication meets modern comfort.',
    price: 165,
    images: [
      'https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'navy', 'camel'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 93,
    tags: ['high-waisted', 'wide-leg', 'classic']
  },
  {
    id: '6',
    name: 'Leather Jacket',
    description: 'Buttery soft lambskin leather jacket with asymmetrical zip and quilted details. A rebellious classic.',
    price: 495,
    images: [
      'https://images.pexels.com/photos/7679737/pexels-photo-7679737.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'cognac'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 78,
    tags: ['leather', 'edgy', 'classic']
  },
  {
    id: '7',
    name: 'Linen Shirt',
    description: 'Crisp linen shirt with French seams and mother-of-pearl buttons. Perfect for effortless summer elegance.',
    price: 125,
    images: [
      'https://images.pexels.com/photos/7679741/pexels-photo-7679741.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['white', 'sky-blue', 'sage'],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 112,
    tags: ['linen', 'breathable', 'summer']
  },
  {
    id: '8',
    name: 'Wool Coat',
    description: 'Double-breasted wool coat with horn buttons and luxurious silk lining. The epitome of winter elegance.',
    price: 675,
    images: [
      'https://images.pexels.com/photos/7679764/pexels-photo-7679764.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['camel', 'charcoal', 'navy'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 45,
    tags: ['wool', 'elegant', 'winter']
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const categories = [
  { id: 'all', name: 'All', count: products.length },
  { id: 'tops', name: 'Tops', count: products.filter(p => p.category === 'tops').length },
  { id: 'dresses', name: 'Dresses', count: products.filter(p => p.category === 'dresses').length },
  { id: 'pants', name: 'Pants', count: products.filter(p => p.category === 'pants').length },
  { id: 'blazers', name: 'Blazers', count: products.filter(p => p.category === 'blazers').length },
  { id: 'sweaters', name: 'Sweaters', count: products.filter(p => p.category === 'sweaters').length },
  { id: 'outerwear', name: 'Outerwear', count: products.filter(p => p.category === 'outerwear').length },
];