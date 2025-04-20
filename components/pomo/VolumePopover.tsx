import * as Popover from "@radix-ui/react-popover";
import { FC, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeOff,
  FaVolumeXmark,
} from "react-icons/fa6";
import RangeSlider from "./RangeSlider";
import { useTheme } from "@/contexts/ThemeContext";

interface VolumePopoverProps {
  volume: number;
  setVolume: (value: number) => void;
}

const VolumePopover: FC<VolumePopoverProps> = ({ volume, setVolume }) => {
  const { theme } = useTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Format volume as percentage
  const volumePercentage = Math.round(volume * 100);

  // Toggle mute functionality
  const toggleMute = useCallback(() => {
    setVolume(volume > 0 ? 0 : 0.5); // If currently muted, set to 50%
  }, [volume, setVolume]);

  // Choose the appropriate volume icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeXmark />;
    if (volume < 0.3) return <FaVolumeOff />;
    if (volume < 0.7) return <FaVolumeLow />;
    return <FaVolumeHigh />;
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <motion.button
          ref={triggerRef}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={volume === 0 ? "Unmute" : "Volume Control"}
          title={`Volume: ${volumePercentage}%`}
          onClick={toggleMute}
          className={`ml-2 text-base ${theme.textSecondary} text-full focus:outline-none focus:ring-1 focus:ring-opacity-50 rounded-full p-1`}
        >
          {getVolumeIcon()}
        </motion.button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl px-2 py-1 w-40 mr-2 bg-black bg-opacity-80 backdrop-blur-sm shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={10}
          aria-label="Volume slider"
        >
          <div title={`Volume: ${volumePercentage}%`} className="py-2">
            <RangeSlider volume={volume} setVolume={setVolume} />
          </div>
          <Popover.Arrow className="fill-black fill-opacity-80" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default VolumePopover;
