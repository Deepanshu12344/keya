import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '5', label: 'Years Experience' },
    { number: '50+', label: 'Cities Served' }
  ];

  const values = [
    {
      icon: <Award className="h-12 w-12 text-[#7c1034]" />,
      title: "Quality First",
      description: "We source only the finest fabrics and ensure each kurti meets our high standards."
    },
    {
      icon: <Users className="h-12 w-12 text-[#7c1034]" />,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We provide excellent customer service and support."
    },
    {
      icon: <Globe className="h-12 w-12 text-[#7c1034]" />,
      title: "Traditional Craftsmanship",
      description: "We work with skilled artisans who bring traditional techniques to modern designs."
    },
    {
      icon: <Heart className="h-12 w-12 text-[#7c1034]" />,
      title: "Ethical Practices",
      description: "We believe in fair trade and sustainable practices throughout our supply chain."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#7c1034] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About KurtiShop</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We are passionate about bringing you the finest collection of kurtis that blend traditional craftsmanship with modern style.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2019, KurtiShop started as a small family business with a simple mission: to make beautiful, high-quality kurtis accessible to women everywhere. What began as a passion project has grown into a trusted brand serving thousands of customers across India.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that every woman deserves to feel confident and beautiful in what she wears. That's why we carefully curate our collection, working directly with skilled artisans and using only the finest fabrics to create kurtis that combine comfort, style, and affordability.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be one of the leading online destinations for kurtis, but we haven't forgotten our roots. We continue to prioritize quality, customer service, and the timeless art of traditional Indian craftsmanship.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#7c1034] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#7c1034] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To celebrate the beauty of Indian traditional wear by providing women with high-quality, stylish, and affordable kurtis that make them feel confident and beautiful every day.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;