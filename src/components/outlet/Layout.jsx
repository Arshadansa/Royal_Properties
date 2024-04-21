import React from "react";
import { Outlet } from "react-router-dom";



import PrimarySearchAppBar from "../navbar/PrimarySearchAppBar";
import Footer from "../footer/Footer";



const Layout = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className="mt-8 pt-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
