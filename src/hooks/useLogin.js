import { useContext } from "react";
import { loginContext } from "../context/LoginContext.jsx";

export function useLogin() {
  const context = useContext(loginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
