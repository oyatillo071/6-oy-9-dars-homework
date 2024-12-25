import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    const userLogged = localStorage.getItem("isLoggedIn") === "true";
    setIsLog(userLogged);
    if (!userLogged) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="bg-white max-h-full px-6 h-full">
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
