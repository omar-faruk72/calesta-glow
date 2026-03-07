// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { Link } from "react-router";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  // কার্ট কন্টেক্সট থেকে প্রয়োজনীয় সব ফাংশন এবং ডাটা নিন
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useContext(CartContext);

  // ১. সাবটোটাল ক্যালকুলেট করুন
  const subtotal = cart.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0,
  );

  // ২. শিপিং চার্জ (ফিক্সড)
  const shippingCharge = 5.99;

  // ৩. গ্র্যান্ড টোটাল
  const grandTotal = subtotal + shippingCharge;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Shopping Cart
        </h1>

        {/* যদি কার্ট খালি থাকে */}
        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-lg shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Your cart is empty
            </h2>
            <Link
              to="/"
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-all flex items-center justify-center w-60 mx-auto"
            >
              Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Side: Product List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-lg shadow-sm border flex items-center gap-6"
                >
                  {/* Product Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>

                    {/* Quantity Controls ... (Plus/Minus/Input box) */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:border-pink-300 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="w-12 h-8 border rounded flex items-center justify-center text-sm font-semibold">
                        {item.quantity}
                      </div>

                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:border-pink-300 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove Button */}
                  <div className="text-right space-y-4">
                    <p className="text-xl font-bold text-gray-900">
                      ${(item.salePrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Button */}
              <Link
                to="/product"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-pink-50 transition-all border shadow-sm"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Right Side: Order Summary */}
            <div className="bg-[#FAF0E6] p-8 rounded-lg shadow-sm border border-[#E9DFD2]">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-[#E9DFD2] pb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                  <p>Subtotal</p>
                  <p className="font-semibold">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <p>Shipping</p>
                  <p className="font-semibold">${shippingCharge.toFixed(2)}</p>
                </div>

                <div className="border-t border-[#E9DFD2] pt-4 flex justify-between items-center text-gray-900 font-bold text-lg">
                  <p>Total</p>
                  <p className="text-2xl">${grandTotal.toFixed(2)}</p>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-3 mt-8">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="flex-1 h-12 px-4 rounded-md border border-[#E9DFD2] bg-white text-sm"
                />
                <button className="h-12 bg-white text-gray-900 px-6 py-2 rounded-md font-bold transition-all border shadow-sm">
                  Apply
                </button>
              </div>

              {/* Proceed to Checkout Button */}
              <button className="w-full mt-6 bg-black text-white px-6 py-4 rounded-md font-bold transition-all flex items-center justify-center gap-2 hover:bg-black/90 active:scale-95">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
