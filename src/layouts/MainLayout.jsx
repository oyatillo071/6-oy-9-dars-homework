import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [isLog, setIslog] = useState(false);

  useEffect(() => {
    const userLogged = localStorage.getItem("isLoggedIn"); // Correct the key name here
    setIslog(!!userLogged);
    if (!isLog) {
      navigate("/register");
    }
  }, [isLog, navigate]);

  return (
    <div className="bg-white max-h-full px-6 h-full">
      <Header></Header>
      {children}
    </div>
  );
}

export default MainLayout;
