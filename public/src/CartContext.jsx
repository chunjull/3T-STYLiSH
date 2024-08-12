import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(() => {
    const savedCartQuantity = localStorage.getItem("cartQuantity");
    return savedCartQuantity ? parseInt(savedCartQuantity, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartQuantity", cartQuantity);
  }, [cartQuantity]);

  const updateCartQuantity = () => {
    const newQuantity = cartQuantity + amount;
    updateCartQuantity(newQuantity);
  };

  return (
    <CartContext.Provider
      value={{
        amount,
        setAmount,
        cartQuantity,
        setCartQuantity,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
