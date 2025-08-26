import { heroCatSlides } from "@/utils/heroCatSlide";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // 👈 new import

const HeroCategory = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const showing = heroCatSlides[index];

  // handle navigation
  const nextSlide = () => {
    setIndex((prev) => (prev < heroCatSlides.length - 1 ? prev + 1 : 0));
  };
  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : heroCatSlides.length - 1));
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
        className="w-full md:w-[90%] mx-auto relative min-h-[500px] mt-[140px] bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* container */}
        <div className="w-fit gap-4 md:gap-0 grid grid-cols-1 lg:grid-cols-[1fr_1fr] py-[69px]  ps-4 lg:ps-[64px] ">
          {/* left */}
          <div className="order-2 md:order-1 " >
            <div>{showing.content}</div>
            <Link to="#" className="flexStart mt-[40px] py-4 px-[48px] w-fit bg-[#00FF66] rounded ">
              <span className="me-2 text-[#FAFAFA] text-base font-poppins font-[500] ">
               Buy Now
              </span>
            </Link>
          </div>
          {/* right */}
          <div className="relative order-1 md:order-2">
            <img
              className="h-[352px] w-full object-cover "
              loading="lazy"
              src={showing.img}
              alt="a slide image"
            />
          </div>
        </div>

       
      </div>
    </>
  );
};

export default HeroCategory;
