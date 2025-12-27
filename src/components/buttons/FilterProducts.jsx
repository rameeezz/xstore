import React, { useState } from "react";
import { productApi } from "../../services/api.js";
import "../../styles/Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// 1. Extract Button to avoid re-creation on every render
const FilterButton = ({ label, onClick }) => (
  <button
    className="btn bg-secondary text-white p-1 p-md-2"
    onClick={() => onClick(label)}
  >
    {label} <FontAwesomeIcon icon={faAngleDown} className="ms-1" size="sm" />
  </button>
);

// 2. Extract Category Logic to isolate re-renders (Performance)
const CategoryFilter = () => {
  const [selectSize, setSelectSize] = useState(1);
  return (
    <div className="d-flex justify-content-center gap-2">
      <div className="d-flex flex-column">
        <span>Category</span>
        <select
          className="form-select"
          size={selectSize}
          onFocus={() => setSelectSize(5)}
          onBlur={() => setSelectSize(1)}
          onChange={() => setSelectSize(1)}
          aria-label="Default select example"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
        </select>
      </div>
    </div>
  );
};

export default function FilterProducts({ onFilter }) {
  const [activeFilter, setActiveFilter] = useState(null); // Replaces isActive and filterType

  const [priceRange, setPriceRange] = useState({
    from: "",
    to: "",
  });

  function handlePriceChange(e) {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  }
  const closeFilterDiv = () => setActiveFilter(null);
  async function getProductByPrice() {
    try {
      const data = await productApi.filterByPrice(
        priceRange.from,
        priceRange.to
      );
      if (onFilter) {
        onFilter(data);
      }
    } catch (error) {
      console.error("Failed to filter products:", error);
    } finally {
      setActiveFilter(null);
    }
  }
  return (
    <>
      <div className="w-100 d-flex justify-content-center gap-2">
        <button className="btn btn-outline-info p-1 p-md-2 text-dark">
          Filter
        </button>
        {/* 3. Scalable rendering */}
        {["Price", "Category"].map((filter) => (
          <FilterButton key={filter} label={filter} onClick={setActiveFilter} />
        ))}
      </div>
      <div
        className={`w-100 bg-white position-fixed start-0 z-3 p-3 styleForDiv ${
          activeFilter ? "active" : ""
        }`}
      >
        <div className="position-absolute top-0 end-0">
          <button
            className="btn-close me-3 mt-2"
            onClick={closeFilterDiv}
          ></button>
        </div>

        <span>{activeFilter === "Category" ? "Category" : "Price (EGP)"}</span>

        <hr />

        {/* 4. Cleaner Conditional Rendering */}
        {activeFilter === "Category" && <CategoryFilter />}

        {activeFilter === "Price" && (
          <div className="d-flex justify-content-center gap-2">
            <div className="d-flex flex-column">
              <span>From</span>
              <input
                type="number"
                className="form-control"
                name="from"
                value={priceRange.from}
                onChange={(e) => {
                  handlePriceChange(e);
                }}
              />
            </div>
            <div className="d-flex flex-column">
              <span>TO</span>
              <input
                type="number"
                className="form-control"
                name="to"
                value={priceRange.to}
                onChange={(e) => {
                  handlePriceChange(e);
                }}
              />
            </div>
          </div>
        )}
        <hr />
        <div className="d-flex justify-content-center mt-2">
          <button
            className=" btn btn-info text-white w-25"
            onClick={getProductByPrice}
          >
            {" "}
            Save
          </button>
        </div>
      </div>
    </>
  );
}
