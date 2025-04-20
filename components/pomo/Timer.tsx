"use client";

import "./timer.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { makeSound } from "@/utils/audio";
import useTimer, { Status } from "@/hooks/useTimer";
import { useTheme } from "@/contexts/ThemeContext";

import ActionBtnGroup from "./ActionBtnGroup";
import DocTitle from "../common/DocTitle";
import Progressbar from "./Progressbar";
import UtilityBtn from "./UtilityBtn";

const Timer = () => {
  const { theme } = useTheme();
  const {
    secs,
    min,
    status,
    isActive,
    isPromoComplete,
    pomoCount,
    shortCount,
    longCount,
    resetTimer,
    toggleTimer,
    pauseTimer,
    increaseMinutes,
    decreaseMinutes,
    toggleShortBreak,
    toggleLongBreak,
  } = useTimer();

  const [isVisible, setIsVisible] = useState(false);

  const timerMode =
    status === Status.POMO
      ? "Pomodoro"
      : status === Status.SHORT
      ? "Short Break"
      : "Long Break";

  const handleButtonText = () => {
    return isActive ? "Pause" : isPromoComplete ? "Restart" : "Start";
  };

  // Toggle visibility of utility buttons based on timer state
  useEffect(() => {
    setIsVisible(!isActive);
  }, [isActive]);

  // Update document title with timer state
  useEffect(() => {
    document.title = isActive
      ? `${min}:${secs < 10 ? `0${secs}` : secs} (${timerMode})`
      : "Pomodoro Timer";
  }, [isActive, min, secs, timerMode]);

  // Play sound when timer completes
  useEffect(() => {
    if (min === 0 && secs === 0) {
      makeSound("HEADS-UP");
    }
  }, [min, secs]);

  // Warn user before leaving the page if timer is active
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      const isActiveAndImportant =
        isActive || pomoCount > 0 || (min !== 25 && secs < 57);
      if (isActiveAndImportant) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [isActive, pomoCount, secs, min]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        increaseMinutes();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        decreaseMinutes();
      } else if (event.key === "r" || event.key === "R") {
        resetTimer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [increaseMinutes, decreaseMinutes, resetTimer]);

  // Number animation variants
  const numberVariants = {
    inactive: {
      y: 0,
      transition: { duration: 0.3 },
    },
    active: {
      y: "-8%",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <DocTitle documentTitle={`${min}:${secs < 10 ? `0${secs}` : secs}`} />
      <section className="timerMinHeight px-8 flex flex-col justify-center gap-y-20 items-center">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Progressbar completed={pomoCount} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className={`
            max-w-[660px] scale-95 _410:scale-100 
            px-10 py-8 flex justify-center 
            ${theme.timerBg} 
            border ${theme.border}
            shadow-lg backdrop-blur-md
            rounded-3xl sm:rounded-[52px] 
            relative
            transition-all duration-500
            hover:shadow-xl
          `}
        >
          <div className="flex flex-col relative items-center">
            <UtilityBtn
              isVisible={isVisible}
              increaseMinutes={increaseMinutes}
              decreaseMinutes={decreaseMinutes}
              resetTimer={resetTimer}
            />

            <motion.div
              variants={numberVariants}
              animate={isActive ? "active" : "inactive"}
              className="flex gap-8 transition-all my-6 sm:my-4 leading-none select-none overflow-hidden justify-start items-center cursor-default"
            >
              <div>
                <motion.p
                  className={`sm:text-[182px] sm:w-56 text-[90px] font-semibold sm:font-medium ${theme.textPrimary}`}
                  key={`min-${min}`}
                  initial={{ opacity: 0.7, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {min < 10 ? `0${min}` : min}
                </motion.p>
              </div>

              <div>
                <motion.p
                  className={`sm:text-[182px] sm:w-56 text-[90px] font-semibold sm:font-medium ${theme.textPrimary}`}
                  key={`sec-${secs}`}
                  initial={{ opacity: 0.7, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {secs < 10 ? `0${secs}` : secs}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ActionBtnGroup
            toggleShortBreak={toggleShortBreak}
            toggleLongBreak={toggleLongBreak}
            toggleTimer={toggleTimer}
            handleButtonText={handleButtonText}
            isActive={isActive}
            pauseTimer={pauseTimer}
            pomoCount={pomoCount}
            shortCount={shortCount}
            longCount={longCount}
            status={status}
          />
        </motion.div>
      </section>
    </>
  );
};

export default Timer;
