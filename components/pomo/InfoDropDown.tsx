// index.jsx
"use client"

import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import { MdKeyboardCommandKey } from 'react-icons/md';
import { PiKeyReturn } from 'react-icons/pi';
import { TbCaretLeftRight, TbCaretUpDown, TbSquareRoundedLetterR } from 'react-icons/tb';

const InfoPopover = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="hidden lg:inline-flex rounded-lg p-1.5 items-center text-moonlit-silver border border-moonlit-silver border-opacity-980 justify-center bg-shadowy-forest cursor-cursor outline-none"
        aria-label="Shortcuts info"
      >
        <MdKeyboardCommandKey />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="rounded-xl p-5 w-[300px] mr-2 bg-shadowy-forest opacity-90 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(#2A7E3B)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={10}
      >
        <div className="flex items-center border-b-2 border-moonlit-silver pb-2 gap-x-2">
          <MdKeyboardCommandKey className="text-md scale-105 text-moonlit-silver" />
          <p className="text-moonlit-silver text-md font-medium">Hotkeys</p>
         
        </div>

        <div className="pt-3 flex flex-col justify-center gap-y-3">
          <div className="flex justify-between bg-evergreen-meadow bg-opacity-30 p-2 rounded-md">
            <p className="text-moonlit-silver text-sm font-medium ">Start, resume: </p>
            <p className="text-moonlit-silver flex items-center gap-x-1 text-sm font-medium ">
              <span><PiKeyReturn /></span>
              Enter
            </p>
          </div>

          <div className="flex justify-between bg-evergreen-meadow bg-opacity-30 p-2 rounded-md">
            <p className="text-moonlit-silver text-sm font-medium ">Reset timer: </p>
            <p className="text-moonlit-silver flex items-center gap-x-1 text-sm font-medium ">
              <span><TbSquareRoundedLetterR /></span>
              R key
            </p>
          </div>

          <div className="flex justify-between bg-evergreen-meadow bg-opacity-30 p-2 rounded-md">
            <p className="text-moonlit-silver text-sm font-medium ">Edit timer: </p>
            <p className="text-moonlit-silver flex items-center gap-x-1 text-sm font-medium ">
              <span><TbCaretUpDown /></span>
              Up, down keys
            </p>
          </div>

          <div className="flex justify-between bg-evergreen-meadow bg-opacity-30 p-2 rounded-md">
            <p className="text-moonlit-silver text-sm font-medium ">Switch buttons: </p>
            <p className="text-moonlit-silver flex items-center gap-x-1 text-sm font-medium ">
              <span><TbCaretLeftRight /></span>
              Left, right keys
            </p>
          </div>

        </div>
        <Popover.Close
          className="rounded-full h-5 w-5 inline-flex items-center justify-center text-moonlit-silver absolute top-[18px] right-[14px] hover:bg-shadowy-forest hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-moonlit-silver outline-none cursor-pointer"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default InfoPopover;