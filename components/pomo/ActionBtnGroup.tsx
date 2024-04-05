import React, { FC, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { FaPause } from 'react-icons/fa';

interface ActionBtnGroupProps {
  toggleShortBreak: () => void
  toggleLongBreak: () => void
  toggleTimer: () => void
  isActive: boolean
  handleButtonText: () => string
  pauseTimer: () => void
}

const ActionBtnGroup:FC<ActionBtnGroupProps> = ({
  toggleShortBreak,
  toggleLongBreak,
  toggleTimer,
  isActive,
  pauseTimer,
}) => {

  const [buttonPosition, setButtonPosition] = useState(0)
  const [pillProps, api] =  useSpring(() => ({ x: 0, scale: 1 }), [])

  // useEffect(() => {api.start({ x: 0 }) }, [])

  // Swipe button animation to show/hide
  const swipeButtonProps = useSpring({
    config: { duration: 100 },
    from: { opacity: 0 },
    to: { opacity: isActive ? 0 : 1 }
  })

  const [pillContainer, pillContainerApi] = useSpring(() => ({}))
  const [pauseBtnProps, pauseBtnPropsApi] = useSpring(() => ({}))

  useEffect(() => {
    pillContainerApi.start({
      config:{
        duration: 100,
      },
      to: {
        scaleX: isActive ? 0.2 : 1,
        scaleY: isActive ? 0.8 : 1,
        opacity: isActive ? 0 : 1
      }
    })
  }, [isActive])

  useEffect(() => {
    pauseBtnPropsApi.start({
      config:{
        duration: 100,
      },
      to: {
        scaleX: isActive ? 1 : 1.5,
        scaleY: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0
      }
    })
  }, [isActive])
  

  const handleLeftButtonClick = () => {
    // If button is in the middle, move it to the left
    if (buttonPosition == 0) {
      api.start({ x: 142 })
      setButtonPosition(-1)
    }
    // If button is on the right, let it go back to the middle
    else if (buttonPosition == -1) {
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: 136 },
        to: { x: 142 }
      })
    }
    // If button is on the left, let it go back to the middle
    else if (buttonPosition == 1) {
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(0)
    }
  }

  const handleRightButtonClick = () => {
    // If button is in the middle, move it to the right
    if (buttonPosition == 0) {
      api.start({ x: -135 })
      setButtonPosition(1)
    }
    else if (buttonPosition == 1) {
      // If button is on the right, let it go back to the middle
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: -142 },
        to: { x: -136 }
      })
    }
    else if (buttonPosition == -1) {
      // If button is on the left, let it go back to the middle
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(0)
    }
  }
  
  return (
    <section className="flex relative justify-center items-center gap-x-8">
      <animated.button
      style={swipeButtonProps}
      onClick={handleLeftButtonClick}
      disabled={isActive}
      className="rounded-full bg-out-green-400 transition-all">
        <MdArrowLeft className="text-out-green-200 text-3xl scale-125"/>
      </animated.button>

      <animated.div style={pillContainer} className="w-[160px] py-1 mx-auto bg-out-green-1000 rounded-[52px] overflow-x-hidden">
        <animated.div
          style={pillProps}
          className="select-none mx-auto text-base font-bold text-out-green-400 flex items-center justify-center gap-x-14"
          >
            <button className="text-nowrap" onClick={toggleLongBreak} >
              Long Break
            </button>

            <animated.button onClick={toggleTimer} className="text-3xl">
              Start
            </animated.button>

            <button className="text-nowrap" onClick={toggleShortBreak} >
              Short Break
            </button>
        </animated.div>
      </animated.div>

      <animated.button
      onClick={handleRightButtonClick}
      style={swipeButtonProps}
      disabled={isActive}
      className="rounded-full flex items-center justify-center bg-out-green-400 transition-all">
        <MdArrowRight className="text-out-green-200 text-3xl scale-125"/>
      </animated.button>

      {/* Pause Button */}
      {isActive &&
      <animated.button
      onClick={pauseTimer}
      style={pauseBtnProps}
      className="bg-out-green-1000 rounded-full absolute text-sm p-4 text-white">
        <FaPause/>
      </animated.button>}
    </section>
  )
}

export default ActionBtnGroup