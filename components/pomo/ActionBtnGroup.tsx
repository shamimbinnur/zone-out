import React, { FC } from 'react'
import { animated } from '@react-spring/web'

interface ActionBtnGroupProps {
  startShortBreak: () => void
  startLongBreak: () => void
  toggleTimer: () => void
  isActive: boolean
  handleButtonText: () => string
}

const ActionBtnGroup:FC<ActionBtnGroupProps> = ({
  startShortBreak,
  startLongBreak,
  toggleTimer,
  isActive,
  handleButtonText
}) => {
  return (
    <div>
      <animated.div
        className="bg-out-green-1000 select-none transition-all text-sm sm:text-base font-bold text-out-green-400 py-2 flex items-center justify-center gap-5 sm:gap-x-7 px-7 rounded-[52px]">
        {!isActive && 
        <button onClick={startLongBreak} >
          Long Break
        </button>}

        <button onClick={toggleTimer} className="text-xl sm:text-3xl">
          {handleButtonText()}
          {isActive && <span className="animate-pulse text-red-500"> .</span>}
        </button>

        {!isActive &&
        <button onClick={startShortBreak} >
          Short Break
        </button>}
      </animated.div>
    </div>
  )
}

export default ActionBtnGroup