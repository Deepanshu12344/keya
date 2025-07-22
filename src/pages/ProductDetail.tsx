import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart, Check } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for product selection
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImage, setCurrentImage] = useState(0);
  
  // State for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null); // Changed from products array to single product

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
      
        // Make the API call for a single product
        const response = await fetch(`http://localhost:5000/products/${id}`);

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data from the response
        const data = await response.json();
        
        // Set the single product data
        setProduct(data);
        
        // Set default selections when product loads
        if (data) {
          setSelectedSize(data.sizes?.[0] || '');
          setSelectedColor(data.colors?.[0] || '');
          setCurrentImage(0);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-600 text-center">
            <p>Error loading product: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#7c1034] text-white px-4 py-2 rounded-lg hover:bg-[#6b0d2a]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
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

    // addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.images[0],
    //   size: selectedSize,
    //   color: selectedColor,
    //   quantity: quantity
    // });

    alert(`Added ${quantity} x ${product.name} (${selectedSize}, ${selectedColor}) to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-[#7c1034] mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.imageUrls?.[currentImage] || '/placeholder-image.jpg'}
              alt={product.name || 'Product'}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {product.imageUrls && product.imageUrls.length > 0 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.imageUrls.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === index ? 'border-[#7c1034]' : 'border-gray-200 hover:border-gray-300'
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

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-[#7c1034]">
              ₹{product.price ? product.price.toLocaleString() : '0'}
            </span>
            {/* <span className="ml-4 text-green-600 flex items-center bg-green-50 px-3 py-1 rounded-full">
              <Check className="h-4 w-4 mr-1" />
              In Stock
            </span> */}
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description || 'No description available'}</p>

          {/* Size Selection - Dropdown */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Size</h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full md:w-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#7c1034] focus:outline-none transition-colors bg-white"
              >
                <option value="">Select Size</option>
                {product.sizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Selection - Dropdown */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Color</h3>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full md:w-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#7c1034] focus:outline-none transition-colors bg-white"
              >
                <option value="">Select Color</option>
                {product.colors.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#7c1034] text-white py-3 rounded-lg hover:bg-[#6b0d2a] transition-colors flex items-center justify-center font-semibold"
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
            <div className="flex space-x-8 mb-6 border-b">
              {[
                { key: 'description', label: 'Description' },
                { key: 'features', label: 'Features' },
                { key: 'care', label: 'Care Instructions' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-[#7c1034] text-[#7c1034] font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[100px]">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'No description available'}
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  {product.features && product.features.length > 0 ? (
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No features information available</p>
                  )}
                </div>
              )}

              {activeTab === 'care' && (
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {product.careInstructions || 'No care instructions available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;