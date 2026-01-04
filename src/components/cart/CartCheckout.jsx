import React from "react";
import { useCart } from "../../hooks/useCart";
import ProceedToCheckout from "./../buttons/checkout/ProceedToCheckout";

const lineBetweenContent = <div className="border-bottom border-2 my-2"></div>;
export default function CartCheckout() {
  const { cartItems } = useCart();

  let calculateOrderPrice = 0;
  cartItems.forEach((element) => {
    calculateOrderPrice += Number(element.price);
  });
  return (
    <>
      <div className="container p-3 text-white">
        <h3 className="fs-5 fs-md-1">Order Summary</h3>
        {lineBetweenContent}
        <div className="d-flex justify-content-between align-items-center">
          <span>Total Price</span>
          <span>{calculateOrderPrice} EGP</span>
        </div>
        {lineBetweenContent}
        <p>Add a coupon</p>
        <input type="text" className="form-control w-100 mb-5" />
        {lineBetweenContent}
        <div className="w-100 d-flex justify-content-center">
          <ProceedToCheckout />
        </div>
      </div>
    </>
  );
}
