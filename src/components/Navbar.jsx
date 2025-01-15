import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch, CiGrid41 } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../actions"; // Adjust the import path as needed
import logo from "../assets/img/to-do-list.png";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-md py-4 px-6 sticky top-0 z-20">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <GiHamburgerMenu
            onClick={toggleSidebar}
            className="text-xl cursor-pointer"
          />
          <img src={logo} alt="DoIt Logo" className="h-10 w-8" />
          <h2 className="text-lg font-bold text-green-400">DoIt</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <CiSearch className="text-xl cursor-pointer" />
          <CiGrid41 className="text-xl cursor-pointer" />
          <MdDarkMode className="text-xl cursor-pointer" />
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
