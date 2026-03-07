import React, { useState, useMemo, } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router'; 
import axiosSecure from '../hooks/axiosSecure';

const Products = () => {
    const useAxios = axiosSecure();
    const navigate = useNavigate(); 
        const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
    const limit = 16;
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await useAxios.get('/api/categories');
            return res.data.data;
        }
    });
    const { 
        data: allProducts = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await useAxios.get('/api/products'); 
            return res.data.data; 
        }
    });
    const filteredProducts = useMemo(() => {
        let result = selectedCategoryId 
            ? allProducts.filter(product => product.categoryID?._id === selectedCategoryId)
            : [...allProducts];
        if (sortBy === 'price-low') result.sort((a, b) => a.salePrice - b.salePrice);
        if (sortBy === 'price-high') result.sort((a, b) => b.salePrice - a.salePrice);
        if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return result;
    }, [allProducts, selectedCategoryId, sortBy]);
    const totalPages = Math.ceil(filteredProducts.length / limit);
    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return filteredProducts.slice(start, start + limit);
    }, [filteredProducts, currentPage]);
    const handleCategoryClick = (id) => {
        setSelectedCategoryId(id);
        setCurrentPage(1); 
    };

    if (isError) return <div className="text-center py-20 text-red-500">Something went wrong!</div>;

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="bg-[#F5E6D3] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-14 overflow-x-auto no-scrollbar">
                        <div className="flex items-center space-x-8">
                            <button 
                                onClick={() => handleCategoryClick(null)}
                                className={`text-sm whitespace-nowrap pb-1 transition-all ${!selectedCategoryId ? 'font-bold border-b-2 border-black' : 'font-medium text-gray-600 hover:text-black'}`}
                            >
                                All Product
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat._id} 
                                    onClick={() => handleCategoryClick(cat._id)}
                                    className={`text-sm whitespace-nowrap uppercase tracking-wider pb-1 transition-all ${selectedCategoryId === cat._id ? 'font-bold border-b-2 border-black text-black' : 'font-medium text-gray-600 hover:text-black'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                                                <div className="flex items-center space-x-2 ml-4">
                            <span className="text-sm text-gray-500 whitespace-nowrap">Sort :</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                className="text-sm font-medium bg-transparent focus:outline-none cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-gray-400" size={40} />
                        <p className="mt-4 text-gray-500">Loading premium products...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                            {currentProducts.map((product) => (
                                <div 
                                    key={product._id} 
                                    onClick={() => navigate(`/product/${product._id}`)} 
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-[#F3F3F3] rounded-sm mb-4">
                                        <img 
                                            src={product.thumbnail} 
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); }} // কার্ট লজিক এখানে হবে
                                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black px-4 py-2 text-sm font-medium flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm whitespace-nowrap"
                                        >
                                            <ShoppingCart size={16} />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-medium uppercase">{product.categoryID?.name}</p>
                                        <h3 className="text-base font-medium text-gray-900 leading-tight">{product.name}</h3>
                                        <p className="text-xl font-bold text-gray-900">${product.salePrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentProducts.length === 0 && (
                            <div className="text-center py-20 text-gray-400">No products found.</div>
                        )}
                    </>
                )}
                {!isLoading && totalPages > 1 && (
                    <div className="mt-20 flex justify-center items-center space-x-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 text-sm font-medium rounded-md transition-all ${currentPage === i + 1 ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-600 border'}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;