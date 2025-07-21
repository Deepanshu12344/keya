import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';

const Products = () => {
  // Mock search params for demo
  const mockSearchParams = new URLSearchParams('?search=');
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Simulate API fetch with proper error handling
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
    
      // Make the API call
      const response = await fetch('http://localhost:5000/products');
      
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the JSON data from the response
      const data = await response.json();
      
      // Validate that data is an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected array');
      }
      
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError(error.message); // Use error.message, not response.message
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };
  
  fetchProducts();
}, []);

  const categories = ['all', 'Cotton', 'Anarkali', 'Casual', 'Silk', 'Embroidered', 'Party Wear'];
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under ₹1000', value: '0-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: '₹2000 - ₹3000', value: '2000-3000' },
    { label: 'Above ₹3000', value: '3000+' }
  ];

  // Filter and sort products effect
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];
    
    // Search filter
    const searchTerm = mockSearchParams.get('search');
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = product?.name?.toLowerCase() || '';
        const category = product?.category?.toLowerCase() || '';
        const searchLower = searchTerm.toLowerCase();
        return name.includes(searchLower) || category.includes(searchLower);
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product?.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(product => {
        const price = Number(product?.price) || 0;
        if (selectedPriceRange === '3000+') {
          return price >= 3000;
        } else {
          const minPrice = parseInt(min) || 0;
          const maxPrice = parseInt(max) || Infinity;
          return price >= minPrice && price <= maxPrice;
        }
      });
    }

    // Sort with proper null/undefined handling
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (Number(a?.price) || 0) - (Number(b?.price) || 0);
        case 'price-high':
          return (Number(b?.price) || 0) - (Number(a?.price) || 0);
        case 'name':
        default:
          const nameA = a?.name || '';
          const nameB = b?.name || '';
          return nameA.localeCompare(nameB);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading products...</div>
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
            <p>Error loading products: {error}</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#7c1034]"
            aria-label="Sort products"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#7c1034] text-white' : 'text-gray-600'} hover:bg-gray-100 transition-colors`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#7c1034] text-white' : 'text-gray-600'} hover:bg-gray-100 transition-colors`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2 accent-[#7c1034]"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="mr-2 accent-[#7c1034]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => {
              // Ensure product has required properties with safe fallbacks
              const productId = product?.id;
              const productName = product?.name || 'Unknown Product';
              const productPrice = product?.price || 0;
              const productImage = product?.image || '/api/placeholder/300/400';
              
              return (
                <div key={productId} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <img
                    src={productImage}
                    alt={productName}
                    className={`object-cover ${
                      viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'
                    }`}
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/400';
                    }}
                    loading="lazy"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{productName}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#7c1034]">
                        ₹{Number(productPrice).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => alert(`Viewing details for ${productName}`)}
                        className="bg-[#7c1034] text-white px-4 py-2 rounded-lg hover:bg-[#6b0d2a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7c1034] focus:ring-offset-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-xl mb-2">No products found matching your criteria.</p>
              <p className="text-gray-400">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;