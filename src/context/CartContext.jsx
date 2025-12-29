import React, { createContext, useState } from "react";
export const cartContext = createContext();
export default function CartProvider({ children }) {
  const cartItem = {
    name: " ramez",
    id: 1,
    price: 152,
  };
  return (
    <cartContext.Provider value={{ cartItem }}>{children}</cartContext.Provider>
  );
}
