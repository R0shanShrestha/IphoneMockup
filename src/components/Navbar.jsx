import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full  py-5 md:py-10 px-5 sm:px-10 flex justify-between items-center">
      <nav className="flex w-full max-w-screen-xl mx-auto items-center">
        <img src={appleImg} alt="" width={15} height={18} />

        <div className=" flex-1 justify-center hidden sm:flex">
          {navLists.map((nav, i) => (
            <div
              key={i}
              className="px-5 text-sm cursor-pointer text-gray-400 hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 flex-1 justify-end sm:flex-none cursor-pointer">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
