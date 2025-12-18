import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewDetails({ categoryId, productID }) {
  const navigate = useNavigate();

  function navigateToProducts() {
    if (categoryId) {
      navigate(`/products?categoryId=${categoryId}`);
    } else {
      navigate(`/products-details?productID=${productID}`);
    }
  }

  return (
    <>
      <button
        className="btn btn-primary btn-sm mt-auto"
        onClick={navigateToProducts}
      >
        View Details
      </button>
    </>
  );
}
