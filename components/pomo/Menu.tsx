"use client";

import { motion } from "framer-motion";
import GitHubStartButton from "../common/GitHubStartButton";
import InfoPopover from "./InfoDropDown";
import BackgroundColorSelector from "./BackgroundColorSelector";
import { useTheme } from "@/contexts/ThemeContext";

const Menu = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute flex items-center w-full justify-end md:justify-between px-8 py-8 z-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GitHubStartButton />
      </motion.div>

      <div className="flex items-center gap-4">
        <BackgroundColorSelector currentTheme={theme} setTheme={setTheme} />
        <InfoPopover />
      </div>
    </motion.div>
  );
};

export default Menu;
