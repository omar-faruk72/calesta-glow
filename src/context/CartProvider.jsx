import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('glowly_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('glowly_cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find(item => item._id === product._id);
      
      if (isExist) {
        toast.success("Updated quantity in cart!");
        return prevCart.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success("Added to cart!");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
    toast.error("Removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('glowly_cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;