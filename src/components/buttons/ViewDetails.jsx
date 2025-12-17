import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewDetails({ categoryId }) {
  const navigate = useNavigate();

  function navigateToProducts() {
    navigate(`/products?categoryId=${categoryId}`);
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
