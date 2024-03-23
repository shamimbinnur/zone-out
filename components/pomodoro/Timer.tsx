"use client"

import useTimer from '@/hooks/useTimer'
import React from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

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

  return (
    <section className="h-[calc(100vh)] sm:h-[calc(100vh)] px-8 flex flex-col pt-20 gap-y-16 sm:justify-center items-center">
      <p className="text-out-green-200"> <span className="text-3xl font-bold">+{counter} </span> <span className="text-xl sm:text-2xl">pomodoro</span></p>

      <div className="max-w-[660px] px-10 py-8 flex justify-center rounded-[52px] relative">
        <div className="h-full w-full rounded-[42px] sm:rounded-[52px] absolute top-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-out-green-600 border border-out-green-200 to-out-green-400 drop-shadow-md"></div>
        <div className="flex flex-col relative items-center">
          <div className="w-full pb-2 flex justify-between">
            {!isActive && 
            <div onClick={increaseMinutes} className="bg-out-green-200 hover:rotate-180 ml-[80px] sm:ml-[190px] bg-opacity-30 p-1 cursor-pointer sm:text-xl border-out-green-200 hover:text-white transition-all duration-150 ease-in text-out-green-800 hover:bg-opacity-50 rounded-full flex items-center justify-center">
              <IoMdAdd className="pointer-events-none"/>
            </div>}

            {!isActive &&
            <div onClick={resetTimer} className="bg-out-green-200 -rotate-180 hover:rotate-0 bg-opacity-30 p-1 cursor-pointer sm:text-xl hover:text-white transition-all duration-150 ease-in text-out-green-800 hover:bg-opacity-50 rounded-full flex items-center justify-center">
              <GrPowerReset className=" pointer-events-none"/>
            </div>}
          </div>

          <div className="flex gap-8 overflow-hidden justify-start items-center cursor-default">
            <div>
              <p className="sm:text-[182px] sm:w-56 text-7xl font-medium text-white">{min < 10 ? `0${min}` : min}</p>
            </div>
            
            <div className="bg-out-green-200 h-[90px] rounded-sm w-[4px]">
            </div>

            <div>
            <p className="sm:text-[182px] text-7xl sm:w-56 font-medium text-white">{secs < 10 ? `0${secs}` : secs}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-out-green-1000 transition-all text-sm sm:text-base font-bold text-out-green-200 py-2 flex items-center justify-center gap-5 sm:gap-x-7 px-7 rounded-[52px]">
          {!isActive && 
          <button onClick={startLongBreak} >
            Long Break
          </button>}

          <button onClick={toggleTimer} className="text-xl sm:text-3xl">
            {isActive ? "Pause" : "Start"}
          </button>

          {!isActive &&
          <button onClick={startShortBreak} >
            Short Break
          </button>}
        </div>
      </div>
    </section>
  )
}

export default Timer