import React from 'react';
import { Link } from 'react-router';
// ফেইল আইকনের জন্য Lucide এর X আইকন ব্যবহার করছি
import { X } from 'lucide-react';

const PaymentFail = () => {
    return (
        // আপনার দেওয়া ছবির মতো ব্যাকগ্রাউন্ড কালার #F1E5C9
        <div className="min-h-screen flex items-center justify-center bg-[#F1E5C9]">
            <div className="max-w-2xl w-full text-center px-6">
                
                {/* লালচে গোলাকার বক্সের ভেতরে X আইকন */}
                <div className="mb-12 flex justify-center">
                    <div className="bg-[#A63D2D] rounded-full p-6 inline-flex items-center justify-center">
                        <X className="w-16 h-16 text-white stroke-[4px]" />
                    </div>
                </div>
                
                {/* প্রধান এরর মেসেজ */}
                <h1 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6 leading-tight">
                    Oops! Your Payment Wasn't <span className="text-[#A63D2D]">Completed !</span>
                </h1>
                
                {/* সাব-টেক্সট */}
                <p className="text-xl md:text-2xl text-gray-700 mb-14 font-normal">
                    It looks like your transaction was canceled—please double-check your details and try again.
                </p>
                
                {/* Continue Shopping বাটন */}
                <div className="flex justify-center">
                    <Link to="/checkout" className="inline-flex items-center gap-2 bg-black text-white text-lg px-12 py-5 rounded-md font-medium hover:bg-gray-800 transition-all">
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

export default PaymentFail;