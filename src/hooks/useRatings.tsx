import { Fragment } from "react";
import type { ReactNode } from "react";

// Utility hook
const useRatings = () => {
  function showStars(num: number): ("full" | "half" | "empty")[] {
    const numStr = String(num);
    const int = Number(numStr.includes(".") ? numStr.split(".")[0] : numStr);

    const starArray: ("full" | "half" | "empty")[] = [];

    for (let i = 1; i <= int; ++i) {
      starArray.push("full");
    }
    if (numStr.includes(".")) {
      starArray.push("half");
    }

    // Fill the rest with empties until 5 stars
    while (starArray.length < 5) {
      starArray.push("empty");
    }

    return starArray;
  }

  interface ShowRatingsProps {
    val: number;
    full?: ReactNode;
    half?: ReactNode;
    empty?: ReactNode;
  }

  function ShowRatings({
    val,
    full = <img loading="lazy" src="/svg/fullStar.svg" alt="full star" />,
    half = <img loading="lazy" src="/svg/halfStar.svg" alt="half star" />,
    empty = <img loading="lazy" src="/svg/emptyStar.svg" alt="empty star" />,
  }: ShowRatingsProps) {
    return (
      <>
        {showStars(val).map((each, i) => (
          <Fragment key={i}>
            {each === "full" && full}
            {each === "half" && half}
            {each === "empty" && empty}
          </Fragment>
        ))}
      </>
    );
  }

  interface ShowProgressBarsProps {
    val: number;
  }

  function ShowProgressBars({ val }: ShowProgressBarsProps) {
    return (
      <>
        {[5, 4, 3, 2, 1].map((each, i) => (
          <progress
            key={i}
            className="w-[127px] h-2 
              [&::-webkit-progress-bar]:rounded-lg 
              [&::-webkit-progress-value]:rounded-lg   
              [&::-webkit-progress-bar]:bg-[#D9D9D9] 
              [&::-webkit-progress-value]:bg-[#0866FF]  
              [&::-moz-progress-bar]:bg-[#0866FF]"
            value={(each * val) / 5}
            max={5}
          />
        ))}
      </>
    );
  }

  return {
    show: (
      val: number,
      obj?: { full?: ReactNode; half?: ReactNode; empty?: ReactNode }
    ) => {
      return (
        <ShowRatings
          val={val}
          full={obj?.full}
          half={obj?.half}
          empty={obj?.empty}
        />
      );
    },
    bars: (val: number) => {
      return <ShowProgressBars val={val} />;
    },
  };
};

export default useRatings;
