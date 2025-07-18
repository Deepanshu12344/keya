import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-8" />
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some beautiful kurtis to your cart!</p>
        <Link
          to="/products"
          className="bg-[#7c1034] text-white px-8 py-3 rounded-lg hover:bg-[#6b0d2a] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="p-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-xl font-bold text-[#7c1034]">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{getCartTotal() >= 1000 ? 'Free' : '₹100'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{Math.round(getCartTotal() * 0.18)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{getCartTotal() + (getCartTotal() >= 1000 ? 0 : 100) + Math.round(getCartTotal() * 0.18)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#7c1034] text-white py-3 rounded-lg hover:bg-[#6b0d2a] transition-colors mb-4">
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="w-full border border-[#7c1034] text-[#7c1034] py-3 rounded-lg hover:bg-[#7c1034] hover:text-white transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;