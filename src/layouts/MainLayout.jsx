import React from "react";
import Header from "../components/Header";
import axios from "axios";

function MainLayout({ children }) {
  return (
    <div className="bg-white max-h-full px-6 h-full">
      <Header></Header>
      {children}
    </div>
  );
}

export default MainLayout;
