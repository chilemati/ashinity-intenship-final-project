import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import MobileNav from "./MobileNav";
import jsonData from "@data/nav.json";
import SearchBar from "./SearchBar";
import { navSvg } from "@/dynamicSvgs/nav";

const { nav, dropdown } = jsonData;

const Navber = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userRef.current && !(userRef.current as HTMLElement).contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b-[0.5px] border-b-black pt-[16px] sticky px-2 md:px-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-inter text-[18px] text-nowrap md:text-[24px] font-bold text-black">
            Exclusive
          </div>

          {/* main nav */}
          <ul className="flexStart gap-[48px]">
            {nav.map(({ name, path }) => (
              <li className="hidden md:flexStart" key={name}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-poppins text-black border-b-[1px] text-base font-normal transition ${
                      isActive ? "border-b-black " : "border-b-transparent "
                    }`
                  }
                  end={path === "/e-commerce"} // ensures Home only matches exact
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* right side */}
          <div className="flexStart gap-[24px]">
            <div className="hidden lg:flex">
              <SearchBar
                icon="/svg/search.svg"
                placeholder="What are you looking for?"
              />
            </div>
            <button className="text-black"> {navSvg.heart} </button>
            <button className="text-black relative">
              {navSvg.cart}
              <span className="flexCenter h-4 w-4 rounded-full absolute top-[-4px] right-[-4px] bg-[#DB4444] text-white font-poppins text-[12px]">
                0
              </span>
            </button>

            {/* user */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="focus:outline-none"
              >
                <img src="/svg/user.svg" alt="user icon" loading="lazy" />
              </button>

              {openUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-[224px] h-[208px] rounded drop-bg shadow-lg z-50 p-2 flex flex-col justify-evenly"
                  style={{ opacity: 1 }}
                >
                  {dropdown.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 text-[#FAFAFA] font-poppins text-[14px] font-normal leading-[21px] hover:bg-black/20 rounded transition"
                    >
                      <img src={item.icon} alt={item.text} className="w-4 h-4" />
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* mobile menu */}
            <div className="flexCenter w-fit md:hidden group">
              <FiMenu className="flex group-hover:hidden text-[25px] font-bold text-black" />
              <MdArrowDropDown className="hidden group-hover:flex text-[55px] group-hover:cursor-not-allowed font-bold text-black" />
              <div className={`hidden group-hover:flexColStart w-full`}>
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
