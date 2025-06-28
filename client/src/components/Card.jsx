import React from 'react';

export const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12">
      {/* Featured Products Grid */}
      {[
        { title: 'Featured Product', color: 'from-pink-100 to-pink-200', price: '$99.99' },
        { title: 'Popular Item', color: 'from-purple-100 to-purple-200', price: '$79.99' },
        { title: 'Best Seller', color: 'from-blue-100 to-blue-200', price: '$129.99' },
        { title: 'Best Seller', color: 'from-blue-100 to-blue-200', price: '$129.99' },
        { title: 'Best Seller', color: 'from-blue-100 to-blue-200', price: '$129.99' },
        { title: 'Featured Product', color: 'from-pink-100 to-pink-200', price: '$99.99' },
        { title: 'Popular Item', color: 'from-purple-100 to-purple-200', price: '$79.99' },
        { title: 'Popular Item', color: 'from-purple-100 to-purple-200', price: '$79.99' }

      ].map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-md shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div
            className={`h-72 bg-gradient-to-br ${product.color} mb-4 group-hover:scale-105 transition-transform duration-300`}
          ></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#C37B89]">{product.price}</span>
            <button className="bg-[#C37B89] text-white px-4 py-2 hover:bg-[#B86B7A] transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
