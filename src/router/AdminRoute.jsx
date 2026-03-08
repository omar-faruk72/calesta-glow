// components/AdminRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="h-screen flex justify-center items-center"><Loader2 className="animate-spin" /></div>;
    }

    if (user && user.role === 'admin') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;