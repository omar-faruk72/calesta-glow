import React from 'react';
import { ShoppingBag, Star, ArrowRight, Loader2 } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../hooks/axiosSecure';

const Bestsellers = () => {
  const useAxios = axiosSecure();

  const { data: allProducts = [], isLoading, isError } = useQuery({
    queryKey: ['allBestsellers'],
    queryFn: async () => {
      const res = await useAxios.get('/api/products'); 
      return res.data.data; 
    }
  });
  const bestsellers = allProducts.filter(product => product.isBestseller === true);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }
  if (isError) {
    return <div className="text-center py-10 text-red-500">Something went wrong!</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Bestsellers</h2>
          <Link to="/product" className="group flex items-center text-gray-900 font-medium  pb-1 hover:text-pink-600 transition-all">
            View all products 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm mb-6">
                <img 
                  src={product.thumbnail} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-bold shadow-xl flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm uppercase tracking-wider">{product.categoryID?.name}</p>
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-3">
                    <p className="text-2xl font-bold text-gray-900">${product.salePrice}</p>
                    {product.regularPrice > product.salePrice && (
                        <p className="text-lg text-gray-400 line-through">${product.regularPrice}</p>
                    )}
                </div>
                
                <div className="flex items-center space-x-1 pt-1">
                  <span className="text-sm font-bold text-gray-900">4.9</span>
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="text-gray-400 text-sm ml-1">(86)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;