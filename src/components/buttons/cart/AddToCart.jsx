import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useCart } from "./../../../hooks/useCart";
export default function AddToCart({ itemToCart, inProductDetailsName }) {
  const { addItem } = useCart();
  return (
    <button
      className="btn btn-primary add-to-card-btn"
      onClick={() => {
        const isAdded = addItem(itemToCart);
        if (isAdded) {
          toast.success("Item added to cart.");
        } else {
          toast.info("Item already in cart.");
        }
      }}
    >
      {!inProductDetailsName ? (
        <FontAwesomeIcon icon={faCartShopping} />
      ) : (
        "Add To Cart"
      )}
    </button>
  );
}
