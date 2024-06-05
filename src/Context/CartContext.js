import  { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getUserID } from '../util/userData';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.product === item.product &&
        JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const updateQuantity = (productId, quantity, selectedOptions) => {
    const updatedCart = cart.map((item) =>
      item.product === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        ? { ...item, quantity }
        : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId, selectedOptions) => {
    const updatedCart = cart.filter(
      (item) =>
        item.product !== productId ||
        JSON.stringify(item.selectedOptions) !== JSON.stringify(selectedOptions)
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const submitCart = async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/order`, {
        user: userId,
        items: cart,
      });
      clearCart();
      return response.data;
    } catch (error) {
      console.error('Error submitting cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, submitCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
