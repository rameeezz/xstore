import React from "react";
import RemoveItemCart from "./../../components/buttons/cart/RemoveItemCart";
import { useNavigate } from "react-router-dom";
export default function CartCard({ item }) {
  const navigate = useNavigate();
  function navigateToItemDetails() {
    navigate(`/products-details?productID=${item?.id}`);
  }
  return (
    <>
      <div className="d-flex gap-2 w-100 cursor-Pointer" onClick={navigateToItemDetails}>
        <div className="w-25 rounded">
          <img
            src={item?.images[0]}
            alt="item-photo"
            className="w-100 h-100 rounded"
          />
        </div>
        <div className="d-flex flex-column justify-content-between justify-content-md-center gap-md-3 flex-grow-1">
          <h4 className="fs-6 fs-md-0">{item?.title}</h4>
          <p className="small mb-0 d-none d-lg-block">
            {item?.description?.slice(0, 150)} ...
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span>{item?.price} EGP</span>
            <RemoveItemCart key={item?.id} removedItem={item} />
          </div>
        </div>
      </div>
    </>
  );
}
