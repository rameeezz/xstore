import React from "react";
import { toast } from "react-toastify";
import { useCart } from "./../../../hooks/useCart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function RemoveItemCart({ removedItem }) {
  const { removeItem } = useCart();
  return (
    <button
      className="btn"
      onClick={(e) => {
        e.stopPropagation();
        const isRemoved = removeItem(removedItem);
        if (isRemoved) {
          toast.success("Item is removed from cart.");
        } else {
          toast.error("Cart is empty.");
        }
      }}
    >
      <FontAwesomeIcon
        icon={faTrash}
        className="delete-icon"
        style={{ color: "white", stroke: "black", strokeWidth: "25" }}
      />
    </button>
  );
}
