import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userID, setUserID] = useState(null);
  const [cartID, setCartID] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedCartID = localStorage.getItem('cartID');
    if (storedCartID) {
      setCartID(storedCartID);
    } else {
      const newCartID = generateNewCartID();
      localStorage.setItem('cartID', newCartID);
      setCartID(newCartID);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const generateNewCartID = () => uuidv4(); // Generate unique cart ID

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
      item._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        ? { ...item, quantity }
        : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId, selectedOptions) => {
    const updatedCart = cart.filter(
      (item) =>
        item._id !== productId ||
        JSON.stringify(item.selectedOptions) !== JSON.stringify(selectedOptions)
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartID');
  };

  const submitCart = async (userId, cartId) => {
    console.log(userId, "user");
    console.log(cartId, "cart");
  
    try {
      const orderData = {
        user: userId,
        cartId, // Ensure it matches the server's expected field name
        products: cart.map((item) => ({
          productId: item._id.toString(),
          quantity: item.quantity,
          selectedOptions: item.selectedOptions,
        })),
        orderStatus: 'Pending',
        orderDate: new Date(),
      };
  
      console.log('Submitting order:', orderData);
  
      const response = await axios.post(`${process.env.REACT_APP_URL}/order/create`, orderData);
  
      if (response && response.status === 200 && response.data && response.data.success) {
        clearCart();
        console.log('Order submitted successfully:', response.data);
        return response.data;
      } else {
        console.error('Unexpected response:', response);
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error submitting cart:', error);
      throw error;
    }
  };
  
  

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, submitCart, userID, cartID }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
