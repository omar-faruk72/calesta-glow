// layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router";
import { LayoutDashboard, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white p-6 space-y-8">
                <h2 className="text-2xl font-bold text-pink-500">Admin Panel</h2>
                <nav className="space-y-4">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 hover:text-pink-400 transition-all">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/all-orders" className="flex items-center gap-3 hover:text-pink-400 transition-all">
                        <ShoppingCart size={20} /> All Orders
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 hover:text-pink-400 transition-all">
                        <Users size={20} /> All Users
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;