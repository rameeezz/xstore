import React from "react";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

export default function FilterByPriceAndCategory({
  priceRange,
  onPriceChange,
  categoryType,
  onCategoryClick,
}) {
  return (
    <>
      <span className="mb-2 d-block">Select Category</span>
      <CategoryFilter
        categoryType={categoryType}
        onCategoryClick={onCategoryClick}
      />
      <hr className="my-3" />
      <span className="mb-2 d-block"> Price (EGP)</span>
      <PriceFilter priceRange={priceRange} onChange={onPriceChange} />
    </>
  );
}
