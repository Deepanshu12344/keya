import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Lock, 
  CreditCard, 
  Truck, 
  Shield, 
  ChevronDown,
  Tag,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  
  // Form state
  const [customerDetails, setCustomerDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    country: 'India',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Premium Full Sleeve Peplum Top",
      color: "Ocean Blue",
      size: "M",
      quantity: 1,
      price: 649,
      originalPrice: 899,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 0; // Free delivery
  const taxes = 0;
  const discount = isPromoApplied ? 50 : 0;
  const total = subtotal + delivery + taxes - discount;

  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerDetails(prev => ({ ...prev, [field]: value }));
    } else if (section === 'delivery') {
      setDeliveryDetails(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setCardDetails(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Customer details validation
    if (!customerDetails.email) newErrors.email = 'Email is required';
    if (!customerDetails.firstName) newErrors.firstName = 'First name is required';
    if (!customerDetails.lastName) newErrors.lastName = 'Last name is required';
    if (!customerDetails.phone) newErrors.phone = 'Phone number is required';
    
    // Delivery details validation
    if (!deliveryDetails.address) newErrors.address = 'Address is required';
    if (!deliveryDetails.city) newErrors.city = 'City is required';
    if (!deliveryDetails.state) newErrors.state = 'State is required';
    if (!deliveryDetails.pincode) newErrors.pincode = 'PIN code is required';
    
    // Payment validation
    if (paymentMethod === 'card') {
      if (!cardDetails.number) newErrors.cardNumber = 'Card number is required';
      if (!cardDetails.expiry) newErrors.expiry = 'Expiry date is required';
      if (!cardDetails.cvv) newErrors.cvv = 'CVV is required';
      if (!cardDetails.name) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'save50') {
      setIsPromoApplied(true);
      setShowPromoInput(false);
    } else {
      setErrors(prev => ({ ...prev, promo: 'Invalid promo code' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Redirect to success page
      navigate('/order-success', {
        state: {
          orderNumber: 'KF' + Date.now(),
          total: total,
          items: cartItems
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors({ general: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">keya</h1>
                <span className="text-gray-400">|</span>
                <h2 className="text-xl font-medium text-gray-700">CHECKOUT</h2>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Login Prompt */}
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-700">
                Have an account?{' '}
                <button className="text-[#7C1034] hover:underline font-medium">
                  Log in
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.firstName}
                        onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.lastName}
                        onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Delivery details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country/Region *
                    </label>
                    <div className="relative">
                      <select
                        value={deliveryDetails.country}
                        onChange={(e) => handleInputChange('delivery', 'country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] appearance-none bg-white"
                      >
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={deliveryDetails.address}
                      onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Street address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryDetails.apartment}
                      onChange={(e) => handleInputChange('delivery', 'apartment', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={deliveryDetails.city}
                        onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={deliveryDetails.state}
                        onChange={(e) => handleInputChange('delivery', 'state', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN code *
                      </label>
                      <input
                        type="text"
                        value={deliveryDetails.pincode}
                        onChange={(e) => handleInputChange('delivery', 'pincode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="PIN code"
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment method</h3>
                
                <div className="space-y-4">
                  {/* Payment Options */}
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-[#7C1034] focus:ring-[#7C1034]"
                      />
                      <CreditCard className="h-5 w-5 ml-3 mr-2 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-[#7C1034] focus:ring-[#7C1034]"
                      />
                      <div className="h-5 w-5 ml-3 mr-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        U
                      </div>
                      <span className="font-medium">UPI</span>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-[#7C1034] focus:ring-[#7C1034]"
                      />
                      <Truck className="h-5 w-5 ml-3 mr-2 text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card number *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => handleInputChange('payment', 'number', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry date *
                          </label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                              errors.expiry ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiry && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={cardDetails.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder name *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => handleInputChange('payment', 'name', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200 ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Name on card"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* UPI Details */}
                  {paymentMethod === 'upi' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] transition-all duration-200"
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#7C1034] hover:bg-[#B86B7A] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Complete Order</span>
                  </>
                )}
              </button>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {errors.general}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Order summary ({cartItems.length})
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.color} • Size: {item.size}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-[#7C1034]">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                {!showPromoInput ? (
                  <button
                    onClick={() => setShowPromoInput(true)}
                    className="flex items-center text-[#7C1034] hover:text-[#B86B7A] font-medium transition-colors duration-200"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    Enter a promo code
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C1034] text-sm"
                        placeholder="Promo code"
                      />
                      <button
                        onClick={handlePromoCode}
                        className="px-4 py-2 bg-[#7C1034] text-white rounded-lg hover:bg-[#B86B7A] transition-colors duration-200 text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {errors.promo && (
                      <p className="text-sm text-red-600">{errors.promo}</p>
                    )}
                    {isPromoApplied && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Promo code applied!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;