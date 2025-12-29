import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./../../../hooks/useCart";
export default function AddToCart() {
  const { cartItem } = useCart();
  function showAlert() {
    console.log(cartItem);
    
  }
  return (
    <>
      <button className="btn btn-primary" onClick={showAlert}>
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </>
  );
}
