import React, { useRef, useEffect } from "react";

interface AutoScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // pixels per second
  className?: string;
}

const AutoScroll: React.FC<AutoScrollProps> = ({
  children,
  direction = "left",
  speed = 50,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
 const animationRef = useRef<number | null>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!isHovered.current) { // 👈 only move if NOT hovered
        const distance = (elapsed / 1000) * speed;
        if (direction === "left") {
          container.scrollLeft = distance % scroll.scrollWidth;
        } else {
          container.scrollLeft =
            scroll.scrollWidth -
            (distance % scroll.scrollWidth);
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <div ref={scrollRef} className="flex gap-[30px] lg:gap-[106px] whitespace-nowrap will-change-transform">
        {children}
        {children} {/* duplicate for infinite effect */}
      </div>
    </div>
  );
};

export default AutoScroll;
