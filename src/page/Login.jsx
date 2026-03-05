import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosSecure from '../hooks/axiosSecure';

const Login = () => {
    const useAxios = axiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const loginData = { email, password };

        try {
            const res = await useAxios.post('/api/auth/login', loginData);
            
            if (res.data.success) {
                toast.success("Login Successful!");
                localStorage.setItem('token', res.data.token);
                navigate('/'); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center px-4 py-12 font-sans">
            
            {/* Header Text */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-4">Sign in to your account</h1>
                <p className="text-xl text-gray-800">
                    Or <Link to="/register" className="font-bold hover:underline">create a new account</Link>
                </p>
            </div>

            {/* Login Card */}
            <div className="bg-white w-full max-w-lg rounded-sm shadow-sm p-10 md:p-14">
                <form onSubmit={handleLogin} className="space-y-8">
                    
                    {/* Email Field */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Email address</label>
                        <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-4 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input 
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-4 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Options: Show Password & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            <input 
                                type="checkbox" 
                                checked={showPassword}
                                onChange={() => {}}
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                            />
                            <span className="text-gray-800 font-medium">Show passwords</span>
                        </div>
                        <Link to="/forgot-password" weight="bold" className="font-bold text-gray-900 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Submit Button (Sign Up label from screenshot) */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-md font-medium text-xl hover:bg-gray-900 transition-colors flex items-center justify-center disabled:bg-gray-800"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign Up"}
                    </button>
                </form>
            </div>

            {/* Terms of Service Footer */}
            <div className="mt-12 text-center text-lg md:text-xl text-gray-900">
                By signing in, you agree to our <span className="font-bold">Terms of Service</span> and <span className="font-bold">Privacy Policy.</span>
            </div>
        </div>
    );
};

export default Login;