import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Loader2, PackageOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const UserOrder = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get(`https://calesta-beauty-server.vercel.app/api/shipping/my-orders/${user.email}`);
        if (response.data.success && response.data.data.length > 0) {
          setOrder(response.data.data[0]);
        }
      } catch (error) {
        console.error("Order Fetch Error:", error);
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5E6D3]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6D3]">
        <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] px-4 py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-900 font-medium mb-10 hover:opacity-70 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Account
        </button>

        <div className="bg-white rounded-sm shadow-sm p-10 md:p-16 border border-gray-100">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Order {order.transactionId.replace('TXN-', 'ORD-')}
              </h1>
              <p className="text-gray-500 font-medium">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>
            <span className="bg-[#D5E5DB] text-[#4A725A] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {order.orderStatus || 'Shipped'}
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-16">
            <button 
              onClick={() => setActiveTab('summary')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'summary' ? 'bg-black text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab('shipping')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'shipping' ? 'bg-black text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Shipping
            </button>
          </div>

          {activeTab === 'summary' ? (
            <div className="animate-in fade-in duration-500">
              {/* Order Items Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Order Items</h2>
                <div className="space-y-10">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex gap-6 items-center">
                        <div className="bg-gray-50 p-2 border border-gray-100 rounded-sm">
                          <img src={item.thumbnail} alt={item.name} className="w-20 h-20 object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-gray-900 text-lg md:text-xl leading-none">{item.name}</h4>
                          <p className="text-gray-400 text-sm font-medium">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-gray-900">${item.salePrice.toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[1px] bg-gray-100 w-full mb-12"></div>
              {/* Price Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-bold">${(order.totalAmount - order.shippingFee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#59BA7F] font-medium">
                    <span>Discount (10%)</span>
                    <span>-$5.99</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-gray-900 font-bold">${order.shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium pb-8 border-b border-gray-100">
                    <span>TAX</span>
                    <span className="text-gray-900 font-bold">$15.99</span>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">Total</span>
                    <span className="text-3xl font-black text-gray-900 tracking-tight">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Shipping Tab: স্ক্রিনশট অনুযায়ী আপডেট করা ডিজাইন */
            <div className="animate-in slide-in-from-right duration-500 space-y-12">
              
              {/* Shipping Address Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shipping Address</h2>
                <div className="text-lg text-gray-700 font-medium leading-relaxed">
                  <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                  <p className="lowercase">{order.customerInfo.email}</p>
                  <p>{order.customerInfo.phone}</p>
                  <p>{order.customerInfo.address}</p>
                  <p>{order.customerInfo.city}, {order.customerInfo.state || order.customerInfo.city} {order.customerInfo.zipCode}</p>
                  <p>{order.customerInfo.country}</p>
                </div>
              </div>

              <div className="h-[1px] bg-gray-100 w-full"></div>

              {/* Shipping Method Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shipping Method</h2>
                <p className="text-lg text-gray-700 font-medium">Standard Shipping (5-7 business days)</p>
              </div>

              <div className="h-[1px] bg-gray-100 w-full"></div>

              {/* Tracking Information Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Tracking Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-lg">Tracking Number:</span>
                    <span className="text-gray-900 font-bold text-lg">{order.transactionId.replace('TXN-', 'IZ999AA')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-lg">Estimated Delivery:</span>
                    <span className="text-gray-900 font-bold text-lg">May 27-29, 2023</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserOrder;