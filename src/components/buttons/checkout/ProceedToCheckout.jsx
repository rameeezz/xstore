import React from "react";
import { useCart } from "../../../hooks/useCart.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProceedToCheckout() {
  const { removeAllItems } = useCart();
  const navigate = useNavigate();

  function handleCheckout() {
    Swal.fire({
      title: "Success!",
      text: "Your order has been placed successfully!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAllItems([]);
        navigate("/");
      }
    });
  }
  return (
    <>
      <button
        className="btn btn-outline-secondary w-100 text-white"
        onClick={handleCheckout}
      >
        Proceed to checkout
      </button>
    </>
  );
}
