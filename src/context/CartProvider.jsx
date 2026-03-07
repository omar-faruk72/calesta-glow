// src/context/CartProvider.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
  // Lazy initialization from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('glowly_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // LocalStorage-এ ডাটা সেভ করা
  useEffect(() => {
    localStorage.setItem('glowly_cart', JSON.stringify(cart));
  }, [cart]);

  // addToCart ফাংশনটি আগের মতোই থাকবে
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find(item => item._id === product._id);
      
      if (isExist) {
        toast.success("Updated quantity in cart!", { id: 'cart-toast' });
        return prevCart.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success("Added to cart!", { id: 'cart-toast' });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ১. কোয়ান্টিটি বাড়ানো
  const incrementQuantity = (id) => {
    setCart((prevCart) => 
      prevCart.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  // ২. কোয়ান্টিটি কমানো (১ এর নিচে যাবে না)
  const decrementQuantity = (id) => {
    setCart((prevCart) => 
      prevCart.map(item => {
        if (item._id === id) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      })
    );
  };

  // ৩. কার্ট থেকে একটি আইটেম রিমুভ করা
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== id));
    toast.error("Removed from cart", { id: 'remove-toast' });
  };

  // ৪. পুরো কার্ট ক্লিয়ার করা (Checkout-এর পর)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('glowly_cart');
  };

  // ভ্যালুগুলোতে সব নতুন ফাংশন যোগ করে দিন
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      incrementQuantity, 
      decrementQuantity, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;