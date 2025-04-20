"use client";

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface BackgroundProps {
  children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.bg} transition-colors duration-700`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen relative overflow-hidden"
      >
        {/* Modern gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs that move slowly for a subtle effect */}
          <motion.div
            animate={{
              x: ["-15%", "-5%", "-12%"],
              y: ["-10%", "-20%", "-8%"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute top-0 left-0 w-2/3 h-2/3 ${theme.accent1} opacity-[0.03] rounded-full blur-3xl`}
          />

          <motion.div
            animate={{
              x: ["15%", "5%", "10%"],
              y: ["10%", "20%", "5%"],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute bottom-0 right-0 w-3/4 h-3/4 ${theme.accent2} opacity-[0.025] rounded-full blur-3xl`}
          />

          {/* Additional subtle elements for visual depth */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1.02, 1],
              opacity: [0.01, 0.02, 0.01, 0.005],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute top-1/3 right-1/4 w-32 h-32 ${theme.accent1} rounded-full blur-2xl`}
          />

          <motion.div
            animate={{
              scale: [1, 0.95, 1.05, 1],
              opacity: [0.01, 0.02, 0.015, 0.01],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute bottom-1/3 left-1/4 w-40 h-40 ${theme.accent2} rounded-full blur-2xl`}
          />
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default Background;
