import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Truck, 
  Shield, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronDown,
  Info,
  Zap,
  Award,
  Users
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock product data (in real app, fetch from API)
  const mockProduct = {
    _id: id,
    name: "Premium Full Sleeve Peplum Top",
    brand: "Keya Fashion",
    description: "Crafted from pure, breathable cotton that's soft on the skin and light enough for all-day comfort. This elegant peplum top features a sophisticated silhouette that flatters every body type. Perfect for both casual outings and professional settings.",
    longDescription: "Experience luxury and comfort with our Premium Full Sleeve Peplum Top. Made from 100% organic cotton, this piece combines style with sustainability. The peplum design creates a beautiful silhouette while the full sleeves provide elegant coverage. Whether you're heading to the office or meeting friends for brunch, this versatile top will keep you looking polished and feeling comfortable all day long.",
    price: 649,
    originalPrice: 899,
    discount: 28,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ocean Blue", hex: "#1e40af", available: true },
      { name: "Forest Green", hex: "#059669", available: true },
      { name: "Sunset Orange", hex: "#ea580c", available: false },
      { name: "Rose Pink", hex: "#e11d48", available: true }
    ],
    category: "Tops",
    subcategory: "Peplum Tops",
    images: [
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg"
    ],
    rating: 4.6,
    totalReviews: 247,
    ratingBreakdown: {
      5: 156,
      4: 67,
      3: 18,
      2: 4,
      1: 2
    },
    inStock: true,
    stockCount: 23,
    sku: "KF-PT-001",
    material: "100% Organic Cotton",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on medium heat", "Do not bleach"],
    features: [
      "Breathable organic cotton fabric",
      "Flattering peplum silhouette",
      "Professional and casual wear",
      "Pre-shrunk for perfect fit",
      "Eco-friendly production"
    ],
    sizeChart: {
      XS: { chest: "32", waist: "26", length: "24" },
      S: { chest: "34", waist: "28", length: "25" },
      M: { chest: "36", waist: "30", length: "26" },
      L: { chest: "38", waist: "32", length: "27" },
      XL: { chest: "40", waist: "34", length: "28" },
      XXL: { chest: "42", waist: "36", length: "29" }
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-01-15",
        title: "Perfect fit and quality!",
        comment: "This top exceeded my expectations. The fabric is so soft and the fit is perfect. I've gotten so many compliments!",
        verified: true,
        helpful: 12,
        images: ["https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"]
      },
      {
        id: 2,
        user: "Emily R.",
        rating: 4,
        date: "2024-01-10",
        title: "Great for work",
        comment: "Love wearing this to the office. Professional yet stylish. Only wish it came in more colors.",
        verified: true,
        helpful: 8,
        images: []
      },
      {
        id: 3,
        user: "Jessica L.",
        rating: 5,
        date: "2024-01-08",
        title: "Amazing quality",
        comment: "The cotton is so soft and breathable. Perfect for our climate. Will definitely buy more colors!",
        verified: true,
        helpful: 15,
        images: []
      }
    ],
    relatedProducts: [
      { id: "2", name: "Cotton Casual Top", price: 549, image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg" },
      { id: "3", name: "Elegant Blouse", price: 799, image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
      { id: "4", name: "Summer Top", price: 449, image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg" }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setProduct(mockProduct);
    setSelectedColor(mockProduct.colors.find(c => c.available)?.name || '');
  }, [id]);

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    
    setIsAddingToCart(false);
  };

  const renderStars = (rating, size = 'small') => {
    const starSize = size === 'large' ? 'h-6 w-6' : 'h-4 w-4';
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${starSize} ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredReviews = product?.reviews.filter(review => {
    if (reviewFilter === 'all') return true;
    return review.rating === parseInt(reviewFilter);
  }) || [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C37B89]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-[#C37B89]">Home</button>
            <span className="text-gray-400">/</span>
            <button onClick={() => navigate('/categories')} className="text-gray-500 hover:text-[#C37B89]">{product.category}</button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <div 
                className={`relative overflow-hidden rounded-2xl bg-gray-100 cursor-zoom-in ${isZoomed ? 'cursor-zoom-out' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className={`w-full h-96 lg:h-[600px] object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                />
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-[#C37B89] ring-2 ring-[#C37B89]/20' 
                      : 'border-gray-200 hover:border-gray-300'
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

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#C37B89] font-medium">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Heart className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <Share2 className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating, 'large')}
                </div>
                <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.totalReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-[#C37B89]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <Truck className="h-6 w-6 text-[#C37B89] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-[#C37B89] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-[#C37B89] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Color: {selectedColor && <span className="text-[#C37B89]">{selectedColor}</span>}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`relative w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-[#C37B89] ring-2 ring-[#C37B89]/20'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {!color.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <X className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Size: {selectedSize && <span className="text-[#C37B89]">{selectedSize}</span>}
                </h3>
                <button className="text-sm text-[#C37B89] hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[#C37B89] bg-[#C37B89] text-white'
                        : 'border-gray-300 hover:border-[#C37B89] text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-green-600 font-medium">{product.stockCount} in stock</span>
                  <br />
                  Max 10 per order
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedSize || !selectedColor}
                className="w-full bg-[#C37B89] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-[#B86B7A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-6 w-6" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <button className="w-full border-2 border-[#C37B89] text-[#C37B89] py-4 px-8 rounded-xl font-semibold text-lg hover:bg-[#C37B89] hover:text-white transition-all duration-200">
                Buy Now
              </button>
            </div>

            {/* Product Highlights */}
            <div className="bg-gradient-to-r from-[#C37B89]/10 to-purple-100 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Zap className="h-5 w-5 text-[#C37B89] mr-2" />
                Why You'll Love This
              </h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description', icon: Info },
                { id: 'reviews', label: `Reviews (${product.totalReviews})`, icon: MessageCircle },
                { id: 'size-guide', label: 'Size Guide', icon: Award },
                { id: 'care', label: 'Care Instructions', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#C37B89] text-[#C37B89]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Material:</strong> {product.material}</li>
                      <li><strong>SKU:</strong> {product.sku}</li>
                      <li><strong>Category:</strong> {product.category}</li>
                      <li><strong>Subcategory:</strong> {product.subcategory}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Rating Summary */}
                  <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-[#C37B89] mb-2">{product.rating}</div>
                        <div className="flex justify-center mb-2">
                          {renderStars(product.rating, 'large')}
                        </div>
                        <p className="text-gray-600">Based on {product.totalReviews} reviews</p>
                      </div>
                      
                      {/* Rating Breakdown */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600 w-8">{rating}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${(product.ratingBreakdown[rating] / product.totalReviews) * 100}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{product.ratingBreakdown[rating]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="lg:w-2/3">
                    {/* Filter */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select
                          value={reviewFilter}
                          onChange={(e) => setReviewFilter(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C37B89]"
                        >
                          <option value="all">All Reviews</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-6">
                      {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 3).map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-900">{review.user}</span>
                                {review.verified && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                    <Check className="h-3 w-3 mr-1" />
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                          <p className="text-gray-700 mb-4">{review.comment}</p>
                          
                          {review.images.length > 0 && (
                            <div className="flex space-x-2 mb-4">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt="Review"
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-[#C37B89]">
                              <ThumbsUp className="h-4 w-4" />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-[#C37B89]">
                              <MessageCircle className="h-4 w-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredReviews.length > 3 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="text-[#C37B89] hover:text-[#B86B7A] font-medium"
                        >
                          {showAllReviews ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Size Guide Tab */}
            {activeTab === 'size-guide' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Size Guide</h3>
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Chest (inches)</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Waist (inches)</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.sizeChart).map(([size, measurements]) => (
                        <tr key={size} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{size}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{measurements.chest}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{measurements.waist}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{measurements.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">How to Measure</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                    <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                    <li>• <strong>Length:</strong> Measure from shoulder to hem</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Care Instructions Tab */}
            {activeTab === 'care' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Care Instructions</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Washing & Care</h4>
                    <ul className="space-y-3">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Storage Tips</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Hang or fold neatly to prevent wrinkles
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Store in a cool, dry place
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Avoid direct sunlight for extended periods
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Use garment bags for long-term storage
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h4>
                <p className="text-xl font-bold text-[#C37B89]">₹{relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;