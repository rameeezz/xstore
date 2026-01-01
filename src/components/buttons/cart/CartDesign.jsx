import React from "react";
import { useCart } from "./../../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
export default function CartDesign() {
  const { cartItems } = useCart();
  return (
    <>
      <div className="position-relative me-2">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="cart-icon mt-0 mt-md-3"
        />
        <span className="position-absolute top-0 start-100 translate-middle mt-0 mt-md-3 badge rounded-pill bg-danger">
          {cartItems.length}
        </span>
      </div>
    </>
  );
}
