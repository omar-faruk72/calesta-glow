import React from 'react';
import { 
  DollarSign, Package, Users, CreditCard, ShoppingCart, 
  CheckCircle2, Clock, Truck 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

// স্ক্রিনশট অনুযায়ী ডাটা সেট
const salesOverviewData = [
  { name: 'January', value: 186 },
  { name: 'February', value: 305 },
  { name: 'March', value: 237 },
  { name: 'April', value: 73 },
  { name: 'May', value: 209 },
  { name: 'June', value: 214 },
];

const revenueTrendData = [
  { month: 'Jan', val: 186 }, { month: 'Feb', val: 305 },
  { month: 'Mar', val: 237 }, { month: 'Apr', val: 73 },
  { month: 'May', val: 209 }, { month: 'Jun', val: 214 },
];

const categoryData = [
  { name: 'Category 1', value: 275 }, { name: 'Category 2', value: 90 },
  { name: 'Category 3', value: 173 }, { name: 'Category 4', value: 187 },
  { name: 'Category 5', value: 200 },
];

const COLORS = ['#9D174D', '#F472B6', '#FBBF24', '#701A75', '#BE185D'];

// অনলাইন থেকে নেওয়া প্রোডাক্টের ডামি ওয়েবলিংক
const dummyProductImages = [
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200&auto=format&fit=crop", // Hydrating Essence
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop", // Brightening Serum
  "https://images.unsplash.com/photo-1631730486784-029911d99489?q=80&w=200&auto=format&fit=crop"  // Nourishing Cream
];

const Overview = () => {
  return (
    <div className="space-y-6 pb-10 font-sans bg-[#F9FAFB] p-6 rounded-3xl">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>

      {/* 1. Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$28,450', icon: <DollarSign size={18}/> },
          { label: 'Orders', value: '312', icon: <Package size={18}/> },
          { label: 'Customers', value: '$28,450', icon: <Users size={18}/> },
          { label: 'Avg. Order Value', value: '$91.19', icon: <CreditCard size={18}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span className="text-sm font-semibold tracking-tight">{stat.label}</span>
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">{stat.icon}</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-1 tracking-tight">Sales Overview</h3>
          <p className="text-xs text-gray-400 mb-6 font-medium">January - June 2024</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={salesOverviewData}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#9D174D" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-1 tracking-tight">Revenue Trend</h3>
          <p className="text-xs text-gray-400 mb-6 font-medium">January - June 2024</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#6B7280'}} />
                <Tooltip />
                <Line type="monotone" dataKey="val" stroke="#9D174D" strokeWidth={3} dot={{ r: 5, fill: '#9D174D', strokeWidth: 2, stroke: 'white' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-1 tracking-tight">Sales by Category</h3>
          <p className="text-xs text-gray-400 mb-6 font-medium">January - June 2024</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Orders List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 tracking-tight">Recent Orders</h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 max-h-[350px]">
            {[
              { id: 'ORD-12345', status: 'Processing', icon: <Clock size={16}/>, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { id: 'ORD-12346', status: 'Shipped', icon: <Truck size={16}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'ORD-12347', status: 'Processing', icon: <Clock size={16}/>, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { id: 'ORD-12348', status: 'Delivered', icon: <CheckCircle2 size={16}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { id: 'ORD-12349', status: 'Delivered', icon: <CheckCircle2 size={16}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${order.color} ${order.bg} shadow-inner`}>
                    {order.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 tracking-tight">{order.id}</p>
                    <p className="text-xs text-gray-400 font-semibold">Sarah Johnson</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 tracking-tight">+$1,999.00</p>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight ${order.bg} ${order.color}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
            View All Orders
          </button>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 tracking-tight">Top Performing Products</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <img 
                      src={dummyProductImages[i % 3]} // ওয়েবলিংক ব্যবহার করা হচ্ছে
                      alt="Product" 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 tracking-tight leading-tight">
                      {i % 2 === 0 ? 'Hydrating Essence Cream' : i % 3 === 0 ? 'Nourishing Face Cream' : 'Brightening Glow Serum'}
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">1250 units sold</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm font-bold text-gray-900 tracking-tight">$1,999.00</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Revenue</p>
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