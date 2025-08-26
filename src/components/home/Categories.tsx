import { useState } from "react";
import { heroSvg } from "@/dynamicSvgs/hero";
import jsonData from "@/data/categories.json";
import { categoriesSvg } from "@/dynamicSvgs/categories";
const products = jsonData.data;

const Categories = () => {
  // ✅ Default active = 4th item (index 3)
  const [activeIndex, setActiveIndex] = useState(3);

  const handleArrow = (direction: "left" | "right") => {
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (direction === "right" && activeIndex < products.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="mt-[140px] w-[95%] lg:w-[90%] mx-auto border-b-[0.5px] border-b-black ">
      {/* title */}
      <div className="flexStart gap-[10px] ">
        <div className="w-[20px] h-[40px] rounded-[4px] bg-[#DB4444] "></div>
        <h3 className="font-poppins font-semibold text-base text-[#DB4444] ">
          Categories
        </h3>
      </div>

      {/* header */}
      <div className="flexBetween">
        <div className="flexStart flex-nowrap gap-4 lg:gap-[87px] mt-[11px] ">
          <h2 className="font-inter font-semibold text-[20px] lg:text-[36px] text-black ">
            Browse By Category
          </h2>
        </div>

        {/* arrows */}
        <div className="hidden lg:flexStart gap-2 ">
          <button
            disabled={activeIndex === 0}
            onClick={() => handleArrow("left")}
            className={`-rotate-180 h-[46px] w-[46px] rounded-full flexCenter ${
              activeIndex > 0
                ? "bg-[#F5F5F5]"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {heroSvg.arrow2}
          </button>
          <button
            disabled={activeIndex === products.length - 1}
            onClick={() => handleArrow("right")}
            className={`h-[46px] w-[46px] rounded-full flexCenter ${
              activeIndex < products.length - 1
                ? "bg-[#F5F5F5]"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {heroSvg.arrow2}
          </button>
        </div>
      </div>

      {/* categories */}
      <div className="flexStart gap-[30px] overflow-x-scroll hide-scrollbar mt-[30px] pb-[20px]">
        {products.map((p, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={p.id}
              onClick={() => setActiveIndex(index)}
              className={`max-w-[170px] min-w-[170px] h-[145px] rounded flexCenter flex-col gap-4 cursor-pointer border-[1px] transition ${
                isActive
                  ? "bg-[#DB4444] text-white border-[#DB4444]"
                  : "border-[#0000004D] bg-white text-black"
              }`}
            >
              <span className="text-2xl">{categoriesSvg[p.image]}</span>
              <span className="font-poppins font-normal text-base  ">{p.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
