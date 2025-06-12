import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">LUXE</h3>
            <p className="text-neutral-300 mb-6 max-w-md">
              Discover timeless elegance and contemporary fashion. We curate premium clothing 
              for the modern individual who values quality and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-neutral-300 hover:text-gold-400 transition-colors">Shop</Link></li>
              <li><Link to="/collections" className="text-neutral-300 hover:text-gold-400 transition-colors">Collections</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-gold-400 transition-colors">Contact</Link></li>
              <li><Link to="/size-guide" className="text-neutral-300 hover:text-gold-400 transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/returns" className="text-neutral-300 hover:text-gold-400 transition-colors">Returns</Link></li>
              <li><Link to="/shipping" className="text-neutral-300 hover:text-gold-400 transition-colors">Shipping</Link></li>
              <li><Link to="/faq" className="text-neutral-300 hover:text-gold-400 transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-neutral-300 hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-neutral-300 hover:text-gold-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gold-400" />
              <span className="text-neutral-300">hello@luxefashion.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gold-400" />
              <span className="text-neutral-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gold-400" />
              <span className="text-neutral-300">New York, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} LUXE Fashion Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}