import React, { useContext, useState } from 'react';
import { User, Package, Camera, ChevronDown } from 'lucide-react';
import OrderHistory from "./OrderHistory";
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'; 
import axiosSecure from '../hooks/axiosSecure';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); 
  const [activeTab, setActiveTab] = useState('profile');
  const useAxios = axiosSecure(); 
  const navigate = useNavigate();

  // ১. ইউজারের প্রোফাইল আপডেট হ্যান্ডেলার (Validation সহ)
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value;

    if (!name) {
      return toast.error("Please fill up the Full Name field!");
    }
    
    toast.success("Profile Information Updated Successfully!");
  };

  // ২. শিপিং অ্যাড্রেস আপডেট হ্যান্ডেলার (Validation সহ)
  const handleUpdateShipping = (e) => {
    e.preventDefault();
    const form = e.target;
    const address = form.address.value;
    const city = form.city.value;
    const zip = form.zip.value;

    if (!address || !city || !zip) {
      return toast.error("Please fill up all shipping details!");
    }

    toast.success("Shipping Address Updated Successfully!");
  };

  // ৩. পাসওয়ার্ড পরিবর্তন হ্যান্ডেলার (Validation সহ)
  const handleChangePassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPass = form.currentPassword.value;
    const newPass = form.newPassword.value;
    const confirmPass = form.confirmPassword.value;

    if (newPass !== confirmPass) {
      return toast.error("Passwords do not match!");
    }

    toast.success("Password Changed Successfully!");
  };

  // ৪. লগআউট হ্যান্ডেলার (আপনার Navbar-এর লজিক অনুযায়ী)
  const handleLogOut = async () => {
    try {
      const res = await useAxios.post('/api/auth/logout');
      console.log("Logout Response:", res.data);

      if (res.data.success || res.status === 200) {
        setUser(null);
        toast.success(res.data.message || "Successfully logged out!");
        
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

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium text-gray-900 mb-10">My Account</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full border transition-all font-medium ${
              activeTab === 'profile' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full border transition-all font-medium ${
              activeTab === 'orders' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Package className="w-4 h-4" /> Order History
          </button>
        </div>

        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 gap-16 animate-in fade-in duration-500">
            
            {/* 1. User Information Section */}
            <form onSubmit={handleUpdateProfile}>
              <h2 className="text-2xl font-medium mb-8 text-gray-800">User Information</h2>
              <div className="relative w-32 h-32 mb-10">
                <img 
                  src={user.image || user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
                />
                <button type="button" className="absolute bottom-1 right-1 bg-black p-2 rounded-full text-white border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Full name</label>
                  <input 
                    name="fullName"
                    type="text" 
                    required
                    defaultValue={user?.displayName || ''} 
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
              </div>
              <button type="submit" className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Update Profile
              </button>
            </form>

            {/* 2. Shipping Address Section */}
            <form onSubmit={handleUpdateShipping} className="pt-4 border-t border-gray-100 mt-4">
              <h2 className="text-2xl font-medium mb-8 text-gray-800 mt-4">Shipping Address</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Apartment, suite, etc.</label>
                  <input name="address" type="text" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">City</label>
                    <input name="city" type="text" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">State/Province</label>
                    <div className="relative">
                      <select name="state" className="w-full p-3.5 border border-gray-200 rounded-md appearance-none outline-none pr-10">
                        <option value="Dhaka">Dhaka</option>
                        <option value="Barishal">Barishal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Postal Code</label>
                    <input name="zip" type="text" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-10 bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Update Shipping Address
              </button>
            </form>

            {/* 3. Change Password Section */}
            <form onSubmit={handleChangePassword} className="pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-medium mb-8 text-gray-800">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Current Password</label>
                  <input name="currentPassword" type="password" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">New Password</label>
                  <input name="newPassword" type="password" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Confirm Password</label>
                  <input name="confirmPassword" type="password" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-gray-400" />
                </div>
              </div>
              <button type="submit" className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
                Change Password
              </button>
            </form>

            <div className="pt-8 mb-20 border-t border-gray-100">
              <button 
                onClick={handleLogOut}
                type="button"
                className="border-2 border-red-500 text-red-500 px-12 py-2.5 rounded-full font-bold hover:bg-red-50 transition-all active:scale-95"
              >
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