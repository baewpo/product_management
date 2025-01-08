// Navbar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  isLoggedIn: boolean; 
  onLogout: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/add-product");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="h-[65px] w-full flex items-center px-[20px]  bg-[#ffffff] drop-shadow-md relative ">
      <label className="font-bold text-xl text-[#333] flex items-center hover:text-white transition hover:delay-75">
        Internship @ Ngernturbo
      </label>
      <div className="text-white ml-auto flex gap-2">
        <NavLink
          to="/"
          className="border border-black text-black hover:bg-black hover:border-transparent hover:text-white py-1.5 px-4 rounded ml-2 transition hover:delay-75"
        >
          <FontAwesomeIcon icon={faHouse} className="mr-[5px] aria-hidden:" />
          Home
        </NavLink>
        {isLoggedIn && (
          <>
            <button
              onClick={handleAddProductClick}
              className="border border-black text-black hover:bg-black hover:border-transparent hover:text-white py-1.5 px-4 rounded transition hover:delay-75"
            >
              <FontAwesomeIcon icon={faCog} className="aria-hidden:"/>
              <span className="ml-2">Manage Product</span>
            </button>
            <button
              onClick={handleLogout}
              className="border border-black bg-black text-white hover:bg-grey-dark hover:border-grey-dark py-1.5 px-4 rounded transition hover:delay-75"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="mr-[5px] aria-hidden:" />
              <span className="ml-2">Log Out</span>
            </button>
          </>
        )}
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className="border border-black bg-black text-white hover:bg-grey-dark hover:border-grey-dark py-1.5 px-4 rounded transition hover:delay-75"
          >
            <FontAwesomeIcon icon={faRightToBracket} className="mr-[5px] aria-hidden:"/>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
