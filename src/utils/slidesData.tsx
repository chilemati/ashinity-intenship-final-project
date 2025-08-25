// slidesData.tsx
import type { ReactNode } from "react";

interface Slide {
  img: string;
  content: ReactNode;
}

export const heroSlides: Slide[] = [
  {
    img: "/jpg/img1.jpg",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
          <img
            className="w-[40px] h-[49px]"
            src="/png/iphoneIcon.png"
            alt="iphone icon"
            loading="lazy"
          />
          <span className="ms-[24px] font-poppins font-normal text-base text-white">
            iPhone 14 Series
          </span>
        </div>
        <p className="max-w-[294px] font-inter font-semibold text-[42px] text-white mt-[20px]">
          Up to 10% off Voucher
        </p>
      </div>
    ),
  },
  {
    img: "/png/img2.png",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
         
        </div>
        <p className="max-w-[294px] font-inter font-semibold text-[42px] text-white mt-[20px]">
          Up to 5% off Voucher
        </p>
      </div>
    ),
  },
  {
    img: "/png/img3.png",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
         
        </div>
        <p className="max-w-[294px] font-inter font-semibold text-[42px] text-white mt-[20px]">
          Up to 20% off Voucher
        </p>
      </div>
    ),
  },
  {
    img: "/png/img4.png",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
         
        </div>
        <p className="max-w-[294px] font-inter font-semibold text-[42px] text-white mt-[20px]">
          Up to 18% off Voucher
        </p>
      </div>
    ),
  },
  {
    img: "/png/img5.png",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
         
        </div>
        <p className="max-w-[294px] font-inter font-semibold text-[42px] text-white mt-[20px]">
          Up to 50% off Voucher
        </p>
      </div>
    ),
  },
];
