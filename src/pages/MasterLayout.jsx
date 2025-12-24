import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Footer from "./../components/footer/Footer";

export default function MasterLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main
        key={pathname}
        className="flex-grow-1"
        style={{ paddingTop: "55px" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
