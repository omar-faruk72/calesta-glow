import { Outlet, NavLink, Link } from "react-router";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const { user, handleLogout } = useContext(AuthContext);

  // আপনার router.jsx এর পাথের সাথে মিল রেখে লিঙ্কগুলো সেট করা হয়েছে
  const sidebarLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/dashboard/products', icon: <ShoppingBag size={20} /> },
    { name: 'Orders', path: '/dashboard/all-orders', icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/dashboard/users', icon: <Users size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans">
      
      {/* Sidebar - স্ক্রিনশট অনুযায়ী ডিজাইন */}
      <div className="w-72 bg-[#FCE7F3]/30 border-r border-pink-100 flex flex-col p-8 sticky top-0 h-screen">
        {/* Logo Section */}
        <div className="mb-12 flex justify-center">
          <Link to="/">
            <img 
              src="/src/assets/image/logo.png" 
              alt="Seoul Mirage" 
              className="h-24 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              // 'end' প্রোপার্টি নিশ্চিত করে যে /dashboard এ থাকলেই শুধু Overview একটিভ থাকবে
              end={link.path === '/dashboard'} 
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 rounded-xl text-[15px] font-bold transition-all duration-300
                ${isActive 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white hover:text-black'}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="h-24 bg-white border-b border-gray-100 px-10 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Dashboard</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-none">{user?.name || 'Admin'}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Admin Account</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-pink-100 overflow-hidden shadow-sm">
              <img 
                src={user?.image || user?.profileImage || "https://ui-avatars.com/api/?name=Admin"} 
                className="w-full h-full object-cover" 
                alt="admin" 
                onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=Admin"}}
              />
            </div>
          </div>
        </header>

        {/* Page Content - এখানে Overview বা অন্য পেজগুলো লোড হবে */}
        <main className="p-10 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;