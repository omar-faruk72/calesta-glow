import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosSecure from '../hooks/axiosSecure';

const Register = () => {
    const useAxios = axiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if (password !== confirmPassword) {
            setLoading(false);
            return toast.error("Passwords do not match!");
        }

        const userData = {
            name,
            email,
            password,
            role: 'user', 
            createdAt: new Date()
        };

        try {
            const res = await useAxios.post('/api/auth/register', userData);
            
            if (res.data.success) {
                toast.success("Account created successfully!");
                form.reset();
                navigate('/login'); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center px-4 py-12 font-sans">
            
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-2">Create your account</h1>
                <p className="text-lg text-gray-800">
                    Or <Link to="/login" className="font-bold hover:underline">sign in to your existing account</Link>
                </p>
            </div>

            <div className="bg-white w-full max-w-lg rounded-sm shadow-sm p-8 md:p-12">
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full name</label>
                        <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email address</label>
                        <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="email@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input 
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Confirm password</label>
                        <div className="relative">
                            <input 
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"} 
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                        <input 
                            type="checkbox" 
                            required
                            id="terms"
                            className="mt-1 w-4 h-4 border-gray-300 rounded text-black focus:ring-black cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                            I agree to the <span className="font-bold">Terms of Service</span> and <span className="font-bold">Privacy Policy</span>
                        </label>
                    </div>

                    {/* Submit Button with Loading State */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-md font-medium text-lg hover:bg-gray-900 transition-colors mt-4 flex items-center justify-center disabled:bg-gray-700"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}
                    </button>
                </form>
            </div>

            <div className="mt-8 text-center">
                <p className="text-lg text-gray-800">
                    Already have an account? <Link to="/login" className="font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;