import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"; 
import axiosSecure from "../hooks/axiosSecure";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const useAxios = axiosSecure();

    const fetchLoggedUser = async () => {
        try {
            const res = await useAxios.get("/api/auth/logged-user");
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (error) {
            setUser(null);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoggedUser();
    }, []);

    const authInfo = { user, setUser, loading, fetchLoggedUser };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;