import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutType ={
    children:ReactNode
}
const Layout = ({ children } : LayoutType) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;