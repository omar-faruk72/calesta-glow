import React, { useContext, useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ১. ফর্ম স্টেট - ভ্যালিডেশন এরর এড়াতে ডিফল্ট ভ্যালু নিশ্চিত করা হয়েছে
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "",
    email: "",
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Bangladesh'
  });

  // ইউজার লোড হলে স্টেট আপডেট করা
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user?.displayName?.split(' ')[0] || '',
        lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
        email: user?.email || ''
      }));
    }
  }, [user]);

  const [shippingMethod, setShippingMethod] = useState(5.99);
  const [loading, setLoading] = useState(false);

  // ইনপুট হ্যান্ডেলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ক্যালকুলেশন
  const subtotal = cart.reduce((total, item) => total + (item.salePrice * item.quantity), 0);
  const grandTotal = subtotal + shippingMethod;

  // পেমেন্ট এবং ডাটা সেভ হ্যান্ডেলার
  const handlePayment = async () => {
    // ফর্ম ভ্যালিডেশন (Front-end check)
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      return toast.error("Please fill in all required fields (Name, Email, Phone, Address, City)");
    }

    if (cart.length === 0) {
      return toast.error("Your cart is empty!");
    }

    setLoading(true);

    // ইউনিক ট্রানজেকশন আইডি
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // ২. আপনার মঙ্গুজ মডেলের (Shipping.js) স্ট্রাকচার অনুযায়ী ডাটা অবজেক্ট
    const orderData = {
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      items: cart.map(item => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        salePrice: item.salePrice,
        thumbnail: item.thumbnail
      })),
      totalAmount: Number(grandTotal.toFixed(2)),
      shippingFee: Number(shippingMethod),
      transactionId: transactionId,
      paymentStatus: 'pending',
      orderStatus: 'Processing'
    };

    try {
      console.log("Sending order data to server:", orderData);

      // ৩. আপনার শিপিং কালেকশনে ডাটা পোস্ট করা
      const dbResponse = await axios.post('https://calesta-beauty-server.vercel.app/api/shipping/create', orderData);

      if (dbResponse.data.success) {
        // ৪. ডাটাবেজে সেভ হওয়ার পর পেমেন্ট গেটওয়েতে রিডাইরেক্ট করার জন্য কল
        const paymentResponse = await axios.post('https://calesta-beauty-server.vercel.app/api/payment/create-checkout-session', orderData);

        if (paymentResponse.data.success && paymentResponse.data.url) {
          window.location.replace(paymentResponse.data.url);
        } else {
          toast.error("Order saved, but payment gateway failed to respond.");
        }
      }
    } catch (error) {
      console.error("Checkout Error Detail:", error.response?.data);
      const serverError = error.response?.data?.message || "Validation Error! Check console.";
      toast.error(serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Shipping Forms */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="017XXXXXXXX" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black transition-all" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House, Road, Area" required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">State</label>
                  <div className="relative">
                    <select name="state" value={formData.state} onChange={handleChange} className="w-full p-3.5 border border-gray-200 rounded-md appearance-none outline-none pr-10">
                      <option value="">Select</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Barishal">Barishal</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Postal Code</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-3.5 border border-gray-200 rounded-md outline-none focus:border-black" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Shipping Method</h2>
              <div className="space-y-4">
                {[
                  { label: "Standard Shipping (5-7 business days)", price: 5.99 },
                  { label: "Express Shipping (2-3 business days)", price: 12.99 },
                ].map((method) => (
                  <label key={method.price} className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer transition-all ${shippingMethod === method.price ? 'border-black bg-gray-50' : 'border-gray-200'}`} onClick={() => setShippingMethod(method.price)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === method.price ? 'border-black' : 'border-gray-300'}`}>
                        {shippingMethod === method.price && <div className="w-3 h-3 bg-black rounded-full" />}
                      </div>
                      <span className="font-medium">{method.label}</span>
                    </div>
                    <span className="font-bold">${method.price}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end mt-10">
                <button onClick={handlePayment} disabled={loading} className={`bg-black text-white px-12 py-4 rounded-md font-bold flex items-center gap-2 transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 shadow-xl'}`}>
                  {loading ? 'Processing Order...' : 'Confirm & Pay'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 sticky top-28 h-fit">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-6 max-h-80 overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="relative">
                    <img src={item.thumbnail} className="w-16 h-16 object-cover rounded-md border" alt={item.name} />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xs leading-tight line-clamp-2">{item.name}</h4>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">${(item.salePrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-6 text-gray-600 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold text-gray-900">${shippingMethod.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-black text-gray-900 border-t pt-4 mt-2">
                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;