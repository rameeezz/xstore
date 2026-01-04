import React from "react";
import { useCart } from "./../../hooks/useCart.js";
import CartCard from "../../components/cart/CartCard.jsx";
import CartCheckout from "../../components/cart/CartCheckout.jsx";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <div>
      <div className="container">
        <div className="row gap-3 mt-3">
          <div
            className={`${
              cartItems.length > 0 ? "col-lg-7" : "w-100"
            } d-flex flex-column border border-2 p-2 rounded align-self-start`}
          >
            {cartItems.length > 0 ? (
              cartItems.map((element, index) => (
                <React.Fragment key={element?.id}>
                  <CartCard item={element} />
                  {index !== cartItems.length - 1 && (
                    <div className="border-bottom border-2 my-2"></div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div
                className="alert alert-secondary text-center mt-5"
                role="alert"
              >
                No items in the cart.
              </div>
            )}
          </div>
          {cartItems.length === 0 ? (
            ""
          ) : (
            <div className="col-lg-4 border border-2 bg-info rounded align-self-start">
              <CartCheckout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
