import React, { useContext, useState } from 'react';
import { User, Package, Camera, ChevronDown } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium text-gray-900 mb-10">My Account</h1>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${activeTab === 'profile' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300'}`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${activeTab === 'orders' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300'}`}
          >
            <Package className="w-4 h-4" /> Order History
          </button>
        </div>

        <div className="grid grid-cols-1 gap-16">
          
          {/* 1. User Information Section */}
          <section>
            <h2 className="text-2xl font-medium mb-8">User Information</h2>
            <div className="relative w-32 h-32 mb-10">
              <img 
                src={user?.photoURL || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-black p-2 rounded-full text-white border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Full name</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Last name</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Email</label>
                <input type="email" value={user?.email} disabled className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Phone</label>
                <input type="tel" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
            </div>
            <button className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
              Update Profile
            </button>
          </section>

          {/* 2. Shipping Address Section */}
          <section>
            <h2 className="text-2xl font-medium mb-8">Shipping Address</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Apartment, suite, etc. (optional)</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">City</label>
                  <input type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
                <div className="space-y-2 text-sm font-bold">
                  <label>State/Province</label>
                  <div className="relative mt-2">
                    <select className="w-full p-3 border border-gray-200 rounded-md appearance-none outline-none font-normal">
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Postal Code</label>
                  <input type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Country</label>
                <div className="relative">
                  <select className="w-full p-3 border border-gray-200 rounded-md appearance-none outline-none">
                    <option>Country</option>
                    <option>Bangladesh</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <button className="mt-8 bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
              Update Shipping Address
            </button>
          </section>

          {/* 3. Change Password Section */}
          <section>
            <h2 className="text-2xl font-medium mb-8">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Current Password</label>
                <input type="password" placeholder="••••••••••••••••" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">New Password</label>
                <input type="password" placeholder="••••••••••••••••" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Confirm New Password</label>
                <input type="password" placeholder="••••••••••••••••" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
              </div>
            </div>
            <button className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
              Change Password
            </button>
          </section>

          {/* Log Out Button */}
          <div className="pt-4">
            <button className="border border-red-500 text-red-500 px-10 py-2 rounded-full font-bold hover:bg-red-50 transition-all">
              Log Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;