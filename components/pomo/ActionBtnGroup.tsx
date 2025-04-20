"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { FaPause, FaWalking } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CiCoffeeCup } from "react-icons/ci";
import { Status } from "@/hooks/useTimer";
import { useTheme } from "@/contexts/ThemeContext";

export enum ButtonPosition {
  LEFT = -1,
  MIDDLE = 0,
  RIGHT = 1,
}

interface ActionBtnGroupProps {
  toggleShortBreak: () => void;
  toggleLongBreak: () => void;
  toggleTimer: () => void;
  isActive: boolean;
  handleButtonText: () => string;
  pauseTimer: () => void;
  pomoCount: number;
  shortCount: number;
  longCount: number;
  status: Status;
}

const ActionBtnGroup: FC<ActionBtnGroupProps> = ({
  toggleShortBreak,
  toggleLongBreak,
  toggleTimer,
  isActive,
  pauseTimer,
  status,
  pomoCount,
  shortCount,
  longCount,
}) => {
  const { theme } = useTheme();
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(
    ButtonPosition.MIDDLE
  );
  const [xPosition, setXPosition] = useState(0);

  // Define animation variants
  const pillVariants = {
    active: {
      scaleX: 0.2,
      scaleY: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    inactive: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const pauseButtonVariants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const arrowButtonVariants = {
    visible: { opacity: 1, transition: { duration: 0.2 } },
    hidden: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Handle left button click (long break)
  const handleLeftButtonClick = useCallback(() => {
    if (buttonPosition === ButtonPosition.MIDDLE) {
      setXPosition(155);
      setButtonPosition(ButtonPosition.LEFT);
    } else if (buttonPosition === ButtonPosition.LEFT) {
      // Visual feedback for already selected button
      setXPosition((prev) => prev - 5);
      setTimeout(() => setXPosition(155), 200);
    } else if (buttonPosition === ButtonPosition.RIGHT) {
      setXPosition(0);
      setButtonPosition(ButtonPosition.MIDDLE);
    }
  }, [buttonPosition]);

  // Handle right button click (short break)
  const handleRightButtonClick = useCallback(() => {
    if (buttonPosition === ButtonPosition.MIDDLE) {
      setXPosition(-155);
      setButtonPosition(ButtonPosition.RIGHT);
    } else if (buttonPosition === ButtonPosition.RIGHT) {
      // Visual feedback for already selected button
      setXPosition((prev) => prev + 5);
      setTimeout(() => setXPosition(-155), 200);
    } else if (buttonPosition === ButtonPosition.LEFT) {
      setXPosition(0);
      setButtonPosition(ButtonPosition.MIDDLE);
    }
  }, [buttonPosition]);

  // Move button to short break position when a pomodoro is completed
  useEffect(() => {
    if (pomoCount > 0 && pomoCount < 4) {
      handleRightButtonClick();
    } else if (pomoCount === 4) {
      handleLeftButtonClick();
    }
  }, [pomoCount, handleRightButtonClick, handleLeftButtonClick]);

  // Update button position when break status changes
  useEffect(() => {
    if (status === Status.SHORT) {
      handleLeftButtonClick();
    } else if (status === Status.LONG) {
      handleRightButtonClick();
    }
  }, [
    shortCount,
    longCount,
    status,
    handleLeftButtonClick,
    handleRightButtonClick,
  ]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleRightButtonClick();
      }
      if (event.key === "ArrowLeft") {
        handleLeftButtonClick();
      }
      if (event.key === "Enter") {
        if (buttonPosition === ButtonPosition.LEFT) {
          toggleLongBreak();
        } else if (buttonPosition === ButtonPosition.MIDDLE) {
          toggleTimer();
        } else if (buttonPosition === ButtonPosition.RIGHT) {
          toggleShortBreak();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    buttonPosition,
    isActive,
    toggleLongBreak,
    toggleShortBreak,
    toggleTimer,
    handleLeftButtonClick,
    handleRightButtonClick,
  ]);

  return (
    <section className="flex font-archivo relative justify-center items-center gap-x-8">
      {/* Left Arrow Button */}
      <motion.button
        variants={arrowButtonVariants}
        animate={isActive ? "hidden" : "visible"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLeftButtonClick}
        disabled={isActive}
        className={`rounded-full border translate-y-[1px] outline-none
          focus-visible:ring-white focus-visible:ring-opacity-65
          focus-visible:ring border-opacity-20
          ${theme.border} mx-auto ${theme.buttonBg} transition-colors duration-300`}
      >
        <MdArrowLeft className={`${theme.textSecondary} text-3xl scale-125`} />
        <span className="sr-only">Previous option</span>
      </motion.button>

      {/* Pill Container with Timer Options */}
      <motion.div
        variants={pillVariants}
        animate={isActive ? "active" : "inactive"}
        className={`w-[160px] py-1 border border-opacity-20 ${theme.border} mx-auto ${theme.buttonBg} rounded-[52px] overflow-x-hidden transition-colors duration-300`}
      >
        <motion.div
          animate={{ x: xPosition }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="select-none mx-auto text-base font-bold flex items-center justify-center gap-x-14"
        >
          {/* Long Break Button */}
          <motion.button
            whileHover={
              buttonPosition === ButtonPosition.LEFT ? { scale: 1.05 } : {}
            }
            whileTap={
              buttonPosition === ButtonPosition.LEFT ? { scale: 0.95 } : {}
            }
            disabled={buttonPosition !== ButtonPosition.LEFT}
            className={`text-nowrap flex ${
              buttonPosition === ButtonPosition.LEFT
                ? theme.textPrimary
                : theme.textSecondary
            }
              transform transition-all
              outline-none focus-visible:text-white
              items-center gap-1`}
            onClick={toggleLongBreak}
          >
            <FaWalking className="text-lg" />
            Long break
          </motion.button>

          {/* Start/Pause Button */}
          <motion.button
            whileHover={
              buttonPosition === ButtonPosition.MIDDLE ? { scale: 1.05 } : {}
            }
            whileTap={
              buttonPosition === ButtonPosition.MIDDLE ? { scale: 0.95 } : {}
            }
            disabled={buttonPosition !== ButtonPosition.MIDDLE || isActive}
            onClick={toggleTimer}
            className={`text-2xl flex items-center ${
              buttonPosition === ButtonPosition.MIDDLE
                ? theme.textPrimary
                : theme.textSecondary
            }
              transform transition-all outline-none
              focus-visible:text-white rounded-lg
              justify-center gap-2`}
          >
            <BsStars className="text-xl" />
            Start
          </motion.button>

          {/* Short Break Button */}
          <motion.button
            whileHover={
              buttonPosition === ButtonPosition.RIGHT ? { scale: 1.05 } : {}
            }
            whileTap={
              buttonPosition === ButtonPosition.RIGHT ? { scale: 0.95 } : {}
            }
            disabled={buttonPosition !== ButtonPosition.RIGHT}
            className={`text-nowrap flex items-center ${
              buttonPosition === ButtonPosition.RIGHT
                ? theme.textPrimary
                : theme.textSecondary
            }
              transform transition-all outline-none
              focus-visible:text-white gap-1`}
            onClick={toggleShortBreak}
          >
            <CiCoffeeCup className="text-lg" />
            Short break
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Arrow Button */}
      <motion.button
        variants={arrowButtonVariants}
        animate={isActive ? "hidden" : "visible"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRightButtonClick}
        disabled={isActive}
        className={`rounded-full border translate-y-[1px]
          border-opacity-20 ${theme.border} mx-auto ${theme.buttonBg}
          flex items-center justify-center
          outline-none focus-visible:ring-white focus-visible:ring-opacity-65
          focus-visible:ring transition-colors duration-300`}
      >
        <MdArrowRight className={`${theme.textSecondary} text-3xl scale-125`} />
        <span className="sr-only">Next option</span>
      </motion.button>

      {/* Pause Button */}
      <AnimatePresence>
        {isActive && (
          <motion.button
            key="pause-button"
            variants={pauseButtonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={pauseTimer}
            className={`${theme.buttonBg} border border-opacity-20 ${theme.border} rounded-full absolute text-sm p-4 ${theme.textPrimary} transition-colors duration-300`}
          >
            <FaPause />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ActionBtnGroup;
