import React from "react";
import { toast } from "react-toastify";
import { useCart } from "./../../../hooks/useCart.js";

export default function RemoveItemCart({ removedItem }) {
  const { removeItem } = useCart();
  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        const isRemoved = removeItem(removedItem);
        if (isRemoved) {
          toast.success("Item is removed from cart.");
        } else {
          toast.error("Cart is empty.");
        }
      }}
    >
      delete
    </button>
  );
}
