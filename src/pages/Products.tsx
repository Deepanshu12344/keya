import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = [
    {
      id: 1,
      name: "Elegant Cotton Kurti",
      price: 1299,
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Cotton",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Green"]
    },
    {
      id: 2,
      name: "Designer Anarkali",
      price: 2499,
      image: "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Anarkali",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Purple", "Gold"]
    },
    {
      id: 3,
      name: "Casual Printed Kurti",
      price: 899,
      image: "https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Casual",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Multi", "White", "Black"]
    },
    {
      id: 4,
      name: "Traditional Silk Kurti",
      price: 3299,
      image: "https://images.pexels.com/photos/8532619/pexels-photo-8532619.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Silk",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Maroon", "Gold", "Navy"]
    },
    {
      id: 5,
      name: "Floral Print Kurti",
      price: 1599,
      image: "https://images.pexels.com/photos/8532620/pexels-photo-8532620.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Casual",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Yellow", "Pink", "White"]
    },
    {
      id: 6,
      name: "Embroidered Kurti",
      price: 1999,
      image: "https://images.pexels.com/photos/8532621/pexels-photo-8532621.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Embroidered",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Cream", "Peach", "Mint"]
    },
    {
      id: 7,
      name: "Straight Cut Kurti",
      price: 1199,
      image: "https://images.pexels.com/photos/8532622/pexels-photo-8532622.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Cotton",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Green", "Orange"]
    },
    {
      id: 8,
      name: "Party Wear Kurti",
      price: 2899,
      image: "https://images.pexels.com/photos/8532623/pexels-photo-8532623.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Party Wear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red", "Gold"]
    }
  ];

  const categories = ['all', 'Cotton', 'Anarkali', 'Casual', 'Silk', 'Embroidered', 'Party Wear'];
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under ₹1000', value: '0-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: '₹2000 - ₹3000', value: '2000-3000' },
    { label: 'Above ₹3000', value: '3000+' }
  ];

  useEffect(() => {
    let filtered = [...products];
    
    // Search filter
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(product => {
        if (selectedPriceRange === '3000+') {
          return product.price >= 3000;
        } else {
          return product.price >= parseInt(min) && product.price <= parseInt(max);
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPriceRange, sortBy, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#7c1034]"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#7c1034] text-white' : 'text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#7c1034] text-white' : 'text-gray-600'}`}
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
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
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
                  <label key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="mr-2"
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
            Showing {filteredProducts.length} products
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-cover ${
                    viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'
                  }`}
                />
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">Available in: </span>
                    <span className="text-sm">{product.colors.join(', ')}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Sizes: </span>
                    <span className="text-sm">{product.sizes.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#7c1034]">
                      ₹{product.price}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-[#7c1034] text-white px-4 py-2 rounded-lg hover:bg-[#6b0d2a] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;