import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/Footer.css";
export default function Footer() {
  return (
    <footer className="rounded mt-4 bg-black bg-opacity-75 pb-2 ">
      <div className="d-flex justify-content-center">
        <div className="my-3 lineInFooter rounded"></div>
      </div>
      <div className="d-flex flex-wrap justify-content-around align-items-center pb-2">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2 mb-md-0">
          <div className="rounded-3 d-flex justify-content-center align-items-center styleOfLogoInFooter">
            <span className="text-white fw-bold">X</span>
          </div>
          <span className="text-white">Store</span>
        </div>
        <p className="text-white textCopyWrite m-0 mb-1 mb-md-0">
          Copyright {new Date().getFullYear()} © slothUI
        </p>
        <div className="d-flex justify-content-center align-items-center gap-3 mb-2 mb-md-0">
          <a href="#!" aria-label="Facebook">
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{ color: "#3b5998" }}
              className="iconSizeInSmallScreen"
            />
          </a>
          <a href="#!" aria-label="LinkedIn">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              style={{ color: "#0077b5" }}
              className="iconSizeInSmallScreen"
            />
          </a>
          <a href="#!" aria-label="Instagram">
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ color: "#e1306c" }}
              className="iconSizeInSmallScreen"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
