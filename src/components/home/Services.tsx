import { motion } from "framer-motion";
import jsonData from "@/data/services.json";

const data = jsonData.data;

const Services = () => {
  return (
    <div className=" mt-[40px] mb-[32px] lg:mb-[62px]  lg:mt-[140px] max-w-[943px] mx-auto min-h-[161px] grid grid-cols-1 px-4 lg:px-0 lg:grid-cols-3 gap-[40px] lg:gap-[88px]">
      {data.map((each: any, index: number) => (
        <div key={index} className="flexCenter flex-col relative">
          <div className="relative flexCenter w-[80px] h-[80px]">
            {/* Animated ping circle (background only) */}
            <motion.div
              className="absolute w-[80px] h-[80px] rounded-full bg-[#2F2E30]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Static icon container */}
            <div className="relative z-10 w-[58px] h-[58px] rounded-full bg-black flexCenter">
              <img
                className="w-[34px] h-[34px] object-contain"
                src={each.icon}
                alt={each.name}
                loading="lazy"
              />
            </div>
          </div>

          <h3 className="mt-[24px] text-left font-poppins font-semibold text-[20px] text-black">
            {each.name}
          </h3>
          <p className="mt-[8px] text-left font-poppins font-normal text-[14px] text-black">
            {each.p}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Services;
