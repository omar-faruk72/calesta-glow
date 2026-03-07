import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Minus, Plus, Star } from "lucide-react";
import axios from "axios"; 
import axiosSecure from "../hooks/axiosSecure";
import BestSeller from "../components/ProductPage/BestSeller";
import HandPicked from "../components/ProductPage/HandPicked";
import Newsletter from "../components/HomePage/Newsletter";

const ProductDetails = () => {
  const { id } = useParams();
  const useAxios = axiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await useAxios.get(`/api/product/${id}`);
      return res.data.data;
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5001/api/reviews/get-reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-gray-400" size={48} />
        <p className="mt-4 text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (isError) return <div className="text-center py-20 text-red-500">Failed to load product.</div>;

  const mainImage = selectedImage || product?.thumbnail;

  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ইমেজ সেকশন */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            <div className="flex-1 bg-[#F3F3F3] aspect-square overflow-hidden relative group">
              <img
                src={mainImage}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
            <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar">
              {[product?.thumbnail, ...(product?.images || [])].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 bg-gray-100 cursor-pointer border-2 transition-all overflow-hidden flex-shrink-0 ${selectedImage === img || (!selectedImage && idx === 0) ? "border-black" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900">{product?.name}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium underline cursor-pointer">
                  {reviews.length} Reviews
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-bold">${product?.salePrice}</span>
                {product?.regularPrice > product?.salePrice && (
                  <span className="text-2xl text-gray-400 line-through">${product?.regularPrice}</span>
                )}
              </div>
              <p className="text-green-600 font-medium text-sm flex items-center">
                <span className="mr-1">🏷️</span> Save 50% right now
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-lg uppercase tracking-tight mb-2">Details</h3>
              <p className="text-gray-600 leading-relaxed italic">
                {product?.description || "Figma ipsum component variant main layer. Opacity draft."}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold uppercase text-sm tracking-widest">Straight Up:</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{product?.straight_up || "N/A"}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold uppercase text-sm tracking-widest">The Lowdown:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {product?.lowdown?.map((item, i) => (
                  <li key={i}>{item}</li>
                )) || <li>Loading info...</li>}
              </ul>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 transition-colors">
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <button className="flex-1 bg-black text-white py-4 px-8 font-bold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all uppercase tracking-widest text-sm">
                <span>Add to Cart</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <HandPicked />

      {/* --- Ratings and Reviews Section --- */}
      <div className="bg-[#fdf0e5] py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold text-gray-900">Ratings and Reviews</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                   <div className="flex text-black">
                     {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                   </div>
                   <span className="text-lg font-medium">{reviews.length} Reviews</span>
                </div>
                <button className="mt-4 px-10 py-3 bg-white border border-gray-200 rounded-full text-pink-500 font-bold hover:shadow-md transition-all">
                  Write a Review
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-10">
              {reviewsLoading ? (
                <Loader2 className="animate-spin" />
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-300 pb-10 last:border-0">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={review.userID?.profileImage} 
                        className="w-12 h-12 rounded-full object-cover" 
                        alt="" 
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex text-black">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < review.rating ? "currentColor" : "none"} 
                              className={i < review.rating ? "text-black" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed italic">
                          "{review.comment}"
                        </p>
                        <div>
                          <h4 className="font-bold text-gray-900">{review.userID?.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic text-center py-10">No reviews found for this product.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <BestSeller />
      <Newsletter />
    </div>
  );
};

export default ProductDetails;