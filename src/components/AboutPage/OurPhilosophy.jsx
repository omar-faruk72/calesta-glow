import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OurPhilosophy = () => {
    const philosophies = [
        {
            title: "Purity",
            description: "We source the highest quality ingredients and maintain rigorous standards to ensure our products are free from harmful chemicals."
        },
        {
            title: "Innovation",
            description: "We continuously research and develop new formulations that harness the power of both traditional Korean ingredients and modern scientific breakthroughs."
        },
        {
            title: "Sustainability",
            description: "We are committed to ethical practices, from responsible sourcing to eco-friendly packaging, ensuring our beauty doesn't come at the expense of our planet."
        }
    ];

    return (
        <section className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
                
                {/* Left Side - Content */}
                <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-8">
                            Our Philosophy
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed mb-12 text-lg font-light">
                            Founded in 2018 by skincare enthusiast and biochemist Dr. Ji-Yoon Park, 
                            Seoul Mirage began as a small laboratory in the heart of Seoul's beauty district. 
                            Frustrated by the prevalence of products with harsh chemicals and unfulfilled promises.
                        </p>

                        {/* Philosophy Points */}
                        <div className="space-y-10">
                            {philosophies.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="border-l-2 border-black pl-6"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 min-h-[600px] md:h-auto">
                    <img 
                        src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772704180/5dd8d6bf3d13a6a7a7a10a3e3ef947d90bd718fb_ijffti.jpg" 
                        alt="Our Philosophy Skincare" 
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default OurPhilosophy;