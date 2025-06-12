import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ 
        type: 'REMOVE_FROM_CART', 
        payload: `${id}-${size}-${color}` 
      });
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id, size, color, quantity: newQuantity }
      });
    }
  };

  const removeItem = (id: string, size: string, color: string) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: `${id}-${size}-${color}` 
    });
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-neutral-300 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="bg-neutral-900 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-8">
          Shopping Cart ({state.cart.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="bg-neutral-50 rounded-lg p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-32 h-40 sm:h-32 bg-white rounded-lg overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {item.product.name}
                    </h3>
                    <p className="text-neutral-600">
                      Size: {item.size} | Color: <span className="capitalize">{item.color}</span>
                    </p>
                    <p className="text-lg font-semibold text-neutral-900 mt-2">
                      ${item.product.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-neutral-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="p-2 hover:bg-neutral-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-neutral-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="p-2 hover:bg-neutral-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-neutral-50 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-300 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-neutral-900">Total</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-neutral-900 hover:bg-gold-600 text-white py-4 rounded-full font-semibold text-center block transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full mt-4 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 py-3 rounded-full font-semibold text-center block transition-colors duration-300"
            >
              Continue Shopping
            </Link>

            {subtotal < 200 && (
              <p className="text-sm text-neutral-600 mt-4 text-center">
                Add ${(200 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}