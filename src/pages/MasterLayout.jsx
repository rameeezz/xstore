import React from "react";
import Navbar from './../components/Navbar';
import { Outlet } from "react-router-dom";
import Footer from './../components/footer/Footer';
export default function MasterLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
