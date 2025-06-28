import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Send,
  Heart,
  ArrowUp,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C37B89] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6">
                <h3 className="text-3xl font-bold bg-[#C37B89] bg-clip-text text-transparent">
                  keya
                </h3>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover amazing products with our beautiful shopping experience. Quality, style, and customer satisfaction are our top priorities.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#C37B89] transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                  <span>hello@keya.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#C37B89] transition-colors duration-200">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#C37B89] transition-colors duration-200">
                  <MapPin className="h-5 w-5" />
                  <span>123 Fashion St, Style City, SC 12345</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'Shop All', path: '/shop-all' },
                  { name: 'New Arrivals', path: '/new-arrivals' },
                  { name: 'Sale', path: '/sale' },
                  { name: 'Gift Cards', path: '/gift-cards' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-[#C37B89] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  'Contact Us',
                  'FAQ',
                  'Shipping Info',
                  'Returns & Exchanges',
                  'Size Guide',
                  'Track Your Order'
                ].map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-gray-300 hover:text-[#C37B89] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About & Legal */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">About & Legal</h4>
              <ul className="space-y-3">
                {[
                  'About Us',
                  'Careers',
                  'Press',
                  'Privacy Policy',
                  'Terms of Service',
                  'Accessibility'
                ].map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-gray-300 hover:text-[#C37B89] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Copyright */}
              <div className="text-gray-400 text-center md:text-left">
                <p>&copy; {currentYear} Keya. All rights reserved. Made with ❤️ for fashion lovers.</p>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'YouTube' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-700/50 hover:bg-[#C37B89] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  >
                    <social.icon className="h-5 w-5 text-gray-300 group-hover:text-white" />
                  </a>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">We accept:</span>
                <div className="flex gap-2">
                  {['VISA', 'MC', 'AMEX', 'PP'].map((method) => (
                    <div
                      key={method}
                      className="w-10 h-6 bg-white rounded text-gray-800 text-xs font-bold flex items-center justify-center"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#C37B89] hover:from-[#B86B7A] hover:to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-white group-hover:animate-bounce" />
      </button>
    </footer>
  );
}