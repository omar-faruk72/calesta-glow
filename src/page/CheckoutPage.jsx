import React, { useContext, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; // Axios ইম্পোর্ট করুন
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '', 
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '', // ব্যাকএন্ডের মডেল অনুযায়ী zipCode রাখা হলো
    country: 'Bangladesh'
  });

  const [shippingMethod, setShippingMethod] = useState(5.99);
  const [loading, setLoading] = useState(false);

  // ইনপুট হ্যান্ডেলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ক্যালকুলেশন
  const subtotal = cart.reduce((total, item) => total + (item.salePrice * item.quantity), 0);
  const grandTotal = subtotal + shippingMethod;

  // পেমেন্ট হ্যান্ডেলার ফাংশন
  const handlePayment = async () => {
    // ১. ফর্ম ভ্যালিডেশন
    if (!formData.phone || !formData.address || !formData.city) {
      return toast.error("Please fill in the required fields (Phone, Address, City)");
    }

    if (cart.length === 0) {
      return toast.error("Your cart is empty!");
    }

    setLoading(true);

    // ২. ব্যাকএন্ডের জন্য ডাটা অবজেক্ট তৈরি
    const orderData = {
      customerInfo: formData,
      items: cart,
      totalAmount: grandTotal.toFixed(2),
      shippingFee: shippingMethod
    };

    try {
      // ৩. আপনার ব্যাকএন্ড এন্ডপয়েন্টে কল (আপনার app.js অনুযায়ী route চেক করুন)
      const response = await axios.post('http://localhost:5001/api/payment/create-checkout-session', orderData);

      if (response.data.success && response.data.url) {
        // ৪. ইউজারকে SSLCommerz গেটওয়েতে রিডাইরেক্ট করা
        window.location.replace(response.data.url);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Payment Initiation Error:", error);
      toast.error(error.response?.data?.message || "Failed to connect to the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Shipping Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white p-10 rounded-sm shadow-sm">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Shipping Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="017xxxxxxxx"
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Full Address *</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, Road no, Area..."
                    className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">City *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">State/Province</label>
                    <div className="relative">
                      <select 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md appearance-none outline-none pr-10"
                      >
                        <option value="">Select</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Barishal">Barishal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Postal Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md outline-none focus:border-pink-300 transition-all" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-10 rounded-sm shadow-sm">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Shipping Method</h2>
              
              <div className="space-y-4">
                {[
                  { label: "Standard Shipping (5-7 business days)", price: 5.99 },
                  { label: "Express Shipping (2-3 business days)", price: 12.99 },
                  { label: "Overnight Shipping (1 business day)", price: 24.99 },
                ].map((method) => (
                  <label 
                    key={method.price}
                    className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer transition-all ${shippingMethod === method.price ? 'border-black ring-1 ring-black' : 'border-gray-200'}`}
                    onClick={() => setShippingMethod(method.price)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === method.price ? 'border-black' : 'border-gray-300'}`}>
                        {shippingMethod === method.price && <div className="w-3 h-3 bg-black rounded-full" />}
                      </div>
                      <span className="font-medium text-gray-800">{method.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">${method.price}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end mt-10">
                <button 
                  onClick={handlePayment}
                  disabled={loading}
                  className={`bg-black text-white px-10 py-4 rounded-md font-bold flex items-center gap-2 transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-white p-8 rounded-sm shadow-sm border h-fit sticky top-28">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-6 max-h-80 overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <img src={item.thumbnail} className="w-20 h-20 object-cover rounded-md border" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">${(item.salePrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">${shippingMethod.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-gray-900 border-t pt-4">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;