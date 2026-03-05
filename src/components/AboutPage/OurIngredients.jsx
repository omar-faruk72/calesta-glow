import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OurIngredients = () => {
    const ingredients = [
        {
            title: "Botanical Extracts",
            description: "From ginseng to green tea, our products harness the power of traditional Korean botanicals known for their skin-enhancing properties.",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772704672/48cf6e82328644c999bd4095fbbb3da01f104248_pytrxm.jpg" 
        },
        {
            title: "Fermented Ingredients",
            description: "We utilize the ancient Korean practice of fermentation to enhance the potency and bioavailability of our active ingredients.",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772704669/bb10c778e773636d17f2ca5e3bcf3b3a545e9b8e_nw7i6z.jpg"
        },
        {
            title: "Scientific Compounds",
            description: "Our formulations incorporate cutting-edge compounds like peptides, antioxidants, and hyaluronic acid for maximum efficacy.",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772704672/7f907e276e9aaa417453ef30c7142ff58323c87b_eghrmq.jpg"
        }
    ];

    return (
        <section className="py-20 bg-[#F5E6D3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
                
                {/* Header Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-medium text-gray-800">Our Ingredients</h2>
                    <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-light">
                        We believe in the power of nature enhanced by science. Our formulations combine time-honored Korean botanical ingredients with advanced scientific compounds to create products that deliver visible results.
                    </p>
                </motion.div>

                {/* Ingredients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group h-[400px] overflow-hidden rounded-sm cursor-pointer"
                        >
                            {/* Background Image with Overlay */}
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

                            {/* Text Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center text-white">
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-sm md:text-base font-light leading-relaxed opacity-90">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurIngredients;