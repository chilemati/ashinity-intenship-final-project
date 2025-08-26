import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string | Date; // Accepts ISO string or Date object
  onComplete?: () => void; // Optional callback when timer reaches zero
}

const CountdownTimer2: React.FC<CountdownTimerProps> = ({ endDate, onComplete }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center gap-2 lg:gap-[15px] ">
      {/* Days */}
      <div className="text-center  w-[64px] h-[64px] bg-white  rounded-full flexCenter flex-col-reverse  ">
        <div className="font-poppins font-normal leading-[0px] text-[11px]  text-black mb-0">
          Days
        </div>
        <div className="font-poppins font-semibold text-[16px]  tracking-[0.04em] text-black">
          {timeLeft.days}
        </div>
      </div>

     

      {/* Hours */}
      <div className="text-center  w-[64px] h-[64px] bg-white  rounded-full flexCenter flex-col-reverse ">
        <div className="font-poppins font-normal leading-[0px] text-[11px]  text-black mb-0">
          Hours
        </div>
        <div className="font-poppins font-semibold text-[16px]  tracking-[0.04em] text-black">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
      </div>

     

      {/* Minutes */}
      <div className="text-center  w-[64px] h-[64px] bg-white  rounded-full flexCenter flex-col-reverse ">
        <div className="font-poppins font-normal leading-[0px] text-[11px]  text-black mb-0">
          Minutes
        </div>
        <div className="font-poppins font-semibold text-[16px]  tracking-[0.04em] text-black">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
      </div>

     

      {/* Seconds */}
      <div className="text-center  w-[64px] h-[64px] bg-white  rounded-full flexCenter flex-col-reverse ">
        <div className="font-poppins font-normal leading-[0px] text-[11px]  text-black mb-0">
          Seconds
        </div>
        <div className="font-poppins font-semibold text-[16px]  tracking-[0.04em] text-black">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer2;
