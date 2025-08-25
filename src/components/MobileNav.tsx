import { NavLink } from "react-router-dom";
import jsonData from "@data/nav.json";
const { nav } = jsonData;

const MobileNav = () => {
  return (
    <div className="absolute group-hover:flex top-[20px]  px-5 bg-transparent h-fit pt-[50px] pb-4 w-full left-0" >
        <ul className="bg-white w-full p-3 shadow-md ">
           {nav.map(({ name, path }) => (
              <li className="w-full flexColStart j  " key={name}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-1.5 md:px-3 py-2 w-full  rounded-md text-center text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                  end={path === "/e-commerce"} // ensures Home only matches exact
                >
                  {name}
                </NavLink>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default MobileNav