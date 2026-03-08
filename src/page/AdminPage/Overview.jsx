import React from 'react';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

const Overview = () => {
  const stats = [
    { label: 'Total Revenue', value: '$28,450', icon: <DollarSign />, color: 'border-pink-500' },
    { label: 'Orders', value: '312', icon: <ShoppingBag />, color: 'border-blue-500' },
    { label: 'Customers', value: '$28,450', icon: <Users />, color: 'border-green-500' },
    { label: 'Avg. Order Value', value: '$91.19', icon: <TrendingUp />, color: 'border-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 ${stat.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
                <h3 className="text-2xl font-black mt-2">{stat.value}</h3>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">ORD-12345</p>
                    <p className="text-xs text-gray-400">Sarah Johnson</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">+$1,999.00</p>
                  <span className="text-[10px] px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full font-bold uppercase">Processing</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
            View All
          </button>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <img src="https://via.placeholder.com/50" alt="product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Hydrating Essence</p>
                    <p className="text-xs text-gray-400">1250 units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">$1,999.00</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;