import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, LogIn, UserPlus, History, Settings, LogOut } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext'; 
import toast from 'react-hot-toast';
import axiosSecure from '../../hooks/axiosSecure'; 

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const useAxios = axiosSecure(); 
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    try {
      const res = await useAxios.post('/api/auth/logout');
      console.log("Logout Response:", res.data);

      if (res.data.success || res.status === 200) {
        setUser(null);
        toast.success(res.data.message || "Successfully logged out!");
        setIsUserDropdownOpen(false);
        setIsMobileMenuOpen(false);
        
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    } catch (error) {
      console.error("Logout Error Details:", error.response?.data || error.message);
      setUser(null); 
      navigate('/login');
      toast.error("Logged out with session clear.");
    }
  };

  const navLinks = [
    {
      name: 'Skincare',
      path: '/skincare',
      hasDropdown: true,
      subPages: [
        { name: 'Face Wash', path: '/skincare/face-wash' },
        { name: 'Moisturizers', path: '/skincare/moisturizers' },
        { name: 'Serums', path: '/skincare/serums' }
      ]
    },
    {
      name: 'Collections',
      path: '/collections',
      hasDropdown: true,
      subPages: [
        { name: 'Winter Glow', path: '/collections/winter-glow' },
        { name: 'Summer Fresh', path: '/collections/summer-fresh' }
      ]
    },
    { name: 'About', path: '/about', hasDropdown: false },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <nav className="w-full bg-white relative shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="src/assets/image/logo.png" 
                alt="Calesta Logo" 
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 h-full">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group flex items-center h-full">
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center text-[15px] font-medium transition-all duration-300 relative py-2
                    ${isActive ? 'text-pink-600' : 'text-gray-800 hover:text-pink-500'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {link.hasDropdown && <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>

                {link.hasDropdown && (
                  <div className="absolute left-0 top-[75%] mt-2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-lg overflow-hidden">
                    <div className="py-2">
                      {link.subPages.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-800 hover:text-pink-500 transition-colors">
              <Search className="w-6 h-6 stroke-[1.5]" />
            </button>

            {/* User Icon & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="text-gray-800 hover:text-pink-500 transition-all p-0.5 flex items-center"
              >
                {user ? (
                   <div className="w-9 h-9 rounded-full border-2 border-pink-100 overflow-hidden shadow-sm hover:border-pink-300 transition-all">
                      <img 
                        src={user.image || user.profileImage} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${user.name}`}}
                      />
                   </div>
                ) : (
                  <User className="w-6 h-6 stroke-[1.5]" />
                )}
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden py-2 z-[60]"
                  >
                    {user ? (
                      <>
                        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                          <p className="text-[10px] font-bold text-pink-500 uppercase tracking-[2px] mb-1">Welcome back</p>
                          <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        </div>
                        <Link 
                          to="/profile" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
                        >
                          <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-pink-500" />
                          My Account
                        </Link>
                        <Link 
                          to="/order-history" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
                        >
                          <History className="w-4 h-4 mr-3 text-gray-400 group-hover:text-pink-500" />
                          Order History
                        </Link>
                        <div className="border-t border-gray-50 mt-1">
                          <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-all font-medium"
                          >
                            <LogOut className="w-4 h-4 mr-3 text-red-400" />
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
                        >
                          <LogIn className="w-4 h-4 mr-3 text-gray-400 group-hover:text-pink-500" />
                          Login
                        </Link>
                        <Link 
                          to="/register" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
                        >
                          <UserPlus className="w-4 h-4 mr-3 text-gray-400 group-hover:text-pink-500" />
                          Register
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Bag - Updated with cart length */}
            <Link to="/cart" className="relative group cursor-pointer">
              <ShoppingBag className="w-6 h-6 text-gray-900 stroke-[1.5]" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-pink-400 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              )}
            </Link>
            
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden bg-white px-6 py-10"
          >
            {/* Mobile menu content... (Logo and X icon) */}
            <div className="flex justify-between items-center mb-10">
              <img src="src/assets/image/logo.png" alt="Logo" className="h-12" />
              <X className="w-8 h-8 cursor-pointer text-gray-800" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            <div className="space-y-6 overflow-y-auto max-h-[70vh]">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <NavLink 
                    to={link.path}
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-xl font-bold border-b border-gray-100 pb-2 mb-2 block w-full
                      ${isActive ? 'text-pink-600' : 'text-gray-900'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                  {link.hasDropdown && (
                    <div className="pl-4 space-y-3 mt-2">
                      {link.subPages.map(sub => (
                        <Link 
                          key={sub.name} 
                          to={sub.path} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-gray-600 text-lg"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-8 border-t border-gray-100 flex flex-col space-y-5">
                {user ? (
                   <>
                     <div className="flex items-center space-x-3 mb-2">
                        <img 
                          src={user.image || user.profileImage} 
                          className="w-12 h-12 rounded-full object-cover border border-pink-200"
                          alt="user"
                        />
                        <div>
                          <p className="text-sm text-gray-400">Hello,</p>
                          <p className="text-lg font-bold text-gray-900">{user.name}</p>
                        </div>
                     </div>
                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-700 font-medium">My Account</Link>
                     <Link to="/order-history" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-700 font-medium">Order History</Link>
                     <button onClick={handleLogout} className="text-lg text-red-500 font-bold text-left">Logout</button>
                   </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-700 font-medium">Login</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-700 font-medium border-2 border-black text-center py-3 rounded-lg">Register</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;