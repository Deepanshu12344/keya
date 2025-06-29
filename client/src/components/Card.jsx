import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Eye } from 'lucide-react';

export const Card = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      _id: "1",
      name: "Full Sleeve Peplum Top",
      description:
        "Fabric: Pure, breathable cotton — soft on the skin and light enough for all-day comfort. Perfect for casual outings and office wear.",
      price: 649,
      originalPrice: 899,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Green"],
      category: "Tops",
      images: ["/assets/images/image1.jpeg"],
      video: "",
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      _id: "2",
      name: "Cotton Peplum Top",
      description: "Another premium cotton top with elegant design and comfortable fit. Ideal for both casual and semi-formal occasions.",
      price: 649,
      originalPrice: 799,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Beige", "Sky Blue"],
      category: "Tops",
      images: ["/assets/images/image2.jpeg"],
      video: "",
      rating: 4.3,
      reviews: 89,
      inStock: true,
    },
  ];

  const productFeatures = [
    { icon: Truck, text: 'Free shipping on orders over ₹500' },
    { icon: RotateCcw, text: '30-day easy returns' },
    { icon: Shield, text: 'Secure payment guaranteed' }
  ];

  const handleImageClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Added to cart:', {
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
    
    setIsAddingToCart(false);
    
    // Reset selections
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setSelectedProduct(null);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mt-12 px-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <div
            className="h-72 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => handleImageClick(product)}
          >
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
            
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(product);
                }}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <Eye className="h-4 w-4" />
                Quick View
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#7C1034]">
                ₹{product.price}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => openModal(product)}
                className="bg-[#7C1034] text-white px-4 py-2 rounded-lg hover:bg-[#B86B7A] transition-colors duration-200 font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => openModal(product)}
                className="text-sm text-[#7C1034] hover:text-[#a3566b] transition-colors duration-200 font-medium"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Enhanced Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left: Image */}
              <div className="lg:w-1/2 p-6">
                <div className="relative">
                  {selectedProduct.images?.[0] ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="lg:w-1/2 p-6 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#7C1034]">
                      ₹{selectedProduct.price}
                    </span>
                    
                  </div>

                  
                </div>

                {/* Color Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Color: {selectedColor && <span className="text-[#7C1034]">{selectedColor}</span>}
                  </h4>
                  <div className="flex gap-3">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-[#7C1034] bg-[#7C1034] text-white'
                            : 'border-gray-300 hover:border-[#7C1034] text-gray-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Size: {selectedSize && <span className="text-[#7C1034]">{selectedSize}</span>}
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                          selectedSize === size
                            ? 'border-[#7C1034] bg-[#7C1034] text-white'
                            : 'border-gray-300 hover:border-[#7C1034] text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold text-lg min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">Max 10 items</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !selectedSize || !selectedColor}
                    className="flex-1 bg-[#7C1034] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#B86B7A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={toggleWishlist}
                    className="p-3 border-2 border-gray-300 hover:border-[#7C1034] rounded-lg transition-all duration-200"
                  >
                    <Heart className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>

                {/* View Full Product Button */}
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    navigate(`/product/${selectedProduct._id}`);
                  }}
                  className="w-full py-3 border-2 border-[#7C1034] text-[#7C1034] rounded-lg font-semibold hover:bg-[#7C1034] hover:text-white transition-all duration-200"
                >
                  View Full Product Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};