import React, { useEffect, useState } from "react";
import { categoriesAPI } from "../../../services/api.js";

const CategoryFilter = ({ categoryType, onCategoryClick }) => {
  const [selectSize, setSelectSize] = useState(1);
  const [categoriesTypes, setCategoriesTypes] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await categoriesAPI.getAll();
        setCategoriesTypes(data);
      } catch (error) {
        console.error("there are no categories");
      }
    }
    getCategories();
  }, []);

  return (
    <div className="d-flex justify-content-center gap-2">
      <div className="d-flex flex-column">
        <select
          className="form-select"
          size={selectSize}
          onFocus={() => setSelectSize(5)}
          onBlur={() => setSelectSize(1)}
          onChange={(e) => {
            setSelectSize(1);
            onCategoryClick(e);
          }}
          aria-label="Default select example"
          value={categoryType || ""}
        >
          <option value="" disabled>
            Open this select menu
          </option>
          {categoriesTypes.length > 0
            ? categoriesTypes.map((element) => (
                <option key={element?.id} value={element?.slug} data-id={element?.id}>
                  {element?.name}
                </option>
              ))
            : ""}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
