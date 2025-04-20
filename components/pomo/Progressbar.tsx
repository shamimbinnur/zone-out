import { FC } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

interface ProgressbarProps {
  completed?: number;
}

const Progressbar: FC<ProgressbarProps> = ({ completed = 0 }) => {
  const { theme } = useTheme();

  return (
    <div className="relative opacity-80 flex justify-center gap-10 items-center">
      {Array.from({ length: 4 }, (_, i) => (
        <Ball
          key={i}
          index={i}
          status={
            i < completed ? "COMPLETE" : i === completed ? "ACTIVE" : "INACTIVE"
          }
        />
      ))}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: completed / 4 }}
        transition={{ duration: 0.5 }}
        className={`w-full h-1 rounded-sm absolute ${theme.accent2} top-50% left-0 origin-left`}
      ></motion.div>
    </div>
  );
};

export default Progressbar;

interface BallProps {
  status?: "COMPLETE" | "ACTIVE" | "INACTIVE";
  index: number;
}

const Ball: FC<BallProps> = ({ status = "INACTIVE", index }) => {
  const { theme } = useTheme();

  // Different entrance animation for each ball
  const ballVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="z-50 flex items-center justify-center rounded-full"
      variants={ballVariants}
      initial="initial"
      animate="animate"
    >
      {status === "COMPLETE" && (
        <motion.div
          className={`w-5 h-5 p-1 ${theme.accent1} flex justify-center items-center rounded-full`}
          initial={{ rotate: -90, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <FaCheck
              className={`${theme.textSecondary} text-md rounded-full`}
            />
          </motion.div>
        </motion.div>
      )}

      {status === "ACTIVE" && (
        <motion.div
          className={`w-5 h-5 p-1 ${theme.accent1} flex justify-center items-center rounded-full`}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(72, 187, 120, 0)",
              "0 0 0 4px rgba(72, 187, 120, 0.3)",
              "0 0 0 0 rgba(72, 187, 120, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className={`w-full h-full ${theme.textSecondary} rounded-full`}
          ></motion.div>
        </motion.div>
      )}

      {status === "INACTIVE" && (
        <div
          className={`w-3 h-3 ${theme.accent1} flex justify-center items-center rounded-full`}
        ></div>
      )}
    </motion.div>
  );
};
