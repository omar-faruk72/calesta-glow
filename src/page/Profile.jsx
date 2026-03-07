import React, { useContext, useState } from 'react';
import { User, Package, Camera, ChevronDown } from 'lucide-react';
import OrderHistory from "./OrderHistory";
import { AuthContext } from '../context/AuthContext';
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium text-gray-900 mb-10">My Account</h1>

        {/* Tab Navigation - আপনার ছবির মতো ডিজাইন */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full border transition-all font-medium ${
              activeTab === 'profile' 
              ? 'bg-black text-white border-black shadow-md' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full border transition-all font-medium ${
              activeTab === 'orders' 
              ? 'bg-black text-white border-black shadow-md' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Package className="w-4 h-4" /> Order History
          </button>
        </div>

        {/* Conditional Rendering based on Tab */}
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 gap-16 animate-in fade-in duration-500">
            
            {/* 1. User Information Section */}
            <section>
              <h2 className="text-2xl font-medium mb-8 text-gray-800">User Information</h2>
              <div className="relative w-32 h-32 mb-10">
                <img 
                  src={user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
                />
                <button className="absolute bottom-1 right-1 bg-black p-2 rounded-full text-white border-2 border-white hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Full name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.displayName?.split(' ')[0] || ''}
                    className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Last name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.displayName?.split(' ').slice(1).join(' ') || ''}
                    className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full p-3.5 border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Enter phone number"
                    className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors" 
                  />
                </div>
              </div>
              <button className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Update Profile
              </button>
            </section>

            {/* 2. Shipping Address Section */}
            <section className="pt-4">
              <h2 className="text-2xl font-medium mb-8 text-gray-800">Shipping Address</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Apartment, suite, etc. (optional)</label>
                  <input type="text" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">City</label>
                    <input type="text" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">State/Province</label>
                    <div className="relative">
                      <select className="w-full p-3.5 border border-gray-200 rounded-md appearance-none outline-none pr-10">
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>Barishal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Postal Code</label>
                    <input type="text" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Country</label>
                  <div className="relative">
                    <select className="w-full p-3.5 border border-gray-200 rounded-md appearance-none outline-none pr-10">
                      <option>Country</option>
                      <option>Bangladesh</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button className="mt-10 bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Update Shipping Address
              </button>
            </section>

            {/* 3. Change Password Section */}
            <section className="pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-medium mb-8 text-gray-800">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Current Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">New Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Confirm New Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
              </div>
              <button className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Change Password
              </button>
            </section>

            <div className="pt-8 mb-20 border-t border-gray-100">
              <button className="border-2 border-red-500 text-red-500 px-12 py-2.5 rounded-full font-bold hover:bg-red-50 transition-all active:scale-95">
                Log Out
              </button>
            </div>

          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-500">
            <OrderHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;