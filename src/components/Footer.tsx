import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#7c1034] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">KurtiShop</h3>
            <p className="text-gray-200 mb-4">
              Your trusted destination for beautiful, authentic kurtis. We offer a wide collection of traditional and modern designs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-200 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-200" />
                <span className="text-gray-200">123 Fashion Street, Mumbai, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-200" />
                <span className="text-gray-200">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-200" />
                <span className="text-gray-200">info@kurtishop.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-gray-200">
            © 2024 KurtiShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;