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
  const [categoryType, setCategoryType] = useState("");

  function handlePriceChange(e) {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  }
  function handleCategoryType(e) {
    setCategoryType(e.target.value);
  }
  const closeFilterDiv = () => {
    setActiveFilter(null);
    setCategoryType("");
  };

  async function getProductByPrice() {
    if (categoryType === "") {
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
    } else {
      try {
        const data = await productApi.filterByCategory(categoryType);
        if (onFilter) {
          onFilter(data);
        }
      } catch (error) {
        console.error("Failed to filter products:", error);
      } finally {
        setCategoryType("");
        setActiveFilter(null);
      }
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
