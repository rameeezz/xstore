import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Footer from "./../components/footer/Footer";

export default function MasterLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <main
        key={pathname}
        style={{ paddingTop: "55px", minHeight: "calc(100vh - 140px)" }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
