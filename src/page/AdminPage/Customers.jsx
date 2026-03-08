import React, { useState, useEffect } from 'react';
import { 
  Search, Users, UserPlus, UserMinus, TrendingUp, 
  MoreHorizontal, ChevronLeft, ChevronRight, User 
} from 'lucide-react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ১. এপিআই থেকে ইউজার ডাটা লোড করা
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://calesta-beauty-server.vercel.app/api/auth/all-users');
      if (response.data?.success) {
        setCustomers(response.data.data);
        setFilteredCustomers(response.data.data);
      }
    } catch (error) {
      console.error("Customers fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ২. সার্চ, সর্ট এবং ক্যাটাগরি (Role) ফিল্টার লজিক
  useEffect(() => {
    let result = [...customers];

    // Search (Name or Email)
    if (searchTerm) {
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category/Role Filter
    if (roleFilter !== "All") {
      result = result.filter(user => user.role === roleFilter.toLowerCase());
    }

    // Sorting
    if (sortOrder === "Newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "Oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "Name: A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCustomers(result);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, sortOrder, customers]);

  // পেজিনেশন ক্যালকুলেশন
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Customers</h1>

      {/* ৩. স্ট্যাটিক স্ট্যাট কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '500', icon: <Users size={20}/> },
          { label: 'New Customers', value: '312', icon: <UserPlus size={20}/> },
          { label: 'Inactive', value: '312', icon: <UserMinus size={20}/> },
          { label: 'Avg Order Value', value: '$91,526', icon: <TrendingUp size={20}/> },
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

      {/* ৪. কন্ট্রোল এরিয়া (Search, Role, Sort) */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Search by name or email..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-pink-100 outline-none font-medium text-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Name: A-Z">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* ৫. কাস্টমার টেবিল */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5 text-center">Orders</th>
                <th className="px-6 py-5 text-right">Total Spent</th>
                <th className="px-6 py-5 text-center">Last Active</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="8" className="text-center py-20 text-gray-300 font-bold text-xs uppercase tracking-widest">Loading Customers...</td></tr>
              ) : currentCustomers.length > 0 ? (
                currentCustomers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-300 text-xs tracking-tighter">
                      #{user._id.slice(-5)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img src={user.profileImage} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <User size={20} />
                          </div>
                        )}
                        <span className="font-bold text-gray-800 text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-700 text-sm">
                      {/* ডামি ডাটা যেহেতু এপিআই-তে নেই */}
                      {Math.floor(Math.random() * 10) + 1}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">
                      ${(Math.random() * 5000 + 100).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-gray-400">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'Active'}
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
                <tr><td colSpan="8" className="text-center py-20 text-gray-400 font-bold uppercase text-xs">No Customers Found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ৬. ফাংশনাল পেজিনেশন */}
        <div className="px-6 py-5 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} results
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

export default Customers;