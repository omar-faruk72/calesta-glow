import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How long does shipping take?",
            answer: "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders. You will receive a tracking number once your order is dispatched."
        },
        {
            question: "Are your products suitable for sensitive skin?",
            answer: "Yes, our products are formulated with gentle, natural ingredients and are dermatologically tested to be safe for sensitive skin types. However, we recommend doing a patch test first."
        },
        {
            question: "Do you offer international shipping?",
            answer: "We currently ship to over 20 countries worldwide. Shipping costs and delivery times vary depending on the destination country."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day money-back guarantee if you are not satisfied with your purchase. Products must be returned in their original packaging."
        },
        {
            question: "Are your products cruelty-free?",
            answer: "Absolutely! We are committed to ethical beauty. None of our products or ingredients are tested on animals."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                
                {/* Left Side - Image */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img 
                            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772706633/9c90fed2e976f83995e73ea68929303e7a5b15b4_rrkeat.jpg" 
                            alt="Luxury Skincare Display" 
                            className="w-full h-auto rounded-sm shadow-sm"
                        />
                    </motion.div>
                </div>

                {/* Right Side - Accordion Content */}
                <div className="w-full md:w-1/2">
                    <div className="mb-10">
                        <h2 className="text-4xl font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 font-light">
                            Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact us.
                        </p>
                    </div>

                    <div className="divide-y divide-gray-300 border-t border-gray-300">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-4">
                                <button 
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
                                >
                                    <span className={`text-lg transition-colors duration-300 ${activeIndex === index ? 'font-bold text-black' : 'font-medium text-gray-800'}`}>
                                        {faq.question}
                                    </span>
                                    {activeIndex === index ? (
                                        <ChevronUp size={20} className="text-black" />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400 group-hover:text-black" />
                                    )}
                                </button>
                                
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="py-4 text-gray-600 font-light leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ;