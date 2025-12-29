import React from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import FilterByPriceAndCategory from "./FilterByPriceAndCategory";

const FilterPanel = ({
  activeFilter,
  onClose,
  onSave,
  priceRange,
  onPriceChange,
  onCategoryClick,
  categoryType,
}) => {
  return (
    <div
      className={`w-100 bg-white position-fixed start-0 z-3 p-3 styleForDiv ${
        activeFilter ? "active" : ""
      }`}
    >
      <div className="position-absolute top-0 end-0">
        <button className="btn-close me-3 mt-2" onClick={onClose}></button>
      </div>

      <span>{activeFilter === "Category" ? "Category" : ""}</span>
      <span>{activeFilter === "Price" ? "Price (EGP)" : ""}</span>
      <span>
        {activeFilter !== "Category" && activeFilter != "Price" ? "Filter" : ""}
      </span>
      <hr />

      {activeFilter === "Category" && (
        <CategoryFilter
          onCategoryClick={onCategoryClick}
          categoryType={categoryType}
        />
      )}

      {activeFilter === "Price" && (
        <PriceFilter priceRange={priceRange} onChange={onPriceChange} />
      )}
      {activeFilter != "Price" && activeFilter != "Category" && (
        <FilterByPriceAndCategory
          priceRange={priceRange}
          onPriceChange={onPriceChange}
          categoryType={categoryType}
          onCategoryClick={onCategoryClick}
        />
      )}
      <hr />
      <div className="d-flex justify-content-center mt-2">
        <button className=" btn btn-info text-white w-25" onClick={onSave}>
          {" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
