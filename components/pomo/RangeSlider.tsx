import { FC, useCallback } from "react";
import { motion } from "framer-motion";
import * as Slider from "@radix-ui/react-slider";
import { useTheme } from "@/contexts/ThemeContext";

interface RangeSliderProps {
  volume: number;
  setVolume: (value: number) => void;
}

const RangeSlider: FC<RangeSliderProps> = ({ volume, setVolume }) => {
  const { theme } = useTheme();

  // Format volume as percentage for accessibility
  const volumePercentage = Math.round(volume * 100);

  // Handle volume change with normalized value
  const handleVolumeChange = useCallback(
    (values: number[]) => {
      // Ensure volume is within valid range
      const newVolume = Math.max(0, Math.min(1, values[0]));
      setVolume(newVolume);
    },
    [setVolume]
  );

  return (
    <form>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-10"
        defaultValue={[volume]}
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        aria-label="Volume Control"
        aria-valuetext={`${volumePercentage}%`}
      >
        <Slider.Track
          className={`${theme.textSecondary} bg-opacity-50 relative grow rounded-full h-[3px]`}
        >
          <Slider.Range
            className={`absolute ${theme.accent1} rounded-full h-full`}
          />
        </Slider.Track>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Slider.Thumb
            className={`block w-4 h-4 ${theme.accent1} shadow-[0_2px_10px] shadow-black/20 rounded-[10px] hover:bg-opacity-90 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-opacity-30 transition-colors`}
            aria-label={`Volume: ${volumePercentage}%`}
          />
        </motion.div>
      </Slider.Root>

      {/* Visually hidden label for screen readers */}
      <div className="sr-only">Volume: {volumePercentage}%</div>
    </form>
  );
};

export default RangeSlider;
