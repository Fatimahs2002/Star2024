import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => 
        item.id === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(product.selectedOptions)
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(product.selectedOptions)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, selectedOptions) => {
    setCart((prevCart) => 
      prevCart.filter((item) => 
        item.id !== productId || 
        JSON.stringify(item.selectedOptions) !== JSON.stringify(selectedOptions)
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedOptions) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
