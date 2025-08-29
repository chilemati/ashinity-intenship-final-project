import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch } from "react-redux";

import MobileNav from "./MobileNav";
import jsonData from "@data/nav.json";
import SearchBar from "./SearchBar";
import { navSvg } from "@/dynamicSvgs/nav";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount, selectWishlistIds } from "@/store/cartSlice";
import { logoutUser } from "@/store/userSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";

const { nav, dropdown } = jsonData;

const Navber = () => {
  const cartCount = useAppSelector(selectCartCount);
  const wishlistIds = useAppSelector(selectWishlistIds);
  const { currentUser } = useSelector((state: RootState) => state.users);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setOpenUserMenu(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b-[0.5px] border-b-black pt-[16px] sticky px-2 md:px-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-inter text-[18px] text-nowrap md:text-[24px] font-bold text-black">
           <Link to="/"> Exclusive</Link>
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
                  end={path === "/e-commerce"}
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

            {/* Wishlist */}
            <Link to="/wishlist">
              <button className="text-black relative">
                {navSvg.heart}
                {wishlistIds.length > 0 && (
                  <span className="flexCenter h-4 w-4 rounded-full absolute top-[-4px] right-[-4px] bg-[#DB4444] text-white font-poppins text-[12px]">
                    {wishlistIds.length}
                  </span>
                )}
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <button className="text-black relative">
                {navSvg.cart}
                {cartCount > 0 && (
                  <span className="flexCenter h-4 w-4 rounded-full absolute top-[-4px] right-[-4px] bg-[#DB4444] text-white font-poppins text-[12px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* User (only show if logged in) */}
            {currentUser && (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-full ${
                    openUserMenu
                      ? "bg-[#DB4444] text-white"
                      : "text-black bg-transparent"
                  }`}
                >
                  {navSvg.user}
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-[224px] rounded drop-bg shadow-lg z-50 p-2 flex flex-col justify-evenly">
                    {dropdown.map((item, index) => (
                      <Link
                        to={item.to}
                        key={index}
                        onClick={() => setOpenUserMenu(false)} // close after click
                        className="flex items-center gap-2 px-3 py-1 text-[#FAFAFA] font-poppins text-[14px] font-normal leading-[21px] hover:bg-black/20 rounded transition"
                      >
                        <img src={item.icon} alt={item.text} className="w-4 h-4" />
                        <span>{item.text}</span>
                      </Link>
                    ))}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-1 text-[#FAFAFA] font-poppins text-[14px] font-normal leading-[21px] hover:bg-black/20 rounded transition"
                    >
                      <img
                        src="/svg/logout.svg"
                        alt="Logout"
                        className="w-4 h-4"
                      />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

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
