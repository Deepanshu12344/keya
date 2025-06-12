import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useApp();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Product not found</h1>
          <Link to="/shop" className="text-gold-600 hover:text-gold-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        size: selectedSize,
        color: selectedColor
      }
    });

    alert('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            <li><Link to="/" className="hover:text-gold-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-gold-600">Shop</Link></li>
            <li>/</li>
            <li className="text-neutral-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg ${
                      selectedImage === index ? 'ring-2 ring-gold-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-gold-400 fill-current' : 'text-neutral-300'}`}
                    />
                  ))}
                  <span className="text-sm text-neutral-600 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-neutral-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-neutral-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="text-neutral-700 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">
                Color: {selectedColor && <span className="capitalize">{selectedColor}</span>}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-neutral-900' : 'border-neutral-300'
                    }`}
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
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">
                Size: {selectedSize}
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm font-medium border rounded-md ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-neutral-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-neutral-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-neutral-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 hover:bg-gold-600 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`px-8 py-4 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 ${
                  isInWishlist
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Heart className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} />
                <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Truck className="h-5 w-5" />
                <span>Free shipping on orders over $200</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <RotateCcw className="h-5 w-5" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Shield className="h-5 w-5" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}