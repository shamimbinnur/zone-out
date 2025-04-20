"use client";

import { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const ScrollToTop = () => {
  const { theme } = useTheme();
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
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isScrolledDown && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Try Pomodoro Timer"
          onClick={handleClick}
          className={`
          fixed bottom-6 right-8
          flex gap-x-2 items-center justify-center
          duration-300 ease-in-out z-50
          ${theme.accent1} px-3 py-1 rounded-xl
          font-semibold ${theme.textPrimary} shadow-lg
          transition-colors duration-300`}
        >
          <LuAlarmClock size={18} />
          Try now!
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
