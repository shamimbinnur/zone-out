"use client"

import useTimer, { Status } from '@/hooks/useTimer'
import { useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { animated } from '@react-spring/web'
import ActionBtnGroup from './ActionBtnGroup'
import DocTitle from '../common/DocTitle'
import UtilityBtn from './UtilityBtn'
import Progressbar from './Progressbar'
import { makeSound } from '@/utils/audio'

const Timer = () => {
  const {
    secs,
    min,
    status,
    isActive,
    isPromoComplete,
    pomoCount,
    shortCount,
    longCount,
    resetTimer,
    toggleTimer,
    pauseTimer,
    increaseMinutes,
    decreaseMinutes,
    toggleShortBreak,
    toggleLongBreak,
  } = useTimer()

  const [isVisible, setIsVisible] = useState(false)
  const timerMode = status === Status.POMO ? "Pomodoro" : status === Status.SHORT ? "Break" : "Break"

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
  
  // todo: leverage this function to handle button text
  const handleButtonText = () => {  
    return isActive ? "Pause" : (isPromoComplete ? "Restart" : "Start");
  }

  useEffect(() => {
    setIsVisible(!isActive);
  }, [isActive])

  useEffect(() => {
    document.title = isActive ? `${min}:${secs} (${timerMode}) ` : "Pomodoro Timer";
  },[isActive, min, secs])

  useEffect(() => {
    if (min === 0 && secs === 0) {
      makeSound("HEADS-UP")
    }
  }, [min, secs])
  

  // Beforeunload event listener
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      const isActiveAndImportant = isActive || pomoCount > 0 || (min !== 25 && secs < 57)
      if (isActiveAndImportant) {
        event.preventDefault();
        // legacy support
        event.returnValue = "";
        return "";
      }
    };
     
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [isActive, pomoCount, secs, min]);

   // Keyboard shortcuts
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        increaseMinutes();
      }
      else if (event.key === "ArrowDown") {
        event.preventDefault();
        decreaseMinutes();
      }
      else if (event.key === "r" || event.key === "R") {
        resetTimer();
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [min])

  return (
    <>
      <DocTitle documentTitle={`${min} : ${secs}` } />
      <section className="min-h-screen px-8 flex flex-col justify-center gap-y-20 items-center">
        <animated.div style={commonButtonProps}>
          <Progressbar completed={pomoCount} />
        </animated.div>

        <section className="max-w-[660px] scale-95 _410:scale-100 px-10 py-8 flex justify-center ring-1 bg-shadowy-forest ring-evergreen-meadow rounded-3xl sm:rounded-[52px] relative">
          {/* <div className="h-full w-full rounded-3xl sm:rounded-[52px] absolute top-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(83, 140, 103, 0.28)] border-out-green-200 to-[rgba(76, 160, 105, 0.26)] opacity-30 drop-shadow-md"></div> */}
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
              
              <div className="flex flex-col items-center gap-y-2">
                {
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={` ${index % 2 === 0 ? "bg-moonlit-silver" : "bg-turquoise-tide"} h-[25px] rounded-sm w-[4px]`}>
                    </div>
                  ))
                }
              </div>

              <div>
              <p className="sm:text-[182px] text-8xl sm:w-56 text-[90px] font-semibold sm:font-medium text-white">{secs < 10 ? `0${secs}` : secs}</p>
              </div>
            </animated.div>
          </div>
        </section>

        <ActionBtnGroup
          toggleShortBreak={toggleShortBreak}
          toggleLongBreak={toggleLongBreak}
          toggleTimer={toggleTimer}
          handleButtonText={handleButtonText}
          isActive={isActive}
          pauseTimer={pauseTimer}
          pomoCount={pomoCount}
          shortCount={shortCount}
          longCount={longCount}
          status={status}
        />
      </section>
    </>
  )
}

export default Timer