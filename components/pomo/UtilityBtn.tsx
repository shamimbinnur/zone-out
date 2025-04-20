import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { useTheme } from "@/contexts/ThemeContext";

interface UtilityBtnProps {
  isVisible: boolean;
  increaseMinutes: () => void;
  decreaseMinutes: () => void;
  resetTimer: () => void;
}

const UtilityBtn: FC<UtilityBtnProps> = ({
  isVisible,
  increaseMinutes,
  decreaseMinutes,
  resetTimer,
}) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full absolute justify-between flex gap-2"
        >
          <div className="flex gap-1">
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={"Increase minutes"}
              onClick={increaseMinutes}
              className={`${theme.accent1} bg-opacity-65 focus:outline-none h-[18px] w-6 cursor-pointer sm:text-lg transition-colors duration-300 ${theme.textPrimary} rounded-l-lg flex items-center justify-center`}
            >
              <motion.div
                animate={{ rotate: isVisible ? 0 : 90 }}
                transition={{ duration: 0.5 }}
              >
                <IoMdAdd />
              </motion.div>
              <span className="sr-only">Increase time</span>
            </motion.button>

            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={"Decrease minutes"}
              onClick={decreaseMinutes}
              className={`${theme.accent1} bg-opacity-65 focus:outline-none h-[18px] w-6 cursor-pointer sm:text-lg transition-colors duration-300 ${theme.textPrimary} rounded-r-lg flex items-center justify-center`}
            >
              <IoMdRemove className="ease-out transition duration-500" />
              <span className="sr-only">Decrease time</span>
            </motion.button>
          </div>

          <div>
            <motion.button
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={"Reset timer"}
              onClick={resetTimer}
              className={`${theme.accent2} focus:outline-none h-5 w-8 cursor-pointer bg-opacity-65 sm:text-sm transition-colors duration-300 ${theme.textSecondary} rounded-lg flex items-center justify-center`}
            >
              <GrPowerReset className="-rotate-180" />
              <span className="sr-only">Reset timer</span>
            </motion.button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default UtilityBtn;
