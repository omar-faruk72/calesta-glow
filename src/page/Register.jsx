import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Camera, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosSecure from '../hooks/axiosSecure';

const Register = () => {
    const useAxios = axiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const imageFile = form.image.files[0];
        if (!imageFile) {
            return toast.error("Please upload a profile picture to continue!", {
                icon: '📸',
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }
        if (password.length < 6) {
            return toast.error("Password should be at least 6 characters long.");
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", imageFile); 

        try {
            const res = await useAxios.post('/api/auth/register', formData);
            if (res.data.success) {
                toast.success("Account created successfully!");
                form.reset();
                setImagePreview(null);
                navigate('/login'); 
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Registration failed. Try again.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center px-4 py-16 font-sans">
            
            <div className="text-center mb-8">
                <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <UserPlus size={32} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Create Account</h1>
                <p className="text-lg text-gray-600 italic">
                    Join Glowly and start your skincare journey.
                </p>
            </div>

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center justify-center space-y-4 pb-2">
                        <div className="relative group">
                            <div className="w-28 h-28 border-4 border-pink-100 rounded-full flex items-center justify-center overflow-hidden bg-gray-50 shadow-inner transition-all group-hover:border-pink-200">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="text-gray-300" size={35} />
                                )}
                            </div>
                            <label className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md">
                                <Camera size={16} />
                                <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Profile Picture</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Full name</label>
                            <input 
                                name="name"
                                type="text" 
                                required
                                placeholder="Omar Faruk"
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50/50"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email address</label>
                            <input 
                                name="email"
                                type="email" 
                                required
                                placeholder="omar@example.com"
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50/50"
                            />
                        </div>

                        {/* Passwords - Two in a row on Desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Password</label>
                                <div className="relative">
                                    <input 
                                        name="password"
                                        type={showPassword ? "text" : "password"} 
                                        required
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50/50"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Confirm</label>
                                <div className="relative">
                                    <input 
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"} 
                                        required
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50/50"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all mt-4 flex items-center justify-center disabled:bg-gray-700 shadow-lg active:scale-[0.98]"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-600">
                        Already have an account? <Link to="/login" className="font-bold text-black hover:underline underline-offset-4">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;