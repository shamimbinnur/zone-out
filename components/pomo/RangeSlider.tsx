import { FC, useCallback } from "react";
import * as Slider from "@radix-ui/react-slider";

interface RangeSliderProps {
  volume: number;
  setVolume: (value: number) => void;
}

const RangeSlider: FC<RangeSliderProps> = ({ volume, setVolume }) => {
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
        <Slider.Track className="bg-moonlit-silver relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-turquoise-tide rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-turquoise-tide shadow-[0_2px_10px] shadow-black/20 rounded-[10px] hover:bg-turquoise-tide/90 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-turquoise-tide/30 transition-colors"
          aria-label={`Volume: ${volumePercentage}%`}
        />
      </Slider.Root>

      {/* Visually hidden label for screen readers */}
      <div className="sr-only">Volume: {volumePercentage}%</div>
    </form>
  );
};

export default RangeSlider;
