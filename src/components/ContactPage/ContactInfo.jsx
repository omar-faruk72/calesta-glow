import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ContactInfo = () => {
    const contactDetails = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            value: "seoulmirage@gmail.com",
            link: "mailto:seoulmirage@gmail.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            value: "+82 2 123 4567",
            link: "tel:+8221234567"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Address",
            value: "123 Beauty Lane, Gangnam, Seoul, South Korea",
            link: "https://maps.google.com"
        }
    ];

    return (
        <section className="bg-[#F5E6D3] py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Section Title */}
                <motion.h2 
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-medium text-gray-900 mb-16"
                >
                    Other Ways to Reach Us
                </motion.h2>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {contactDetails.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-4"
                        >
                            {/* Icon Wrapper */}
                            <div className="text-gray-900 mt-1">
                                {item.icon}
                            </div>

                            {/* Text Wrapper */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-medium text-gray-900">
                                    {item.title}
                                </h3>
                                <a 
                                    href={item.link} 
                                    target={item.title === "Address" ? "_blank" : "_self"}
                                    rel="noreferrer"
                                    className="text-gray-700 hover:text-black transition-colors block text-lg font-light break-words md:max-w-[250px]"
                                >
                                    {item.value}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ContactInfo;