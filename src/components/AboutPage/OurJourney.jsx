import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OurJourney = () => {
    return (
        <section className="bg-white overflow-hidden py-10 md:py-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-stretch">
                
                {/* Right Side - Text Content */}
                <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-8 tracking-tight">
                            Our Journey
                        </h2>
                        
                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light">
                            <p>
                                Founded in 2018 by skincare enthusiast and biochemist Dr. Ji-Yoon Park, 
                                Seoul Mirage began as a small laboratory in the heart of Seoul's beauty district. 
                                Frustrated by the prevalence of products with harsh chemicals and unfulfilled 
                                promises, Dr. Park set out to create a line that combined traditional 
                                Korean ingredients with cutting-edge science.
                            </p>
                            <p>
                                What started as a passion project quickly gained recognition for its exceptional 
                                quality and remarkable results. Today, Seoul Mirage has grown into a global brand, 
                                but our commitment to purity, efficacy, and luxury remains unchanged.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-[500px] md:h-auto overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="w-full h-full"
                    >
                        <img 
                            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772703897/ed2c56b83973d0c43945a0d70326dac5a9c942e4_ko0gtn.jpg" 
                            alt="Our Journey - Skincare Model" 
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default OurJourney;