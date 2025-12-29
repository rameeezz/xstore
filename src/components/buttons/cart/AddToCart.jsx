import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
export default function AddToCart() {
    function showAlert() {
        alert("isa hnwsl")
    }
  return (
    <>
      <button className="btn btn-primary" onClick={showAlert}>
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </>
  );
}
