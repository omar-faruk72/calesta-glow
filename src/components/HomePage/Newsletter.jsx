import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            console.log("Subscribed with:", email);
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 5000);
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                
                {/* Header */}
                <div className="mb-10 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Join Our Community
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
                    </p>
                </div>

                {/* Form Section */}
                <div className="relative max-w-2xl mx-auto">
                    {!isSubscribed ? (
                        <motion.form 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubscribe}
                            className="flex flex-col md:flex-row items-center gap-4"
                        >
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address" 
                                className="w-full flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all text-gray-700"
                            />
                            <button 
                                type="submit"
                                className="w-full md:w-auto bg-[#E293AB] hover:bg-[#d47d97] text-white px-10 py-4 rounded-full font-semibold text-lg transition-colors shadow-md"
                            >
                                Subscribe
                            </button>
                        </motion.form>
                    ) : (
                        /* Success Message */
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center justify-center space-x-3"
                        >
                            <CheckCircle2 className="text-green-500 w-8 h-8" />
                            <div>
                                <h3 className="text-green-800 font-bold text-lg">Subscription Successful!</h3>
                                <p className="text-green-600">Thank you for joining our community.</p>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Newsletter;