import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OurStory = () => {
    return (
        <section className="bg-[#F5E6D3] overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                
                {/* Left Side - Text Content */}
                <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-8 tracking-tight">
                            Our <span className="font-bold">Story</span>
                        </h2>
                        
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light max-w-lg">
                            Seoul Mirage was born from a passion for Korean skincare innovation 
                            and a commitment to creating luxury products that deliver exceptional 
                            results.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 h-[400px] md:h-auto min-h-[500px]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="w-full h-full"
                    >
                        <img 
                            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772700465/9cbca66683f361cd55645b6e434daf901a06f875_o2encm.jpg" 
                            alt="Luxury Skincare Products" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default OurStory;