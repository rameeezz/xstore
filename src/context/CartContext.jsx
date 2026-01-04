import React, {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const cartContext = createContext();

const CART_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  REMOVE_ALL: "REMOVE_ALL",
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD:
      return [...state, action.payload];
    case CART_ACTIONS.REMOVE_ALL:
      return [];
    case CART_ACTIONS.REMOVE:
      return state.filter((element) => element?.id !== action.payload?.id);
    default:
      return state;
  }
}

const init = (initialValue) => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : initialValue;
};

export default function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], init);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback(
    (item) => {
      const itemExists = cartItems.some((element) => element?.id === item?.id);

      if (!itemExists) {
        dispatch({ type: CART_ACTIONS.ADD, payload: item });
        return true;
      } else {
        return false;
      }
    },
    [cartItems]
  );

  const removeItem = useCallback(
    (item) => {
      const itemExists = cartItems.some((element) => element?.id === item?.id);

      if (itemExists) {
        dispatch({ type: CART_ACTIONS.REMOVE, payload: item });
        return true;
      } else {
        return false;
      }
    },
    [cartItems]
  );
  const removeAllItems = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_ALL, payload: [] });
  };
  const contextValue = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      removeAllItems,
    }),
    [cartItems, addItem, removeItem]
  );

  return (
    <cartContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        // theme="colored"
      />
    </cartContext.Provider>
  );
}
