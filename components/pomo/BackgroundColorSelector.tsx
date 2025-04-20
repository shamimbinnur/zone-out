"use client";

import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoColorPaletteOutline } from "react-icons/io5";
import * as Popover from "@radix-ui/react-popover";

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
    name: "Green Forest",
    bg: "bg-midnight-moss",
    textPrimary: "text-white",
    textSecondary: "text-moonlit-silver",
    accent1: "bg-turquoise-tide",
    accent2: "bg-evergreen-meadow",
    timerBg: "bg-shadowy-forest",
    buttonBg: "bg-shadowy-forest",
    border: "border-evergreen-meadow",
  },
  {
    name: "Midnight Blue",
    bg: "bg-indigo-950",
    textPrimary: "text-white",
    textSecondary: "text-blue-200",
    accent1: "bg-blue-500",
    accent2: "bg-indigo-400",
    timerBg: "bg-indigo-900",
    buttonBg: "bg-indigo-900",
    border: "border-indigo-400",
  },
  {
    name: "Dark Cherry",
    bg: "bg-rose-950",
    textPrimary: "text-white",
    textSecondary: "text-rose-200",
    accent1: "bg-rose-500",
    accent2: "bg-pink-400",
    timerBg: "bg-rose-900",
    buttonBg: "bg-rose-900",
    border: "border-pink-400",
  },
  {
    name: "Mocha",
    bg: "bg-amber-950",
    textPrimary: "text-white",
    textSecondary: "text-amber-200",
    accent1: "bg-amber-500",
    accent2: "bg-yellow-600",
    timerBg: "bg-amber-900",
    buttonBg: "bg-amber-900",
    border: "border-yellow-600",
  },
  {
    name: "Deep Purple",
    bg: "bg-purple-950",
    textPrimary: "text-white",
    textSecondary: "text-purple-200",
    accent1: "bg-purple-500",
    accent2: "bg-fuchsia-400",
    timerBg: "bg-purple-900",
    buttonBg: "bg-purple-900",
    border: "border-fuchsia-400",
  },
  {
    name: "Dark Teal",
    bg: "bg-teal-950",
    textPrimary: "text-white",
    textSecondary: "text-teal-200",
    accent1: "bg-teal-500",
    accent2: "bg-cyan-400",
    timerBg: "bg-teal-900",
    buttonBg: "bg-teal-900",
    border: "border-cyan-400",
  },
  {
    name: "Light Mode",
    bg: "bg-gray-100",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    accent1: "bg-emerald-500",
    accent2: "bg-emerald-600",
    timerBg: "bg-white",
    buttonBg: "bg-white",
    border: "border-emerald-300",
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

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 text-moonlit-silver hover:text-white transition-colors"
          aria-label="Select theme color"
          title="Select theme color"
        >
          <IoColorPaletteOutline className="text-xl" />
        </motion.button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="rounded-lg p-3 w-[260px] bg-black bg-opacity-80 backdrop-blur-md shadow-xl"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm font-medium mb-1">
              Choose theme
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {themeColors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(color)}
                  className={`${color.bg} w-full h-16 rounded-md relative overflow-hidden transition-all border`}
                  title={color.name}
                  aria-label={`Select ${color.name} theme`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {currentTheme.name === color.name ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`${color.accent1} w-4 h-4 rounded-full mb-1 shadow-md`}
                      />
                    ) : (
                      <div
                        className={`${color.accent1} w-3 h-3 rounded-full opacity-80 mb-1`}
                      />
                    )}
                    <div
                      className={`text-xs font-medium ${color.textPrimary} truncate max-w-full px-1`}
                    >
                      {color.name === "Light Mode"
                        ? "Light"
                        : color.name.split(" ")[0]}
                    </div>
                  </div>
                  <span className="sr-only">{color.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <Popover.Arrow className="fill-black fill-opacity-80" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default BackgroundColorSelector;
