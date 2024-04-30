import { FC } from 'react'
import { animated } from '@react-spring/web'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { GrPowerReset } from 'react-icons/gr'

interface UtilityBtnProps {
  resetBtnAnimationProps: any
  increaseMinutes: () => void
  decreaseMinutes: () => void
  resetTimer: () => void
}

const UtilityBtn:FC<UtilityBtnProps> = ({
  resetBtnAnimationProps,
  increaseMinutes,
  decreaseMinutes,
  resetTimer,
}) => {
  return (
    <section className="w-full absolute justify-between flex gap-2">
      <div className="flex gap-1">
        <animated.button
        title={"Increase minutes"}
        style={resetBtnAnimationProps}
        onClick={increaseMinutes}
        className="bg-out-green-1000 bg-opacity-65 focus:outline-out-green-800 sm:hover:rotate-90 group h-[18px] w-6 cursor-pointer sm:text-lg transition-all duration-150 ease-in text-out-green-200 rounded-l-lg flex items-center justify-center">
          <IoMdAdd className="rotate-90 sm:group-hover:rotate-0 ease-out transition duration-500"/>
          <span className="sr-only">Increase time</span>
        </animated.button>

        <animated.button
        title={"Decrease minutes"}
        style={resetBtnAnimationProps}
        onClick={decreaseMinutes}
        className="bg-out-green-1000 bg-opacity-65 focus:outline-out-green-800 sm:hover:rotate-90 group h-[18px] w-6 cursor-pointer sm:text-lg transition-all duration-150 ease-in text-out-green-200 rounded-r-lg flex items-center justify-center">
          <IoMdRemove className="ease-out transition duration-500"/>
          <span className="sr-only">Decrease time</span>
        </animated.button>
      </div>

      <div>
        <animated.button
        title={"Reset timer"}
        style={resetBtnAnimationProps}
        onClick={resetTimer}
        className="bg-out-green-1000 focus:outline-out-green-800 h-5 w-8 group cursor-pointer bg-opacity-65 sm:text-sm sm:hover:text-white transition-all duration-150 ease-in text-out-green-200 rounded-lg flex items-center justify-center">
          <GrPowerReset className="-rotate-180 sm:group-hover:rotate-0 ease-out transition duration-500"/>
          <span className="sr-only">Reset timer</span>
        </animated.button>
      </div>
    </section>
  )
}

export default UtilityBtn