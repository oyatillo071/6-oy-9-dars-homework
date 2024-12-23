import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  console.log(counter);
  return (
    <div className="bg-[#f0f6ff] py-2 mb-20">
      <header className="font-sans flex items-center justify-between container mx-auto">
        <Link
          to="/home"
          className="font-sans bg-[#057aff] px-4 rounded-md text-3xl text-[#dbe1ff]"
        >
          C
        </Link>

        <nav className="font-sans flex items-center gap-6">
          <NavLink
            to="/home"
            className="font-sans py-2 text-sm px-4 hover:bg-gray-200 rounded-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="font-sans py-2 text-sm px-4  hover:bg-gray-200 rounded-lg"
          >
            About
          </NavLink>
          <NavLink
            to="/products"
            className="font-sans py-2 text-sm px-4  hover:bg-gray-200 rounded-lg"
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className="font-sans py-2 text-sm px-4  hover:bg-gray-200 rounded-lg"
          >
            Cart
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              className="swap-off h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
            </svg>
          </button>
          <div className="relative">
            <Link to="/cart" className="bg-transparent">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
            </Link>
            <p className="absolute bottom-4 -right-1 bg-orange-400 px-1 py-0 font-light rounded-[50%]">
              {counter}
            </p>{" "}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
