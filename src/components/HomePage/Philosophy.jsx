import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Philosophy = () => {
    return (
        <section className="bg-[#F5E6D3] overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                
                {/* Left Side - Text Content */}
                <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                            Our Skincare Philosophy
                        </h2>
                        
                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                Seoul Mirage was born from a deep appreciation for Korean skincare innovation 
                                and the belief that effective products should be accessible to everyone.
                            </p>
                            <p>
                                We combine time-tested Korean ingredients with modern science to create 
                                formulations that deliver visible results. Each product is meticulously crafted to 
                                honor the tradition of the multi-step skincare ritual while fitting seamlessly into 
                                your daily routine.
                            </p>
                        </div>

                        <div className="pt-6">
                            <Link 
                                to="/about" 
                                className="inline-block bg-white text-gray-900 px-10 py-3 rounded-full font-medium hover:bg-gray-100 transition-all shadow-sm"
                            >
                                About Us
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="w-full h-full"
                    >
                        <img 
                            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772700465/9cbca66683f361cd55645b6e434daf901a06f875_o2encm.jpg" 
                            alt="Skincare Products" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Philosophy;