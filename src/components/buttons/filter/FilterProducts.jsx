import React, { useState } from "react";
import { productApi } from "../../../services/api.js";
import "../../../styles/Filter.css";
import FilterHeader from "./FilterHeader";
import FilterPanel from "./FilterPanel";

export default function FilterProducts({ onFilter }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({
    from: "",
    to: "",
  });
  console.log(priceRange);

  const [categoryType, setCategoryType] = useState("");
  console.log(categoryType);

  const [categoryID, setCategoryID] = useState(0);
  console.log(categoryID);

  function handlePriceChange(e) {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  }
  function handleCategoryType(e) {
    setCategoryType(e.target.value);
    // Get the selected option element
    const selectedOption = e.target.options[e.target.selectedIndex];
    // Retrieve the custom data-id attribute
    const selectedId = selectedOption.getAttribute("data-id");
    setCategoryID(selectedId);
  }
  const closeFilterDiv = () => {
    setActiveFilter(null);
    setCategoryType("");
    setCategoryID("");
  };

  async function getProductByPrice() {
    const hasPrice = priceRange.from !== "" && priceRange.to !== "";
    const hasCategory = categoryID && categoryID != 0;

    let apiCall = null;

    if (hasPrice && hasCategory) {
      apiCall = productApi.filterByPriceAndCategory(
        categoryID,
        priceRange.from,
        priceRange.to
      );
    } else if (hasPrice) {
      apiCall = productApi.filterByPrice(priceRange.from, priceRange.to);
    } else if (hasCategory) {
      apiCall = productApi.filterByCategory(categoryType);
    }

    if (!apiCall) return setActiveFilter(null);

    try {
      const data = await apiCall;
      if (onFilter) onFilter(data);
    } catch (error) {
      console.error("Failed to filter products:", error);
    } finally {
      setActiveFilter(null);
      setCategoryID("");
      setCategoryType("");
      setPriceRange({
        from: 0,
        to: 0,
      });
    }
  }
  return (
    <>
      <FilterHeader onFilterSelect={setActiveFilter} />
      <FilterPanel
        activeFilter={activeFilter}
        onClose={closeFilterDiv}
        onSave={getProductByPrice}
        priceRange={priceRange}
        onPriceChange={handlePriceChange}
        onCategoryClick={handleCategoryType}
        categoryType={categoryType}
      />
    </>
  );
}
