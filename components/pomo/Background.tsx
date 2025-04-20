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
    <div className={`${theme.bg} transition-colors duration-500`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen relative overflow-hidden"
      >
        {/* Decorative background elements - change opacity based on theme */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: ["-15%", "-5%", "-10%"],
              y: ["-10%", "-20%", "-5%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`absolute top-0 left-0 w-1/2 h-1/2 ${theme.accent1} opacity-[0.03] rounded-full blur-3xl`}
          />
          <motion.div
            animate={{
              x: ["15%", "5%", "10%"],
              y: ["10%", "20%", "5%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`absolute bottom-0 right-0 w-3/4 h-3/4 ${theme.accent2} opacity-[0.02] rounded-full blur-3xl`}
          />

          {/* Additional subtle elements for more visual interest */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1.05, 1],
              opacity: [0.02, 0.03, 0.02, 0.01],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`absolute top-1/3 right-1/4 w-32 h-32 ${theme.accent1} rounded-full blur-2xl`}
          />

          <motion.div
            animate={{
              scale: [1, 0.9, 1.1, 1],
              opacity: [0.01, 0.02, 0.03, 0.01],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
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
