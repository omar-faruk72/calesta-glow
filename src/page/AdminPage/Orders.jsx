import React, { useState, useEffect } from 'react';
import { 
  Search, Package, Clock, AlertCircle, TrendingUp, 
  MoreHorizontal, ChevronLeft, ChevronRight 
} from 'lucide-react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ১. এপিআই থেকে ডাটা লোড করা
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/shipping/all');
      if (response.data?.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      }
    } catch (error) {
      console.error("Orders fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ২. সার্চ, সর্ট এবং ফিল্টার লজিক
  useEffect(() => {
    let result = [...orders];

    // Search (Customer Name or Email)
    if (searchTerm) {
      result = result.filter(order => 
        `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== "All Status") {
      result = result.filter(order => order.orderStatus === statusFilter);
    }

    // Sorting
    if (sortOrder === "Newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "Oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "Price: High to Low") {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    }

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortOrder, orders]);

  // পেজিনেশন ক্যালকুলেশন
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Orders</h1>

      {/* ৩. স্ট্যাটিক স্ট্যাট কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Order', value: '500', icon: <Package size={20}/> },
          { label: 'Processing', value: '312', icon: <Clock size={20}/> },
          { label: 'Pending Payments', value: '312', icon: <AlertCircle size={20}/> },
          { label: 'Revenue', value: '$91,526', icon: <TrendingUp size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-gray-400 mb-3">
              <span className="text-sm font-semibold">{stat.label}</span>
              {stat.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* ৪. কন্ট্রোল এরিয়া (Search, Sort, Filter) */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Search by name, email or TXN ID..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-pink-100 outline-none font-medium text-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>

          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ৫. অর্ডার টেবিল */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5 text-center">Date</th>
                <th className="px-6 py-5 text-center">Items</th>
                <th className="px-6 py-5 text-right">Total</th>
                <th className="px-6 py-5 text-center">Payment</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="9" className="text-center py-20 text-gray-300 font-bold text-xs uppercase tracking-widest">Loading Orders...</td></tr>
              ) : currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-300 text-xs tracking-tighter">
                      #{order.transactionId.slice(-8)}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                      {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-500">{order.customerInfo.email}</td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-black text-gray-500">
                        {order.items.length} PCS
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-500'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-wider ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.orderStatus === 'Processing' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-300 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="9" className="text-center py-20 text-gray-400 font-bold uppercase text-xs">No Orders Found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ৬. ফাংশনাল পেজিনেশন */}
        <div className="px-6 py-5 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} results
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 border border-gray-100 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft size={16}/>
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentPage === i + 1 ? 'bg-pink-50 text-pink-600 border border-pink-100' : 'text-gray-400 border border-transparent hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 border border-gray-100 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;