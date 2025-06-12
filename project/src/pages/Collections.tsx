import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Eye } from 'lucide-react';

const collections = [
  {
    id: 'spring-2024',
    title: 'Spring Awakening 2024',
    subtitle: 'Fresh Beginnings',
    description: 'Embrace the season of renewal with our latest spring collection featuring flowing silhouettes, vibrant florals, and breathable fabrics perfect for warmer days.',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'March 2024',
    items: 24,
    featured: true
  },
  {
    id: 'winter-elegance',
    title: 'Winter Elegance',
    subtitle: 'Sophisticated Warmth',
    description: 'Luxurious coats, cashmere sweaters, and tailored pieces that combine comfort with refined style for the colder months.',
    image: 'https://images.pexels.com/photos/7679764/pexels-photo-7679764.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'December 2023',
    items: 18,
    featured: false
  },
  {
    id: 'summer-breeze',
    title: 'Summer Breeze',
    subtitle: 'Effortless Chic',
    description: 'Light, airy fabrics and relaxed silhouettes perfect for summer adventures. From beach days to city strolls.',
    image: 'https://images.pexels.com/photos/7679683/pexels-photo-7679683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'June 2023',
    items: 32,
    featured: false
  },
  {
    id: 'autumn-harvest',
    title: 'Autumn Harvest',
    subtitle: 'Rich & Warm',
    description: 'Embrace the changing seasons with rich textures, warm tones, and layering pieces that transition beautifully.',
    image: 'https://images.pexels.com/photos/7679448/pexels-photo-7679448.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'September 2023',
    items: 28,
    featured: false
  },
  {
    id: 'timeless-classics',
    title: 'Timeless Classics',
    subtitle: 'Forever Elegant',
    description: 'Investment pieces that transcend seasons and trends. Classic cuts, premium materials, and enduring style.',
    image: 'https://images.pexels.com/photos/7679336/pexels-photo-7679336.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Ongoing',
    items: 15,
    featured: true
  },
  {
    id: 'evening-glamour',
    title: 'Evening Glamour',
    subtitle: 'After Dark',
    description: 'Sophisticated pieces for special occasions. Elegant dresses, statement accessories, and refined evening wear.',
    image: 'https://images.pexels.com/photos/7679741/pexels-photo-7679741.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Year Round',
    items: 22,
    featured: false
  }
];

export default function Collections() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCollections = selectedFilter === 'all' 
    ? collections 
    : collections.filter(collection => 
        selectedFilter === 'featured' ? collection.featured : true
      );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Collections Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 animate-fade-in">
            Our Collections
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto animate-slide-up">
            Discover curated collections that tell a story of style, craftsmanship, and timeless elegance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-neutral-100 rounded-full p-1">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === 'all'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Collections
            </button>
            <button
              onClick={() => setSelectedFilter('featured')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === 'featured'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Featured
            </button>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCollections.map((collection, index) => (
            <div
              key={collection.id}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in ${
                index === 0 && selectedFilter === 'all' ? 'lg:col-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`relative overflow-hidden ${
                index === 0 && selectedFilter === 'all' ? 'aspect-[2/1]' : 'aspect-[4/3]'
              }`}>
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {collection.featured && (
                  <div className="absolute top-6 left-6 bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center space-x-4 text-sm text-neutral-300 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{collection.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{collection.items} items</span>
                    </div>
                  </div>
                  <p className="text-gold-400 font-medium mb-1">{collection.subtitle}</p>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
                    {collection.title}
                  </h3>
                  <p className="text-neutral-200 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <Link
                    to={`/shop?collection=${collection.id}`}
                    className="group/btn inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-neutral-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-neutral-50 rounded-2xl p-12">
          <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Browse our complete catalog or get in touch with our styling team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-neutral-900 hover:bg-gold-600 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300"
            >
              Browse All Products
            </Link>
            <Link
              to="/contact"
              className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-8 py-4 rounded-full font-semibold transition-colors duration-300"
            >
              Contact Styling Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}