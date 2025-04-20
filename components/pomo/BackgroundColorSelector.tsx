"use client";

import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export type ThemeColor = {
  name: string;
  bg: string;
  textPrimary: string;
  textSecondary: string;
  accent1: string;
  accent2: string;
  timerBg: string;
  buttonBg: string;
  border: string;
};

export const themeColors: ThemeColor[] = [
  {
    name: "Dark",
    bg: "bg-slate-900",
    textPrimary: "text-white",
    textSecondary: "text-slate-300",
    accent1: "bg-indigo-500",
    accent2: "bg-violet-600",
    timerBg: "bg-slate-800",
    buttonBg: "bg-slate-800",
    border: "border-slate-700",
  },
  {
    name: "Light",
    bg: "bg-gray-50",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    accent1: "bg-indigo-500",
    accent2: "bg-violet-500",
    timerBg: "bg-white",
    buttonBg: "bg-white",
    border: "border-gray-200",
  },
];

interface BackgroundColorSelectorProps {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const BackgroundColorSelector: FC<BackgroundColorSelectorProps> = ({
  currentTheme,
  setTheme,
}) => {
  // Save selected theme to localStorage
  useEffect(() => {
    localStorage.setItem("pomodoro-theme", currentTheme.name);
  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme =
      currentTheme.name === "Dark" ? themeColors[1] : themeColors[0];
    setTheme(newTheme);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:text-white transition-colors"
      aria-label={`Switch to ${
        currentTheme.name === "Dark" ? "Light" : "Dark"
      } theme`}
      title={`Switch to ${
        currentTheme.name === "Dark" ? "Light" : "Dark"
      } theme`}
    >
      {currentTheme.name === "Dark" ? (
        <HiOutlineSun className="text-xl text-slate-300" />
      ) : (
        <HiOutlineMoon className="text-xl text-gray-600" />
      )}
    </motion.button>
  );
};

export default BackgroundColorSelector;
