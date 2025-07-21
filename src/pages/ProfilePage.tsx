import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import { 
  User, 
  ShoppingCart, 
  Package, 
  Settings, 
  Edit3, 
  Save, 
  X,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  total: number;
  items: number;
}

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const {user, token, dispatch} = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Elegant Cotton Kurti',
      price: 1299,
      quantity: 1,
      size: 'M',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Designer Anarkali',
      price: 2499,
      quantity: 2,
      size: 'L',
      image: 'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Traditional Silk Kurti',
      price: 3299,
      quantity: 1,
      size: 'S',
      image: 'https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [orders] = useState<Order[]>([
    { id: 'ORD001', date: '2024-01-15', status: 'Delivered', total: 4599, items: 2 },
    { id: 'ORD002', date: '2024-01-10', status: 'Shipped', total: 1299, items: 1 },
    { id: 'ORD003', date: '2024-01-05', status: 'Processing', total: 2799, items: 3 },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    contact: user.contact || '',
    address: user.address || ''
  });

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: { token: null, user: null }
    });

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

  const updateHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const update_url = `http://127.0.0.1:5000/user/profile/${user._id}`;
  
    try {
      const response = await fetch(update_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error:', data.message || data.error);
        return;
      }
  
      console.log(data);
  
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-40 mr-40">
      {/* Profile Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-[#8B1538] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile Info
                </button>
                
                <button 
                  onClick={() => setActiveTab('cart')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cart' ? 'bg-[#8B1538] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Cart ({cartItems.length})
                </button>
                
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-[#8B1538] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Order History
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-[#8B1538] text-white' : 'text-gray-700 hover:bg-gray-100'
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
            <form onSubmit={updateHandleSubmit} className="space-y-8">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Profile Information</h3>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1128] transition-colors"
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
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
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
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
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
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
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
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            </form>

            {/* Cart Tab */}
            {activeTab === 'cart' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Shopping Cart</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{cartItems.length} items</p>
                    <p className="text-xl font-bold text-[#8B1538]">₹{totalCartValue.toLocaleString()}</p>
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
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                          <p className="text-lg font-bold text-[#8B1538]">₹{item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
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
                      <button className="w-full bg-[#8B1538] text-white py-3 rounded-lg hover:bg-[#6B1128] transition-colors font-semibold">
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
                          <p className="text-lg font-bold text-[#8B1538]">₹{order.total.toLocaleString()}</p>
                        </div>
                        <button className="px-4 py-2 border border-[#8B1538] text-[#8B1538] rounded-lg hover:bg-[#8B1538] hover:text-white transition-colors">
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
                        <input type="checkbox" defaultChecked className="rounded text-[#8B1538] focus:ring-[#8B1538]" />
                        <span className="ml-3 text-gray-700">Email notifications for orders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-[#8B1538] focus:ring-[#8B1538]" />
                        <span className="ml-3 text-gray-700">SMS notifications for delivery updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-[#8B1538] focus:ring-[#8B1538]" />
                        <span className="ml-3 text-gray-700">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h4>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-[#8B1538] focus:ring-[#8B1538]" />
                        <span className="ml-3 text-gray-700">Allow data for personalized recommendations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-[#8B1538] focus:ring-[#8B1538]" />
                        <span className="ml-3 text-gray-700">Share purchase history for better deals</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h4>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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