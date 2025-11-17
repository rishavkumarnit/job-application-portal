import React from "react";
import { useContext } from "react";
import { User } from "../App";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { profile } = useContext(User);
  return (
    <>
      <nav className="flex fixed h-10 py-1 sm:py-2 w-full font-[Poppins] text-[73%] font-semibold sm:text-lg sm:font-semibold md:font-bold z-30 px-2 sm:px-10 justify-between bg-gray-200">
        <div className="hover:cursor-pointer">Smart Job Portal</div>
        <div className="flex gap-2 sm:gap-12 sm:mr-2 ">
          <span className="hover:cursor-pointer hover:text-gray-400">
            <Link to="/">Home</Link>
          </span>
          <span className="hover:cursor-pointer hover:text-gray-400">
            <Link to="/applications">Applications</Link>
          </span>
          <span className="hover:text-gray-400 hover:cursor-pointer">
            <Link to="/profile">{profile.userName}</Link>
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
