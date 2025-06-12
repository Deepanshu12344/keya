import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { featuredProducts } from '../../data/products';

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to quality, style, and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="group inline-flex items-center space-x-2 bg-neutral-900 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}