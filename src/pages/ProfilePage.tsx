import { useState, useEffect, useContext } from 'react';
import {
  User,
  ShoppingCart,
  Package,
  Settings,
  Edit3,
  Save,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  total: number;
  items: number;
}

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user, token, dispatch } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCartItems() {
      if (!user || !token) return;

      try {
        const response = await fetch(`http://localhost:5000/user/${user._id}/cart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.items || []);
          console.log('Cart items fetched successfully:', data.items);
        } else {
          console.error('Failed to fetch cart items:', data.message || data.error);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
    fetchCartItems();
  }, []);

  const navigate = useNavigate();
  const [orders] = useState<Order[]>([
    { id: 'ORD001', date: '2024-01-15', status: 'Delivered', total: 4599, items: 2 },
    { id: 'ORD002', date: '2024-01-10', status: 'Shipped', total: 1299, items: 1 },
    { id: 'ORD003', date: '2024-01-05', status: 'Processing', total: 2799, items: 3 },
  ]);

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    contact: user.contact || '',
    address: user.address || ''
  });

  // Update formData when user data changes or when editing starts
  useEffect(() => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      contact: user.contact || '',
      address: user.address || ''
    });
  }, [user, isEditing]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };


  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/${user._id}/${itemId}`, {
        method: 'DELETE',
        // headers: {
        //   Authorization: `Bearer ${token}`, // Optional if you use auth
        // },
      });

      const data = await res.json();
      if (res.ok) {
        // Update UI
        setCartItems(prev => prev.filter(item => item._id !== itemId));
      } else {
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: { token: null, user: null }
    });
    console.log('Logging out...');

    navigate('/');
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Shipped': return 'text-blue-600 bg-blue-50';
      case 'Processing': return 'text-orange-600 bg-orange-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleEditToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const updateHandleSubmit = async (e: React.FormEvent) => {
    if (!isEditing) return;
    e.preventDefault();

    const update_url = `http://127.0.0.1:5000/user/profile/${user._id}`;

    try {
      console.log('Updating profile with:', formData);
      const response = await fetch(update_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: { ...user, ...formData },
          token
        }
      });

      setIsEditing(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 lg:px-40">
      <div className="max-w-full mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile Info
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cart')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'cart' ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Cart ({cartItems.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Order History
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Profile Information</h3>
                  <button
                    type="button"
                    onClick={isEditing ? updateHandleSubmit : handleEditToggle}
                    className="flex items-center px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 mr-2" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user.contact}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Tab */}
            {activeTab === 'cart' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Shopping Cart</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{cartItems.length} items</p>
                    <p className="text-xl font-bold text-red-800">₹{totalCartValue.toLocaleString()}</p>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                          <p className="text-lg font-bold text-red-800">₹{item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, -1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-semibold text-gray-900">Total: ₹{totalCartValue.toLocaleString()}</span>
                      </div>
                      <button
                        type="button"
                        className="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-colors font-semibold"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h3>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">{order.items} items</p>
                          <p className="text-lg font-bold text-red-800">₹{order.total.toLocaleString()}</p>
                        </div>
                        <button
                          type="button"
                          className="px-4 py-2 border border-red-800 text-red-800 rounded-lg hover:bg-red-800 hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h3>

                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h4>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-red-800 focus:ring-red-800" />
                        <span className="ml-3 text-gray-700">Email notifications for orders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-red-800 focus:ring-red-800" />
                        <span className="ml-3 text-gray-700">SMS notifications for delivery updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-red-800 focus:ring-red-800" />
                        <span className="ml-3 text-gray-700">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h4>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-red-800 focus:ring-red-800" />
                        <span className="ml-3 text-gray-700">Allow data for personalized recommendations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-red-800 focus:ring-red-800" />
                        <span className="ml-3 text-gray-700">Share purchase history for better deals</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h4>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;