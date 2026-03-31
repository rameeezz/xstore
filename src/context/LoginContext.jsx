import React, { createContext, useContext, useState } from "react";
import { userApi } from "../services/api.js";
export const loginContext = createContext();
export default function LoginProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  async function signUp(userData) {
    const data = await userApi.Sign_Up(userData);
    return data;
  }
  async function signIn(userData) {
    const data = await userApi.Sign_IN(userData);
    if (data.access_token) {
      localStorage.setItem("userToken", data.access_token);
      setUserToken(data.access_token);
    }
    return data;
  }
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
  }

  return (
    <>
      <loginContext.Provider value={{ signUp, signIn, userToken, logout }}>
        {children}
      </loginContext.Provider>
    </>
  );
}
