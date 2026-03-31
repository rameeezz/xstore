import { useCart } from "../../../hooks/useCart.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin.js";

export default function ProceedToCheckout() {
  const { userToken } = useLogin();
  const { removeAllItems } = useCart();
  const navigate = useNavigate();
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
