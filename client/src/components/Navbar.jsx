import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#C37B89]/95 backdrop-blur-md shadow-lg' 
          : 'bg-[#C37B89]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Left Section - Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-white hover:text-pink-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link 
                to="/" 
                className="text-white text-2xl font-bold tracking-wide hover:text-pink-200 transition-colors duration-200"
              >
                keya
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'Shop All', path: '/shop-all' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-white hover:text-pink-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Center Section - Enhanced Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-105' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 transition-colors duration-200 ${
                    isSearchFocused ? 'text-[#C37B89]' : 'text-white/70'
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-12 pr-4 py-3 rounded-full border-2 transition-all duration-300 ${
                    isSearchFocused
                      ? 'bg-white text-gray-900 border-white shadow-lg'
                      : 'bg-white/20 text-white border-white/30 placeholder-white/70'
                  } focus:outline-none focus:bg-white focus:text-gray-900 focus:border-white focus:placeholder-gray-500`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Section - Enhanced Actions */}
            <div className="flex items-center space-x-3">
              {/* Wishlist Icon (Desktop) */}
              <button className="hidden md:flex text-white hover:text-pink-200 p-2 rounded-full hover:bg-white/10 transition-all duration-200 relative group">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-white text-[#C37B89] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  2
                </span>
              </button>

              {/* Enhanced Cart Icon */}
              <button className="text-white hover:text-pink-200 p-2 rounded-full hover:bg-white/10 transition-all duration-200 relative group">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-white text-[#C37B89] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  3
                </span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  View Cart
                </span>
              </button>

              {/* Enhanced Login Button */}
              <button className="text-white border-2 border-white hover:bg-white hover:text-[#C37B89] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:shadow-lg hover:scale-105">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/70" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 text-white border-2 border-white/30 placeholder-white/70 focus:outline-none focus:bg-white focus:text-gray-900 focus:border-white focus:placeholder-gray-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Mobile Menu Drawer */}
        <div className={`mobile-menu fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#C37B89] to-[#B86B7A] shadow-2xl transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-2xl font-bold">keya</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-pink-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              {[
                { name: 'Home', path: '/', icon: '🏠' },
                { name: 'Categories', path: '/categories', icon: '📂' },
                { name: 'Shop All', path: '/shop-all', icon: '🛍️' },
                { name: 'Wishlist', path: '/wishlist', icon: '❤️' },
                { name: 'Account', path: '/account', icon: '👤' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 text-white hover:text-pink-200 p-4 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-white/80 text-sm mb-2">Need help?</p>
                <button className="text-white font-medium hover:text-pink-200 transition-colors duration-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}