import * as Popover from '@radix-ui/react-popover';
import { FC, useRef } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import RangeSlider from './RangeSlider';

interface VolumePopoverProps {
  volume: number;
  setVolume: (value: number) => void;
}

const VolumePopover: FC <VolumePopoverProps> = ({
  volume,
  setVolume
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          ref={triggerRef}
          aria-label="Volume Control"
          title={"Volume: " +(volume*100).toFixed() + " %"}
          className="ml-2 text-base text-moonlit-silver text-full"
        >
          { volume === 0 ? <FaVolumeXmark /> : <FaVolumeHigh /> }
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl px-2 py-1 w-40 mr-2 bg-black will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={10}
        >
          <div 
            title={"Volume: " +(volume*100).toFixed() + " %"}
          >
            <RangeSlider volume={volume} setVolume={setVolume} />
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default VolumePopover;