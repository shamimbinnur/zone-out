"use client"

import useTimer from '@/hooks/useTimer'
import { useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { animated } from '@react-spring/web'

const Timer = () => {
  const {
    min,
    secs,
    isActive,
    counter,
    startShortBreak,
    startLongBreak,
    toggleTimer,
    resetTimer,
    increaseMinutes
  } = useTimer()

  const [isResetBtnVisible, setIsResetBtnVisible] = useState(false)

  const resetBtnAnimationProps = useSpring({
    opacity: isResetBtnVisible ? 1 : 0,
    transform: isResetBtnVisible ? 'translateY(0)' : 'translateY(-40%)',
    config: { 
      duration: 100,
      transition: 'ease-in'
     },
  });

  const timerContainerAnimationProps = useSpring({
    transform: isActive ? 'translateY(0)' : 'translateY(8%)',
    config: {
      duration: 100,
      transition: 'ease-in-out'
    },
    from: {
      transform: 'translateY(0)',
    }
  })

  const timePillContainer = useSpring({
    opacity: isActive ? 0 : 1,
    config: {
      duration: 100,
      transition: 'ease-in-out'
    },
    from: {
      opacity: 0
    }
  })

  useEffect(() => {
    if (isActive) {
      setIsResetBtnVisible(false)
    } else {
      setIsResetBtnVisible(true)
    }
  }, [isActive])

  const stAr=["25","50","75","100"]

  return (
    <section className="h-[calc(100vh)] sm:h-[calc(100vh)] px-8 flex flex-col pt-36 sm:pt-18 gap-y-16 sm:justify-center items-center">
      <animated.div
      style={timePillContainer}
      className="flex gap-x-3">
        {
          stAr.map((item, index) => (
            <div key={item} className={
              `py-1 w-8 flex justify-center items-center pointer-events-none text-out-green-600 font-bold rounded-full bg-white opacity-10 ${index+1 <= counter ? "opacity-70 text-out-green-1000" : ""}`
            }>
              <p className="text-xs">{item}</p>
            </div>
          ))
        } 
      </animated.div>

      <div className="max-w-[660px] px-10 py-9 flex justify-center rounded-[52px] relative">
        <div className="h-full w-full rounded-[42px] sm:rounded-[52px] absolute top-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-out-green-600 border border-out-green-200 to-out-green-400 drop-shadow-md"></div>
        <div className="flex flex-col relative items-center">
          <div className="w-full absolute -top-3 flex justify-between">
            <animated.div
            style={resetBtnAnimationProps}
            onClick={increaseMinutes}
            className="bg-out-green-200 hover:rotate-180 bg-opacity-30 p-1 cursor-pointer sm:text-xl border-out-green-200 hover:text-white transition-all duration-150 ease-in text-out-green-800 sm:hover:bg-opacity-50 rounded-full flex items-center justify-center">
              <IoMdAdd className="pointer-events-none"/>
            </animated.div>

            <animated.div
            style={resetBtnAnimationProps}
            onClick={resetTimer}
            className="bg-out-green-200 -rotate-180 hover:rotate-0 bg-opacity-30 p-1 cursor-pointer sm:text-xl sm:hover:text-white transition-all duration-150 ease-in text-out-green-800 hover:bg-opacity-50 rounded-full flex items-center justify-center">
              <GrPowerReset className=" pointer-events-none"/>
            </animated.div>
          </div>

          <animated.div
          style={timerContainerAnimationProps}
          className="flex gap-8 transition-all overflow-hidden justify-start items-center cursor-default">
            <div>
              <p className="sm:text-[182px] sm:w-56 text-[90px] font-semibold sm:font-medium text-white">{min < 10 ? `0${min}` : min}</p>
            </div>
            
            <div className="bg-out-green-200 h-[90px] rounded-sm w-[4px]">
            </div>

            <div>
            <p className="sm:text-[182px] text-8xl sm:w-56 text-[90px] font-semibold sm:font-medium text-white">{secs < 10 ? `0${secs}` : secs}</p>
            </div>
          </animated.div>
        </div>
      </div>

      <div>
        <animated.div
        className="bg-out-green-1000 transition-all text-sm sm:text-base font-bold text-out-green-200 py-2 flex items-center justify-center gap-5 sm:gap-x-7 px-7 rounded-[52px]">
          {!isActive && 
          <button onClick={startLongBreak} >
            Long Break
          </button>}

          <button onClick={toggleTimer} className="text-xl sm:text-3xl">
            {isActive ? "Pause" : "Start"}
            {isActive && <span className="animate-pulse">.</span>}
          </button>

          {!isActive &&
          <button onClick={startShortBreak} >
            Short Break
          </button>}
        </animated.div>
      </div>
    </section>
  )
}

export default Timer