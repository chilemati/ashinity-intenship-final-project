// slidesData.tsx
import CountdownTimer2 from "@/components/home/CountdownTimer2";
import type { ReactNode } from "react";

interface Slide {
  img: string;
  content: ReactNode;
}

// Create an end date 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);

export const heroCatSlides: Slide[] = [
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206918/exclusive/img1_rrawtz.jpg",
    content: (
      <div>
        <div className="flex items-center min-h-[40px] ">
          <h5 className="font-poppins font-semibold text-base text-[#00FF66] ">Categories</h5>
         
        </div>
        <p className="max-w-[443px] mb-[32px] font-inter font-semibold text-[42px] text-white mt-[20px]">
        Enhance Your Music Experience
        </p>
        <div className="">
             <CountdownTimer2
                        endDate={endDate.toISOString()}
                        onComplete={() => alert("Flash Sales Ended!")}
                      />
        </div>
      </div>
    ),
  },
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206919/exclusive/img3_rcgt9p.png",
    content: (
      <div>
         <div className="flex items-center min-h-[40px] ">
          <h5 className="font-poppins font-semibold text-base text-[#00FF66] ">Categories</h5>
         
        </div>
        <p className="max-w-[443px] mb-[32px] font-inter font-semibold text-[42px] text-white mt-[20px]">
        Enhance Your Music Experience
        </p>
        <div className="">
             <CountdownTimer2
                        endDate={endDate.toISOString()}
                        onComplete={() => alert("Flash Sales Ended!")}
                      />
        </div>
      </div>
    ),
  },
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206921/exclusive/img4_dhr8ft.png",
    content: (
      <div>
         <div className="flex items-center min-h-[40px] ">
          <h5 className="font-poppins font-semibold text-base text-[#00FF66] ">Categories</h5>
         
        </div>
        <p className="max-w-[443px] mb-[32px] font-inter font-semibold text-[42px] text-white mt-[20px]">
        Enhance Your Music Experience
        </p>
        <div className="">
             <CountdownTimer2
                        endDate={endDate.toISOString()}
                        onComplete={() => alert("Flash Sales Ended!")}
                      />
        </div>
      </div>
    ),
  },
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206923/exclusive/5e634682db5174aff99bb9337d2dc9598a0b44e4_wztgwb.png",
    content: (
      <div>
         <div className="flex items-center min-h-[40px] ">
          <h5 className="font-poppins font-semibold text-base text-[#00FF66] ">Categories</h5>
         
        </div>
        <p className="max-w-[443px] mb-[32px] font-inter font-semibold text-[42px] text-white mt-[20px]">
        Enhance Your Music Experience
        </p>
        <div className="">
             <CountdownTimer2
                        endDate={endDate.toISOString()}
                        onComplete={() => alert("Flash Sales Ended!")}
                      />
        </div>
      </div>
    ),
  },
  {
    img: "https://res.cloudinary.com/dlifiojbx/image/upload/v1756206927/exclusive/img5_x0yvp1.png",
    content: (
      <div>
         <div className="flex items-center min-h-[40px] ">
          <h5 className="font-poppins font-semibold text-base text-[#00FF66] ">Categories</h5>
         
        </div>
        <p className="max-w-[443px] mb-[32px] font-inter font-semibold text-[42px] text-white mt-[20px]">
        Enhance Your Music Experience
        </p>
        <div className="">
             <CountdownTimer2
                        endDate={endDate.toISOString()}
                        onComplete={() => alert("Flash Sales Ended!")}
                      />
        </div>
      </div>
    ),
  },
];
