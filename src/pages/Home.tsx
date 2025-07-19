import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, RotateCcw, Shield, Instagram, Play } from 'lucide-react';

type InstagramPost = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
};

const Home = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set default posts directly for now
    setInstagramPosts([
      {
        id: '1',
        caption: 'Beautiful handcrafted kurti collection now available! ✨ #Keya #HandmadeWithLove',
        media_type: 'IMAGE',
        media_url: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        permalink: 'https://instagram.com/labelkeya_',
        timestamp: '2024-01-15T10:30:00+0000'
      },
      {
        id: '2',
        caption: 'Traditional meets modern in our latest Anarkali designs 💫',
        media_type: 'VIDEO',
        media_url: 'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=400',
        permalink: 'https://instagram.com/labelkeya_',
        timestamp: '2024-01-14T15:45:00+0000'
      },
      {
        id: '3',
        caption: 'Cotton comfort for everyday elegance 🌸 Shop now!',
        media_type: 'IMAGE',
        media_url: 'https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=400',
        permalink: 'https://instagram.com/labelkeya_',
        timestamp: '2024-01-13T12:20:00+0000'
      },
      {
        id: '4',
        caption: 'Behind the scenes: Creating magic one stitch at a time ✂️',
        media_type: 'VIDEO',
        media_url: 'https://images.pexels.com/photos/8532619/pexels-photo-8532619.jpeg?auto=compress&cs=tinysrgb&w=400',
        permalink: 'https://instagram.com/labelkeya_',
        timestamp: '2024-01-12T09:15:00+0000'
      },
      {
        id: '5',
        caption: 'Silk kurtis that make every occasion special 💖 #LuxuryFashion',
        media_type: 'IMAGE',
        media_url: 'https://images.pexels.com/photos/8532620/pexels-photo-8532620.jpeg?auto=compress&cs=tinysrgb&w=400',
        permalink: 'https://instagram.com/labelkeya_',
        timestamp: '2024-01-11T16:30:00+0000'
      }
    ]);
    setLoading(false);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Elegant Cotton Kurti",
      price: 1299,
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Cotton"
    },
    {
      id: 2,
      name: "Designer Anarkali",
      price: 2499,
      image: "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Anarkali"
    },
    {
      id: 3,
      name: "Casual Printed Kurti",
      price: 899,
      image: "https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Casual"
    },
    {
      id: 4,
      name: "Traditional Silk Kurti",
      price: 3299,
      image: "https://images.pexels.com/photos/8532619/pexels-photo-8532619.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Silk"
    }
  ];

  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-[#7c1034]" />,
      title: "Premium Quality",
      description: "Hand-picked kurtis made from finest fabrics"
    },
    {
      icon: <Truck className="h-8 w-8 text-[#7c1034]" />,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹1000"
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-[#7c1034]" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      icon: <Shield className="h-8 w-8 text-[#7c1034]" />,
      title: "Secure Payment",
      description: "100% secure payment gateway"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7c1034] to-[#9a1a42] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-6">
            केया
          </h1>
          <Link
            to="/products"
            className="bg-white text-[#7c1034] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.category}</p>
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
        </div>
      </section>

      {/* Instagram Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Instagram className="h-8 w-8 text-[#7c1034] mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                Follow Our Journey
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with us on Instagram for the latest designs, behind-the-scenes moments, and styling inspiration
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c1034]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {instagramPosts.map((post) => (
                <div key={post.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={post.media_url}
                      alt="Instagram post"
                      className="w-full h-64 object-cover"
                    />
                    {post.media_type === 'VIDEO' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm line-clamp-3">
                          {post.caption ? post.caption.substring(0, 100) + (post.caption.length > 100 ? '...' : '') : 'View on Instagram'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7c1034] hover:text-[#6b0d2a] transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://instagram.com/labelkeya_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#7c1034] to-[#9a1a42] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#6b0d2a] hover:to-[#8a1739] transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Follow @labelkeya_
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;