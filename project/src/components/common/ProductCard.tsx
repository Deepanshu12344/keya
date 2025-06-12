import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement quick view modal
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Sale Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              SALE
            </div>
          )}

          {/* Hover Actions */}
          <div className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-neutral-700 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className="h-4 w-4" fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleQuickView}
                className="p-2 bg-white text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-neutral-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-gold-400 fill-current' : 'text-neutral-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">({product.reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-neutral-300"
                  style={{ 
                    backgroundColor: color === 'white' ? '#ffffff' : 
                                   color === 'black' ? '#000000' :
                                   color === 'navy' ? '#1e3a8a' :
                                   color === 'ivory' ? '#fffff0' :
                                   color === 'camel' ? '#c19a6b' :
                                   color === 'charcoal' ? '#36454f' :
                                   color === 'cream' ? '#fffdd0' :
                                   color === 'blush' ? '#ffc0cb' :
                                   color === 'sage' ? '#9caf88' :
                                   color === 'midnight' ? '#191970' :
                                   color === 'sky-blue' ? '#87ceeb' :
                                   color === 'cognac' ? '#9f4f23' : color
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-neutral-500">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}