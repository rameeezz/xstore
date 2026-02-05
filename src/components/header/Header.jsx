import React from "react";
import "../../styles/HeaderCss.css";
import backgroundPhoto from "../../assets/photos/hero-image.jpeg";

export default function Header() {
  return (
    <>
      <div className="position-relative vh-100">
        <img
          src={backgroundPhoto}
          alt="Background Photo"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 z-3 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center text-white px-3">
            <p
              className="fw-light text-uppercase mb-2 fs-4"
              style={{ letterSpacing: "3px" }}
            >
              Welcome To Our Store
            </p>
            <h1 className="fw-bold display-1 textColorMain">XStore</h1>
          </div>
        </div>
      </div>
    </>
  );
}
