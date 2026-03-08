import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Menu, X } from "lucide-react"; // Menu, X যোগ করা হয়েছে
import { useContext, useState } from "react"; // useState যোগ করা হয়েছে
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AdminLayout = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইল সাইডবার স্টেট

  const onLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/logout', {}, {
        withCredentials: true 
      });

      if (response.data.success) {
        setUser(null);
        localStorage.removeItem('user');
        alert("Logged out successfully! ✅");
        navigate('/login'); 
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to logout.");
    }
  };

  const sidebarLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/dashboard/products', icon: <ShoppingBag size={20} /> },
    { name: 'Orders', path: '/dashboard/all-orders', icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/dashboard/users', icon: <Users size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="mb-12 flex justify-center">
        <Link to="/" onClick={() => setIsSidebarOpen(false)}>
          <img src="/src/assets/image/logo.png" alt="Logo" className="h-40 w-40 object-contain" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/dashboard'} 
            onClick={() => setIsSidebarOpen(false)} // ক্লিক করলে মোবাইল মেনু বন্ধ হবে
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

      <button 
        onClick={onLogout}
        className="mt-auto flex items-center gap-4 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
      >
        <LogOut size={20} />
        Logout
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans">
      
      {/* --- Desktop Sidebar (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-72 bg-[#FCE7F3]/30 border-r border-pink-100 flex-col p-8 sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'bg-black/50 opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />

      {/* --- Mobile Sidebar (Drawer) --- */}
      <div className={`fixed inset-y-0 left-0 z-[101] w-72 bg-white p-8 transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X size={24} />
        </button>
        <SidebarContent />
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 lg:h-24 bg-white border-b border-gray-100 px-6 lg:px-10 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} className="text-gray-600" />
            </button>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 tracking-tight">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-none">{user?.name || 'Admin'}</p>
              <p className="text-[10px] lg:text-[11px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Admin Account</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-pink-100 overflow-hidden shadow-sm flex-shrink-0">
              <img 
                src={user?.profileImage || user?.image || "https://ui-avatars.com/api/?name=Admin"} 
                className="w-full h-full object-cover" 
                alt="admin" 
                onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=Admin"}}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-10 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;