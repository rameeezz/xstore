import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const FilterButton = ({ label, onClick }) => (
  <button
    className="btn bg-secondary text-white p-1 p-md-2"
    onClick={() => onClick(label)}
  >
    {label} <FontAwesomeIcon icon={faAngleDown} className="ms-1" size="sm" />
  </button>
);

export default FilterButton;
