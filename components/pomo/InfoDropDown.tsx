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
        className="rounded-lg p-1.5 inline-flex items-center text-white border border-white border-opacity-980 justify-center bg-out-green-1000 bg-opacity-50 cursor-cursor outline-none"
        aria-label="Shortcuts info"
      >
        <MdKeyboardCommandKey />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="rounded-xl p-5 w-[300px] mr-2 bg-white opacity-90 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(#2A7E3B)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={10}
      >
        <div className="flex items-center border-b-2 border-gray-300 pb-2 gap-x-2">
          <MdKeyboardCommandKey className="text-sm" />
          <p className="text-gray-700 text-sm font-medium">Hotkeys</p>
         
        </div>

        <div className="pt-3 flex flex-col justify-center gap-y-3">
          <div className="flex justify-between bg-out-green-800 bg-opacity-30 p-2 rounded-md">
            <p className="text-gray-700 text-sm font-medium ">Start, resume: </p>
            <p className="text-gray-700 flex items-center gap-x-1 text-sm font-medium ">
              <span><PiKeyReturn /></span>
              Enter
            </p>
          </div>

          <div className="flex justify-between bg-out-green-800 bg-opacity-30 p-2 rounded-md">
            <p className="text-gray-700 text-sm font-medium ">Reset timer: </p>
            <p className="text-gray-700 flex items-center gap-x-1 text-sm font-medium ">
              <span><TbSquareRoundedLetterR /></span>
              R key
            </p>
          </div>

          <div className="flex justify-between bg-out-green-800 bg-opacity-30 p-2 rounded-md">
            <p className="text-gray-700 text-sm font-medium ">Edit timer: </p>
            <p className="text-gray-700 flex items-center gap-x-1 text-sm font-medium ">
              <span><TbCaretUpDown /></span>
              Up, down keys
            </p>
          </div>

          <div className="flex justify-between bg-out-green-800 bg-opacity-30 p-2 rounded-md">
            <p className="text-gray-700 text-sm font-medium ">Switch buttons: </p>
            <p className="text-gray-700 flex items-center gap-x-1 text-sm font-medium ">
              <span><TbCaretLeftRight /></span>
              Left, right keys
            </p>
          </div>

        </div>
        <Popover.Close
          className="rounded-full h-5 w-5 inline-flex items-center justify-center text-out-green-800 absolute top-[18px] right-[14px] hover:bg-out-green-200 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-out-green-800 outline-none cursor-pointer"
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