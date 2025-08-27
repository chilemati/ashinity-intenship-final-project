import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroSvg } from "@/dynamicSvgs/hero";
import { useSwipeable } from "react-swipeable"; // 👈 new import
import { heroSlides } from "@/utils/slidesData";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const showing = heroSlides[index];

  // handle navigation
  const nextSlide = () => {
    setIndex((prev) => (prev < heroSlides.length - 1 ? prev + 1 : 0));
  };
  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : heroSlides.length - 1));
  };
  const goToSlide = (i: number) => {
    setIndex(i);
  };

  // auto switch slides
  useEffect(() => {
    if (isPaused) return; // pause on hover
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // ⏱ 4s feels professional
    return () => clearInterval(interval);
  }, [isPaused]);

  // swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true, // also allows dragging with mouse (desktop)
  });

  return (
    <>
      <div
        {...handlers} // 👈 attach swipe gestures here
        className="w-full relative min-h-[344px]] bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* container */}
        <div className="grid grid-cols-1 lg:grid-cols-[249px_1fr] pt-[72.5px] ps-4 md:ps-[64px] ">
          {/* left */}
          <div>
            <div>{showing.content}</div>
            <Link to="#" className="flexStart mt-[22px] ">
              <span className="me-2 text-[#FAFAFA] text-base font-poppins font-[500] ">
                Shop Now
              </span>
              <span className="text-[#FAFAFA]"> {heroSvg.arrow2} </span>
            </Link>
          </div>
          {/* right */}
          <div className="relative">
            <img
              className="h-[352px] object-cover "
              loading="lazy"
              src={showing.img}
              alt="a slide image"
            />
          </div>
        </div>

        {/* pagination dots */}
        <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full ${
                i === index
                  ? "bg-[#DB4444] border-[2px] border-white "
                  : "bg-[#9A9CAA]"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
