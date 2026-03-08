import React from 'react';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import axiosSecure from '../../hooks/axiosSecure';

const CategoryGrid = () => {
    const useAxios = axiosSecure();
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['allProductsForCategories'],
        queryFn: async () => {
            const res = await useAxios.get('/api/products');
            return res.data.data;
        }
    });
    const uniqueCategories = Array.from(
        new Map(products.map(item => [item.categoryID?._id, item.categoryID])).values()
    ).filter(cat => cat != null); 
    const getCategoryImage = (categoryId) => {
        const product = products.find(p => p.categoryID?._id === categoryId);
        return product ? product.thumbnail : "";
    };

    if (isLoading) {
        return (
            <div className="h-60 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
            </div>
        );
    }

    return (
        <section className="py-16 bg-[#FDF8F8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
                        Shop by Category
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {uniqueCategories.map((category) => (
                        <Link 
                            key={category._id} 
                            className="group relative overflow-hidden rounded-sm block aspect-square bg-gray-200"
                        >
                      
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-full"
                            >
                                <img 
                                    src={getCategoryImage(category._id)} 
                                    alt={category.name} 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>

                            {/* Category Name */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl md:text-3xl font-medium tracking-wider drop-shadow-lg">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;