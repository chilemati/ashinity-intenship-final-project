import { useState } from "react";
import { ChevronRight } from "lucide-react";
import jsonData from "@data/hero.json";

// Define the type of each child and category
interface ChildCategory {
  title: string;
  hasChildren: boolean;
}

interface Category {
  title: string;
  hasChildren: boolean;
  children?: ChildCategory[];
}

const categories: Category[] = jsonData.hero.sidenav; // no `.hero` if JSON root is `sidenav`

const SideNav = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="p-4 h-fit max-h-[344px] overflow-y-clip  bg-white l"
      style={{
        width: "217px",
        gap: "16px",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0%",
        textAlign: "center",
        color: "#000000",
      }}
    >
      <ul className="flex flex-col gap-2">
        {categories.map((cat, index) => (
          <li key={index}>
            {/* Parent item */}
            <div
              className="flex items-center justify-between cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
              onClick={() => cat.hasChildren && toggleCategory(index)}
            >
              <span>{cat.title}</span>
              {cat.hasChildren && (
                <ChevronRight
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                  size={18}
                />
              )}
            </div>

            {/* Submenu (render children if available) */}
            {cat.hasChildren && openIndex === index && cat.children && (
              <ul className="ml-4 mt-1 flex flex-col gap-1">
                {cat.children.map((child, i) => (
                  <li
                    key={i}
                    className="px-2 py-1 text-sm text-gray-600 hover:text-black cursor-pointer"
                  >
                    {child.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
