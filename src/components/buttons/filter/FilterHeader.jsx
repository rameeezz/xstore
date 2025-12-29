import React from "react";
import FilterButton from "./FilterButton";

const FilterHeader = ({ onFilterSelect }) => {
  return (
    <div className="w-100 d-flex justify-content-center gap-2">
      <button
        className="btn btn-outline-info p-1 p-md-2 text-dark"
        label={"Filter"}
        onClick={onFilterSelect}
      >
        Filter
      </button>
      {["Price", "Category"].map((filter) => (
        <FilterButton key={filter} label={filter} onClick={onFilterSelect} />
      ))}
    </div>
  );
};

export default FilterHeader;
