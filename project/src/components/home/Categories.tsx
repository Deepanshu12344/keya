import React from 'react';
import { Link } from 'react-router-dom';

const categoryImages = [
  {
    name: 'Dresses',
    image: 'https://images.pexels.com/photos/7679683/pexels-photo-7679683.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/shop?category=dresses'
  },
  {
    name: 'Outerwear',
    image: 'https://images.pexels.com/photos/7679764/pexels-photo-7679764.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/shop?category=outerwear'
  },
  {
    name: 'Blazers',
    image: 'https://images.pexels.com/photos/7679448/pexels-photo-7679448.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/shop?category=blazers'
  },
  {
    name: 'Sweaters',
    image: 'https://images.pexels.com/photos/7679336/pexels-photo-7679336.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/shop?category=sweaters'
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-neutral-600">
            Explore our carefully curated collections designed for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryImages.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-neutral-200 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}