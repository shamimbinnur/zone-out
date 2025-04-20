"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const ScrollDownLink = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const requiredContent = searchParams.get("section") === "what_is_pomodoro";

  useEffect(() => {
    requiredContent ? handleInfoClick() : null;
  }, []);

  const handleInfoClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <li>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleInfoClick}
        className={`flex items-center gap-2 ${theme.textSecondary} hover:text-white transition-colors`}
      >
        <FaInfoCircle />
      </motion.button>
    </li>
  );
};

export default ScrollDownLink;
