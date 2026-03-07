import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
// Lucide react আইকন ব্যবহার করছি যা দেখতে ঠিক ইমেজের আইকনের মতো
import { Check } from 'lucide-react'; 
import { CartContext } from '../context/CartContext';

const PaymentSuccess = () => {
    const { tranId } = useParams();
    const { clearCart } = useContext(CartContext); // কার্ট খালি করার ফাংশন

    useEffect(() => {
        // পেজ লোড হলেই কার্ট খালি করে দিন
        if (clearCart) {
            clearCart();
        }
    }, [clearCart]);

    return (
        // ইমেজের মতো ব্যাকগ্রাউন্ড কালার এবং মাঝখানে সেন্টারিং
        <div className="min-h-screen flex items-center justify-center bg-[#F1E5C9]">
            <div className="max-w-xl w-full text-center px-6">
                
                {/* সবুজ গোলাকার চেকমার্ক আইকন */}
                <div className="mb-12 flex justify-center">
                    <div className="bg-[#499E5C] rounded-full p-6 inline-flex items-center justify-center">
                        <Check className="w-16 h-16 text-white stroke-[4px]" />
                    </div>
                </div>
                
                {/* প্রধান হেডিং */}
                <h1 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6 leading-tight">
                    Your payment has been <span className="text-[#499E5C]">received!</span>
                </h1>
                
                {/* সাব-টেক্সট */}
                <p className="text-xl md:text-2xl text-gray-700 mb-14 font-normal">
                    Please check your email for a payment confirmation & invoice.
                </p>
                
                {/* ট্রানজিশন আইডি (ইচ্ছামূলক, চাইলে হাইড করতে পারেন) */}
                {tranId && (
                    <div className="mb-14 text-sm font-mono text-gray-500 bg-white/50 inline-block px-4 py-1.5 rounded-full">
                        TXN: {tranId}
                    </div>
                )}
                
                {/* Continue Shopping বাটন */}
                <div className="flex justify-center">
                    <Link to="/product" className="inline-flex items-center gap-2 bg-black text-white text-lg px-12 py-5 rounded-md font-medium hover:bg-gray-800 transition-all">
                        Continue Shopping 
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                
            </div>
        </div>
    );
};

export default PaymentSuccess;