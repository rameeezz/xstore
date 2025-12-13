import React from "react";
import Navbar from './../components/Navbar';
import { Outlet } from "react-router-dom";
export default function MasterLayout() {
  return (
    <>
      <Navbar />
      <main className="container mt-5 pt-4">
        <Outlet />
      </main>
    </>
  );
}
