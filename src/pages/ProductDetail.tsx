import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const products = [
    {
      id: 1,
      name: "Elegant Cotton Kurti",
      price: 1299,
      images: [
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      category: "Cotton",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Green"],
      description: "Beautiful cotton kurti perfect for daily wear. Made from premium quality cotton fabric that ensures comfort and style.",
      features: [
        "100% Cotton fabric",
        "Machine washable",
        "Comfortable fit",
        "Breathable material",
        "Available in multiple colors"
      ],
      careInstructions: "Machine wash cold, tumble dry low, iron on medium heat",
      inStock: true
    },
    {
      id: 2,
      name: "Designer Anarkali",
      price: 2499,
      images: [
        "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8532619/pexels-photo-8532619.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      category: "Anarkali",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Purple", "Gold"],
      description: "Elegant Anarkali kurti with beautiful embroidery work. Perfect for festivals and special occasions.",
      features: [
        "Premium fabric",
        "Embroidered design",
        "Flowy silhouette",
        "Party wear",
        "Traditional style"
      ],
      careInstructions: "Dry clean only",
      inStock: true
    }
  ];

  const product = products.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-[#7c1034] text-white px-6 py-2 rounded-lg hover:bg-[#6b0d2a] transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });

    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-[#7c1034] mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  currentImage === index ? 'border-[#7c1034]' : 'border-gray-200'
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
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-[#7c1034]">₹{product.price}</span>
            <span className="ml-4 text-green-600 flex items-center">
              <Check className="h-5 w-5 mr-1" />
              In Stock
            </span>
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border-2 rounded-lg ${
                    selectedSize === size
                      ? 'border-[#7c1034] bg-[#7c1034] text-white'
                      : 'border-gray-300 text-gray-600 hover:border-[#7c1034]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded-lg ${
                    selectedColor === color
                      ? 'border-[#7c1034] bg-[#7c1034] text-white'
                      : 'border-gray-300 text-gray-600 hover:border-[#7c1034]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#7c1034] text-white py-3 rounded-lg hover:bg-[#6b0d2a] transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t pt-6">
            <div className="flex space-x-8 mb-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'description'
                    ? 'border-[#7c1034] text-[#7c1034]'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'features'
                    ? 'border-[#7c1034] text-[#7c1034]'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'care'
                    ? 'border-[#7c1034] text-[#7c1034]'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Care Instructions
              </button>
            </div>

            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <p className="text-gray-600">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;