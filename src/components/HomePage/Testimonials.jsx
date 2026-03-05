import React from 'react';
import { Star } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    
    const reviews = [
        {
            id: 1,
            name: "Devon Lane",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772701273/5339b573abd28080a2df783262f824706fd0c9c0_vogdnr.jpg",
            text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
            rating: 5
        },
        {
            id: 2,
            name: "Jane Cooper",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772701279/303615638e094f1584d930db5f3aba99441332fb_fnzpnh.jpg",
            text: "The product quality is amazing. It has completely changed my skincare routine. Highly recommended for sensitive skin!",
            rating: 5
        },
        {
            id: 3,
            name: "Esther Howard",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772701273/5339b573abd28080a2df783262f824706fd0c9c0_vogdnr.jpg",
            text: "I was skeptical at first, but after using these products for a month, my skin feels so hydrated and glowing.",
            rating: 5
        },
        {
            id: 4,
            name: "Cameron Williamson",
            image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772701279/303615638e094f1584d930db5f3aba99441332fb_fnzpnh.jpg",
            text: "Excellent customer service and fast delivery. The packaging was very premium. Will definitely buy again!",
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
                
                {/* Header */}
                <div className="mb-16 space-y-2">
                    <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">3940+ Happy Users</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#C49A84]">Don't just take our words</h2>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 }, 
                    }}
                    className="testimonial-swiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} className="pb-16"> 
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-6 text-left p-4"
                            >
                                {/* User Image */}
                                <div className="w-40 h-48 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                                    <img 
                                        src={review.image} 
                                        alt={review.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Review Content */}
                                <div className="space-y-4">
                                    <div className="flex space-x-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-pink-300 text-pink-300" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed italic">
                                        "{review.text}"
                                    </p>
                                    <h4 className="text-xl font-semibold text-gray-900">{review.name}</h4>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #F472B6 !important; /* pink-400 */
                    width: 24px;
                    border-radius: 6px;
                }
                .testimonial-swiper .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                }
            ` }} />
        </section>
    );
};

export default Testimonials;