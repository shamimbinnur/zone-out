"use client"

import useTimer from '@/hooks/useTimer'
import { useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { animated } from '@react-spring/web'
import ActionBtnGroup from './ActionBtnGroup'
import DocTitle from '../common/DocTitle'
import UtilityBtn from './UtilityBtn'
import Progressbar from './Progressbar'

const Timer = () => {
  const {
    min,
    secs,
    isActive,
    counter,
    isPromoComplete,
    shortBreakToggle,
    longBreakToggle,
    toggleTimer,
    resetTimer,
    increaseMinutes,
    decreaseMinutes,
    pauseTimer
  } = useTimer()

  const [isVisible, setIsVisible] = useState(false)

  const commonButtonProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-40%)',
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
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [isActive])

  useEffect(() => {
    isActive ? document.title = `${min} : ${secs}` : document.title = "Pomodoro Timer"
  },[isActive, min, secs])
    
  return (
    <>
      <DocTitle documentTitle={`${min} : ${secs}`} />
      <section className="min-h-screen px-8 flex flex-col justify-center gap-y-20 items-center">
        <animated.div style={commonButtonProps}>
          <Progressbar completed={counter} />
        </animated.div>

        <div className="max-w-[660px] scale-95 _410:scale-100 px-10 py-8 flex justify-center ring-1 ring-out-green-200 rounded-3xl sm:rounded-[52px] relative">
          <div className="h-full w-full rounded-3xl sm:rounded-[52px] absolute top-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(83, 140, 103, 0.28)] border-out-green-200 to-[rgba(76, 160, 105, 0.26)] opacity-30 drop-shadow-md"></div>
          <div className="flex flex-col relative items-center ">
            <UtilityBtn
              resetBtnAnimationProps={commonButtonProps}
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
          toggleShortBreak={shortBreakToggle}
          toggleLongBreak={longBreakToggle}
          toggleTimer={toggleTimer}
          handleButtonText={handleButtonText}
          isActive={isActive}
          pauseTimer={pauseTimer}
        />
      </section>
    </>
  )
}

export default Timer