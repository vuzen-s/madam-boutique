import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});

  const setCartValues = (values) => {
    setCartData(values);
  };

  return (
    <CartContext.Provider value={{ cartData, setCartValues }}>
      {children}
    </CartContext.Provider>
  );
};
