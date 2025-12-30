import React from "react";
import { useCart } from "./../../hooks/useCart.js";
import RemoveItemCart from "./../../components/buttons/cart/RemoveItemCart";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((element) => (
          <RemoveItemCart key={element?.id} removedItem={element} />
        ))
      ) : (
        <div className="alert alert-secondary text-center mt-5" role="alert">
          No items in the cart.
        </div>
      )}
    </div>
  );
}
