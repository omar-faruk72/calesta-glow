import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, Save } from 'lucide-react';

const Settings = () => {
  // ১. ডিফল্ট ডাটা দিয়ে স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    supportEmail: 'support@calesta.com',
    currentPassword: '123456',
    newPassword: '123456',
    confirmPassword: '123456'
  });

  // ২. ইনপুট চেঞ্জ হ্যান্ডলার (যাতে ফিল্ডে লিখা যায়)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ৩. সেভ হ্যান্ডলার (অ্যালার্ট দিবে এবং ডাটা রেখে দিবে)
  const handleSave = (e) => {
    e.preventDefault();
    
    // টোস্ট বা অ্যালার্ট মেসেজ
    alert("Save Successfully! ✅");
    
    // ডাটাগুলো স্টেট-এই আছে, তাই অটোমেটিক ফিল্ডে থেকে যাবে এবং আবার চেঞ্জ করা যাবে।
    console.log("Saved Data:", formData);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account preferences and security</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* --- General Settings Section --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <ShieldCheck size={20} className="text-pink-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">General</h2>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="w-48 text-sm font-bold text-gray-600 flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                Support Email :
              </label>
              <input 
                type="email" 
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleInputChange}
                className="flex-1 px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-100 outline-none font-bold text-sm text-gray-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- Security Settings Section --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Lock size={20} className="text-pink-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Security</h2>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="w-48 text-sm font-bold text-gray-600">Currently Password:</label>
              <input 
                type="password" 
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="flex-1 px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-100 outline-none font-bold text-sm text-gray-600 transition-all"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="w-48 text-sm font-bold text-gray-600">New Password:</label>
              <input 
                type="password" 
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="flex-1 px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-100 outline-none font-bold text-sm text-gray-600 transition-all"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="w-48 text-sm font-bold text-gray-600">Confirm Password:</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="flex-1 px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-100 outline-none font-bold text-sm text-gray-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-black text-white px-10 py-4 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-95"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default Settings;