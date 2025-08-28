import { aboutSvg } from "@/dynamicSvgs/about";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Stat {
  icon: string;
  figure: string; // can be like "10.5k " or "25000"
  p: string;
  active: boolean;
}

const parseNumber = (value: string) => {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.\s]/g, ""); // e.g., "k", "M"
  return { num, suffix };
};

const Counter = ({ value }: { value: string }) => {
  const { num, suffix } = parseNumber(value);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    suffix ? latest.toFixed(1) : latest.toFixed(0)
  );
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      animate(count, num, { duration: 2, ease: "easeOut" });
    }
  }, [inView, num, count]);

  return (
    <motion.span ref={ref}>
    {/* ✅ Use `motion.span` with `children={rounded}` */}
      <motion.span>{rounded}</motion.span> {suffix}
    </motion.span>
  );
};

const Section2 = ({ data }: { data: Stat[] }) => {
  const [activeIndex, setActiveIndex] = useState(1); // default 2nd active

  return (
    <section className="w-[90%] mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] ">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flexCenter flex-col relative p-6 rounded-lg cursor-pointer transition-all ${
            activeIndex === index ? "bg-[#DB4444] text-white" : "bg-gray-100"
          }`}
        >
          {/* Animated Icon */}
          <div className="relative flexCenter w-[80px] h-[80px]">
            <motion.div
              className="absolute w-[80px] h-[80px] rounded-full bg-[#2F2E30]"
              animate={
                activeIndex === index
                  ? { scale: [1, 1.5, 1], opacity: [1, 0, 1] }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div
              className={`relative z-10 w-[58px] h-[58px] rounded-full flexCenter ${
                activeIndex === index
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              <span className="w-[34px] h-[34px] flexCenter">
                {aboutSvg[item.icon]}
              </span>
            </div>
          </div>

          {/* Animated Counter */}
          <h3 className="mt-[24px] font-inter font-bold text-[32px]">
            <Counter value={item.figure} />
          </h3>
          <p className="mt-[8px] font-poppins font-normal text-center text-[16px]">
            {item.p}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Section2;
