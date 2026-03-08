import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Package, AlertTriangle, Box, TrendingUp, MoreHorizontal, 
  ChevronLeft, ChevronRight, X, Upload, ImageIcon 
} from 'lucide-react';
import axios from 'axios';

const Products = () => {
  // --- States ---
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [filterCategory, setFilterCategory] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form & Image States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryID: '',
    regularPrice: '',
    salePrice: '',
    stock: '',
    description: '',
    vendor: '',
    tags: ''
  });

  // --- API: Fetch Products ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://calesta-beauty-server.vercel.app/api/products');
      if (response.data?.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // --- Search, Filter & Sort Logic ---
  useEffect(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryID?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory !== "All") {
      result = result.filter(p => p.categoryID?.name === filterCategory);
    }
    if (sortBy === "low") result.sort((a, b) => a.salePrice - b.salePrice);
    else if (sortBy === "high") result.sort((a, b) => b.salePrice - a.salePrice);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredProducts(result);
    setCurrentPage(1); 
  }, [searchTerm, sortBy, filterCategory, products]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Local preview
    }
  };

 const handleSaveProduct = async (e) => {
  e.preventDefault();
  
  // ১. FormData তৈরি করা (ফাইল পাঠানোর জন্য এটি মাস্ট)
  const data = new FormData();
  
  // ২. সব ফিল্ড অ্যাপেন্ড করা
  data.append('name', formData.name);
  data.append('categoryID', formData.categoryID);
  data.append('regularPrice', Number(formData.regularPrice)); // নাম্বার ফরম্যাটে পাঠানো ভালো
  data.append('salePrice', Number(formData.salePrice));
  data.append('stock', Number(formData.stock));
  data.append('description', formData.description);
  
  // ৩. যদি ইমেজ সিলেক্ট করা থাকে তবেই অ্যাড হবে
  if (selectedFile) {
    data.append('thumbnail', selectedFile); 
  }

  try {
    // ৪. এপিআই কল
    const response = await axios.post('https://calesta-beauty-server.vercel.app/api/create-product', data, {
      headers: { 
        'Content-Type': 'multipart/form-data' // ফাইল আপলোডের জন্য এটি জরুরি
      }
    });

    if (response.data.success) {
      alert("Product Created Successfully! ✅");
      
      // ৫. সাকসেস হলে ফর্ম এবং প্রিভিউ ক্লিয়ার করা
      setIsModalOpen(false);
      setFormData({
        name: '',
        categoryID: '',
        regularPrice: '',
        salePrice: '',
        stock: '',
        description: '',
        vendor: '',
        tags: ''
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // ৬. টেবিল রিফ্রেশ করা
      fetchProducts();
    }
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.message || "Failed to create product!"}`);
  }
};

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ["All", ...new Set(products.map(p => p.categoryID?.name).filter(Boolean))];

  return (
    <div className="space-y-6 pb-10">
      {/* Header & Stats */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-gray-800 transition-all"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Products', value: '500', icon: <Package size={20}/> },
          { label: 'Low Stock', value: '312', icon: <AlertTriangle size={20}/> },
          { label: 'Out of Stock', value: '1', icon: <Box size={20}/> },
          { label: 'Total Revenue', value: '$91,526', icon: <TrendingUp size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-gray-400 mb-3">
              <span className="text-sm font-semibold">{stat.label}</span>
              {stat.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Search product..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-pink-100 outline-none font-medium text-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none" onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none" onChange={(e) => setSortBy(e.target.value)}>
            <option value="all">All Status</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5">Thumbnails</th>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5 text-right">Price</th>
                <th className="px-6 py-5 text-center">Stock</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="8" className="text-center py-20 text-gray-300 font-bold text-xs">LOADING...</td></tr>
              ) : currentItems.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-300 text-xs">#{product._id.slice(-5)}</td>
                  <td className="px-6 py-4">
                    <img src={product.thumbnail} className="w-12 h-12 rounded-lg object-cover border border-gray-100" alt="" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 text-sm">{product.name}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">{product.categoryID?.name}</td>
                  <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">${product.salePrice}</td>
                  <td className="px-6 py-4 text-center font-bold text-gray-700 text-sm">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-wider ${
                      product.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {product.stock > 10 ? 'Active' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-5 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-400 uppercase">Page {currentPage} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={16}/></button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      {/* --- Add Product Modal (With Machine Upload) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 flex justify-between items-start border-b border-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                <p className="text-sm text-gray-400 mt-1">Create a new product in your catalog</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                <input type="text" name="name" required placeholder="Enter name" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-100" onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select name="categoryID" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" onChange={handleInputChange}>
                    <option value="">Select category</option>
                    <option value="69a52453316117b32e453a1c">Moisturizers</option>
                    <option value="69a52154316117b32e453a00">Serums</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                  <input type="number" name="stock" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input type="number" name="salePrice" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Cost Price ($)</label>
                  <input type="number" name="regularPrice" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" onChange={handleInputChange} />
                </div>
              </div>

              {/* Local File Upload Section */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail</label>
                <div 
                  onClick={() => document.getElementById('fileInput').click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-all cursor-pointer group relative h-48 overflow-hidden"
                >
                  {previewUrl ? (
                    <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Click to upload from local machine</p>
                    </>
                  )}
                  <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none resize-none" onChange={handleInputChange}></textarea>
              </div>

              <div className="flex gap-4 pt-4 pb-2">
                <button type="submit" className="flex-1 bg-black text-white py-4 rounded-full font-bold hover:opacity-90">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 border border-gray-200 text-gray-900 py-4 rounded-full font-bold hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;