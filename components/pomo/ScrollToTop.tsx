"use client"

import { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";

const ScrollToTop = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      aria-label="Try Pomodoro Timer"
      onClick={handleClick}
      className={`
      fixed bottom-6 right-8 transition-opacity
      flex gap-x-2 items-center justify-center
      duration-300 ease-in-out z-50
      bg-red-600 px-3 py-1 rounded-xl
      font-semibold text-white
      ${isScrolledDown ? "opacity-100" : "opacity-0"}`
      }
    > 
      <LuAlarmClock size={18} />
      Try now!
    </button>
  );
};

export default ScrollToTop;
