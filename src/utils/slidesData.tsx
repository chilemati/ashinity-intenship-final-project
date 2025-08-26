// slidesData.tsx
import type { ReactNode } from "react";

interface Slide {
  img: string;
  content: ReactNode;
}

export const heroSlides: Slide[] = [
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206918/exclusive/img1_rrawtz.jpg",
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
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206919/exclusive/img3_rcgt9p.png",
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
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206921/exclusive/img4_dhr8ft.png",
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
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206923/exclusive/5e634682db5174aff99bb9337d2dc9598a0b44e4_wztgwb.png",
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
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206927/exclusive/img5_x0yvp1.png",
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
