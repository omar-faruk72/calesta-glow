import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Left Section: Logo & Description */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src="src/assets/image/logo.png" 
                alt="Calesta Logo" 
                className="h-36 w-36"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Lorem ipsum dolor sit amet consectetur. Scelerisque lectus habitasse adipiscing.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center Section: Shop Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/all-products" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">All Products</Link></li>
              <li><Link to="/bestsellers" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Bestsellers</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Right Section: About Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">About</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            © {currentYear} Calesta Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;