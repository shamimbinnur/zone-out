"use client"

import useTimer from '@/hooks/useTimer'
import { useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { animated } from '@react-spring/web'
import ActionBtnGroup from './ActionBtnGroup'
import DocTitle from '../common/DocTitle'
import UtilityBtn from './UtilityBtn'

const Timer = () => {
  const {
    min,
    secs,
    isActive,
    counter,
    isPromoComplete,
    startShortBreak,
    startLongBreak,
    toggleTimer,
    resetTimer,
    increaseMinutes,
    decreaseMinutes
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
    from: { transform: 'translateY(0)' }
  })

  const timePillContainer = useSpring({
    opacity: isActive ? 0 : 1,
    config: {
      duration: 100,
      transition: 'ease-in-out'
    },
    from: { opacity: 0 }
  })

  const handleButtonText = () => {  
    if (isActive) {
      return "Pause"
    } else {
      if (isPromoComplete) {
        return "Restart"
      } else {
        return "Start"
      }
    }
  }

  useEffect(() => {
    if (isActive) {
      setIsResetBtnVisible(false)
    } else {
      setIsResetBtnVisible(true)
    }
  }, [isActive])

  useEffect(() => {
    isActive ? document.title = `${min} : ${secs}` : document.title = "Pomodoro Timer"
  },[isActive, min, secs])
  

  const stAr=["25","50","75","100"]

  return (
    <>
      <DocTitle documentTitle={`${min} : ${secs}`} />
      <section className="h-[calc(100vh)] sm:h-[calc(100vh)] px-8 flex flex-col pt-36 gap-y-20 sm:pt-72 items-center">
        <animated.div
          style={timePillContainer}
          className="flex gap-x-3">
          {stAr.map((item, index) => (
            <div key={item} className={
              `py-1 w-8 flex justify-center select-none items-center pointer-events-none text-out-green-600 font-bold rounded-full bg-white opacity-10 ${index + 1 <= counter ? "opacity-70 text-out-green-1000" : ""}`
            }>
              <p className="text-xs">{item}</p>
            </div>
          ))} 
        </animated.div>

        <div className="max-w-[660px] px-10 py-8 flex justify-center ring-1 ring-slate-50 ring-opacity-40 rounded-3xl sm:rounded-[52px] relative">
          <div className="h-full w-full rounded-3xl sm:rounded-[52px] absolute top-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(83, 140, 103, 0.28)] border-out-green-200 to-[rgba(76, 160, 105, 0.26)] opacity-30 drop-shadow-md"></div>
          <div className="flex flex-col relative items-center ">
            <UtilityBtn
              resetBtnAnimationProps={resetBtnAnimationProps}
              increaseMinutes={increaseMinutes}
              decreaseMinutes={decreaseMinutes}
              resetTimer={resetTimer}
            />
            
            <animated.div
              style={timerContainerAnimationProps}
              className="flex gap-8 transition-all my-6 sm:my-4 leading-none select-none overflow-hidden justify-start items-center cursor-default">
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

        <ActionBtnGroup 
          startShortBreak={startShortBreak}
          startLongBreak={startLongBreak}
          toggleTimer={toggleTimer}
          handleButtonText={handleButtonText}
          isActive={isActive}
        />
      </section>
    </>
  )
}

export default Timer