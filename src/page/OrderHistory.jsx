import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Loader2, PackageOpen } from 'lucide-react';
import { Link } from 'react-router';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/shipping/my-orders/${user.email}`);
        if (response.data.success) {
          setOrders(response.data.data);
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
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <PackageOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {orders.map((order) => (
        <div key={order._id} className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
          
          {/* Top Section: Order ID, Date & Status, Price */}
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Order ORD-{order.transactionId.slice(-5).toUpperCase()}
              </h3>
              <p className="text-base text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <div className="text-right space-y-1">
              <span className="text-xl md:text-2xl font-bold text-gray-900 block capitalize">
                {order.paymentStatus === 'paid' ? 'Delivered' : 'Pending'}
              </span>
              <p className="text-base font-medium text-gray-500">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Items Section: Exact Screenshot Layout */}
          <div className="space-y-4 mb-12">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm md:text-base">
                <p className="text-gray-700 font-medium">
                  {item.name} <span className="text-gray-400 ml-1">x {item.quantity}</span>
                </p>
                <p className="text-gray-900 font-semibold">${(item.salePrice * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <Link to={"/order-history"} className="w-full py-4 border border-gray-900 rounded-lg font-bold text-gray-900 hover:bg-gray-50 transition-all text-sm uppercase tracking-[0.2em]">
            View Order Details
          </Link>
          
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;