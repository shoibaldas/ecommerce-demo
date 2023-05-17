import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import useNavbarBackground from "../../hooks/NavbarBackground/useNavbarBackground";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { color, textColor } = useNavbarBackground();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link to="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            Ecommarce.
          </h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4">
            <Link to="/products">Products</Link>
          </li>
          <li className="p-4">
            <Link to="/about">About</Link>
          </li>
          <li className="p-4 flex items-center">
            <AiOutlineShoppingCart className="text-xl"></AiOutlineShoppingCart>
          </li>
          <li className="p-4">
            <Link to="/login" className="border-2 border-teal-600 rounded px-4 py-2 hover:text-white hover:bg-teal-600 transition duration-300 ease-in">Login</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen backdrop-blur-3xl bg-white/10 text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen backdrop-blur-3xl bg-white/10 text-center ease-in duration-300"
          }
        >
          <ul>
            <Link to="/">
              <h1
                style={{ color: `${textColor}` }}
                className="font-bold text-4xl"
              >
                Ecommarce.
              </h1>
            </Link>
            <li
              onClick={handleNav}
              style={{ color: `${textColor}` }}
              className="p-4 text-gray-400"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              style={{ color: `${textColor}` }}
              className="p-4 text-gray-400"
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              onClick={handleNav}
              style={{ color: `${textColor}` }}
              className="p-4 text-gray-400"
            >
              <Link to="/about">About</Link>
            </li>
            <li
              style={{ color: `${textColor}` }}
              className="p-4 flex items-center justify-center text-gray-400"
            >
              <AiOutlineShoppingCart className="text-xl"></AiOutlineShoppingCart>
            </li>
            <li className="p-4 text-gray-400">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
