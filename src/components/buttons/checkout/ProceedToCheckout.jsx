import { useCart } from "../../../hooks/useCart.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProceedToCheckout({ userToken }) {
  const { removeAllItems } = useCart();
  const navigate = useNavigate();
  console.log(userToken);
  function checkUserToken() {
    if (!userToken) {
      navigate("/signin");
    } else {
      handleCheckout();
    }
  }
  function handleCheckout() {
    Swal.fire({
      title: "Success!",
      text: "Your order has been placed successfully!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAllItems([]);
        navigate("/");
      }
    });
  }
  return (
    <>
      <button
        className="btn btn-outline-secondary w-100 text-white"
        onClick={checkUserToken}
      >
        Proceed to checkout
      </button>
    </>
  );
}
