import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Loader2, Star, MoveRight } from "lucide-react";
import axios from "axios";

const HandPicked = () => {
  const navigate = useNavigate();
  const {
    data: allProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/api/products");
      return res.data.data;
    },
  });
  const serumProducts = allProducts
    .filter((product) => product.categoryID?.name === "Serums")
    .slice(0, 4);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-gray-300" size={40} />
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-10 text-red-400">
        Error loading products.
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Hand picked for you
        </h2>
        <button
          onClick={() => navigate("/product")}
          className="flex items-center text-gray-600 hover:text-black transition-all font-medium text-sm md:text-base group"
        >
          View all products
          <MoveRight
            className="ml-2 group-hover:translate-x-1 transition-transform"
            size={20}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {serumProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square bg-[#F3F3F3] overflow-hidden rounded-sm mb-4">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <button className="bg-white/90 backdrop-blur-sm text-black px-6 py-2.5 shadow-sm font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                  Quick View
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] text-gray-400 uppercase tracking-wider font-medium">
                {product.categoryID?.name}
              </p>
              <h3 className="text-base font-semibold text-gray-800 decoration-1 underline-offset-4">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                ${product.salePrice}
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[13px] font-bold text-gray-800">4.9</span>
                <Star size={12} fill="black" stroke="black" />
                <span className="text-[13px] text-gray-400 font-medium">
                  (86)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HandPicked;
