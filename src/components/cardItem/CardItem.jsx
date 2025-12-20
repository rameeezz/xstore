import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ViewDetails from "./../../components/buttons/ViewDetails";
import FavButton from "./../../components/buttons/FavButton";
import "../../styles/cardStyle.css";
export default function CardItem({ item }) {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 mt-0 mt-md-3 mt-3">
        <div className="card">
          <div className="position-relative">
            <div className="position-absolute fav-tag">
              <FavButton product={item} />
            </div>
            <div className="position-absolute price-tag backgroundColor shadow rounded-1">
              <span className="p-2 secondaryColor">{item?.price}L.E</span>
            </div>
            <img
              src={item?.images[0]}
              className="card-img-top"
              loading="lazy"
              alt={item?.title}
            />
          </div>
          <div className="card-body">
            <h5
              className="card-title"
              title={item?.title}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item?.title}
            </h5>
            <p
              className="card-text"
              title={item?.description}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item?.description}
            </p>
            <div className="w-100 d-flex justify-content-between">
              <ViewDetails productID={item?.id} />
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
