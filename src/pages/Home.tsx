import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, RotateCcw, Shield } from 'lucide-react';

const Home = () => {
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

      {/* Newsletter */}
      {/* <section className="py-16 bg-[#7c1034] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for latest collections and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-[#7c1034] px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;