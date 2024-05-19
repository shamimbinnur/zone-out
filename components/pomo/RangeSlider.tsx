import { FC } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface RangeSliderProps {
  volume: number;
  setVolume: (value: number) => void;
}

const RangeSlider: FC <RangeSliderProps> = ({
  volume,
  setVolume
}) => (
  <form>
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[volume]}
      min={0}
      max={1}
      step={0.01}
      onValueChange={(value) => setVolume(value[0])}
    >
      <Slider.Track className="bg-moonlit-silver relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-turquoise-tide rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-4 h-4 bg-turquoise-tide shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
        aria-label="Volume"
      />
    </Slider.Root>
  </form>
);

export default RangeSlider;