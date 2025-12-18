import React from "react";
import "../../styles/HeaderCss.css";
import backgroundPhoto from "../../assets/photos/wmremove-transformed.jpeg";

export default function Header() {
  return (
    <>
      <div className="position-relative ">
        <img
          src={backgroundPhoto}
          alt="Background Photo"
          className="w-100"
          loading="lazy"
        />
        <div className="position-absolute w-100 h-100 z-3 bg-dark top-0 bg-opacity-25">
          <p className="position-absolute start-50 topHeaderPhoto  translate-middle-x text-white fw-bold fs-3 fontSize">
            Welcome To Our Store{" "}
            <span className="d-block text-center textColorMain">XStore</span>
          </p>
        </div>
      </div>
    </>
  );
}
