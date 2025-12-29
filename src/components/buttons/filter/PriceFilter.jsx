import React from "react";

const PriceFilter = ({ priceRange, onChange }) => {
  return (
    <div className="d-flex justify-content-center gap-2">
      <div className="d-flex flex-column">
        <span>From</span>
        <input
          type="number"
          className="form-control"
          name="from"
          value={priceRange.from}
          onChange={onChange}
        />
      </div>
      <div className="d-flex flex-column">
        <span>TO</span>
        <input
          type="number"
          className="form-control"
          name="to"
          value={priceRange.to}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
