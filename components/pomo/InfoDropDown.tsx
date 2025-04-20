"use client";

import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { MdKeyboardCommandKey } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import {
  TbCaretLeftRight,
  TbCaretUpDown,
  TbSquareRoundedLetterR,
} from "react-icons/tb";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const InfoPopover = () => {
  const { theme } = useTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "MetaLeft" || event.code === "MetaRight") {
        triggerRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <motion.button
          ref={triggerRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`hidden lg:inline-flex rounded-md p-1.5 items-center text-xs ${theme.textSecondary} border ${theme.border} border-opacity-980 justify-center ${theme.buttonBg} cursor-pointer outline-none transition-colors duration-300`}
          aria-label="Shortcuts info"
        >
          <MdKeyboardCommandKey />
        </motion.button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`rounded-xl p-5 w-[300px] mr-2 ${theme.buttonBg} opacity-90 shadow-lg backdrop-blur-md focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(#2A7E3B)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade transition-colors duration-300`}
          sideOffset={10}
        >
          <div
            className={`flex items-center border-b-2 ${theme.border} pb-2 gap-x-2`}
          >
            <MdKeyboardCommandKey
              className={`text-md scale-105 ${theme.textSecondary}`}
            />
            <p className={`${theme.textSecondary} text-md font-medium`}>
              Hotkeys
            </p>
          </div>

          <div className="pt-3 flex flex-col justify-center gap-y-3">
            <div
              className={`flex justify-between ${theme.accent2} bg-opacity-30 p-2 rounded-md`}
            >
              <p className={`${theme.textSecondary} text-sm font-medium`}>
                Start, resume:{" "}
              </p>
              <p
                className={`${theme.textSecondary} flex items-center gap-x-1 text-sm font-medium`}
              >
                <span>
                  <PiKeyReturn />
                </span>
                Enter
              </p>
            </div>

            <div
              className={`flex justify-between ${theme.accent2} bg-opacity-30 p-2 rounded-md`}
            >
              <p className={`${theme.textSecondary} text-sm font-medium`}>
                Reset timer:{" "}
              </p>
              <p
                className={`${theme.textSecondary} flex items-center gap-x-1 text-sm font-medium`}
              >
                <span>
                  <TbSquareRoundedLetterR />
                </span>
                R key
              </p>
            </div>

            <div
              className={`flex justify-between ${theme.accent2} bg-opacity-30 p-2 rounded-md`}
            >
              <p className={`${theme.textSecondary} text-sm font-medium`}>
                Edit timer:{" "}
              </p>
              <p
                className={`${theme.textSecondary} flex items-center gap-x-1 text-sm font-medium`}
              >
                <span>
                  <TbCaretUpDown />
                </span>
                Up, down keys
              </p>
            </div>

            <div
              className={`flex justify-between ${theme.accent2} bg-opacity-30 p-2 rounded-md`}
            >
              <p className={`${theme.textSecondary} text-sm font-medium`}>
                Switch buttons:{" "}
              </p>
              <p
                className={`${theme.textSecondary} flex items-center gap-x-1 text-sm font-medium`}
              >
                <span>
                  <TbCaretLeftRight />
                </span>
                Left, right keys
              </p>
            </div>
          </div>
          <Popover.Close
            className={`rounded-full h-5 w-5 inline-flex items-center justify-center ${theme.textSecondary} absolute top-[18px] right-[14px] hover:bg-opacity-30 hover:${theme.textPrimary} focus:shadow-[0_0_0_2px] focus:shadow-blue-500 outline-none cursor-pointer`}
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className={`fill-${theme.buttonBg}`} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default InfoPopover;
