import { useContext } from "react";
import { cartContext } from "../context/CartContext.jsx";

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    console.error("useCart must be used within a CartProvider");
    return {};
  }
  return context;
};
