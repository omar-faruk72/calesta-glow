import React, { useContext } from 'react';import { useQuery } from "@tanstack/react-query";
import { Loader2, Star, MoveRight } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import { CartContext } from '../../context/CartContext'; 
const BestSeller = () => {
    const { addToCart } = useContext(CartContext); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/api/products");
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load best sellers.
      </div>
    );
  const bestSellers = data
    ?.filter((product) => product.isBestseller === true)
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">Best Seller</h2>
        <Link
          to="/product"
          className="flex items-center text-gray-600 hover:text-black transition-colors font-medium"
        >
          View all products <MoveRight className="ml-2" size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellers?.map((product) => (
          <div key={product._id} className="group cursor-pointer">
            <div className="relative aspect-square bg-[#F3F3F3] overflow-hidden mb-4">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <button 
                    onClick={() => addToCart(product)} 
                className="bg-white text-black px-6 py-2 shadow-sm font-bold flex items-center gap-2 text-sm uppercase">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {product.categoryID?.name || "Serums"}
              </p>
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-2xl font-bold">${product.salePrice}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={14} fill="black" stroke="black" />
                <span className="text-xs font-bold">4.9</span>
                <span className="text-xs text-gray-400">(86)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
