import React, { FC, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

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

  const [buttonPosition, setButtonPosition] = useState(0)
  const [props, api] =  useSpring(() => ({
    x: 0,
    config: {
      mass: 5,
      friction: 120,
      tension: 120,
    },
  }), [])

  useEffect(() => {api.start({ x: 0, config: { tension: 180, friction: 18 } }) }, [isActive])

  // Swipe button animation to show/hide
  const swipeButtonProps = useSpring({
    config: { duration: 100 },
    from: { opacity: 0 },
    to: { opacity: isActive ? 0 : 1 }
  })

  const handleLeftButtonClick = () => {
    // If button is in the middle, move it to the left
    if (buttonPosition == 0) {
      api.start({ x: 142 })
      setButtonPosition(-1)
    }
    // If button is on the right, let it go back to the middle
    else if (buttonPosition == -1) {
      api.start({ 
        config: { tension: 180, friction: 10 },
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
        config: { tension: 180, friction: 10 },
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
    <section className="flex justify-center items-center gap-x-8">
      <animated.button
      style={swipeButtonProps}
      onClick={handleLeftButtonClick}
      disabled={isActive}
      className="rounded-full bg-out-green-400 transition-all">
        <MdArrowLeft className="text-out-green-200 text-3xl scale-125"/>
      </animated.button>

      <div  className="w-[160px] py-1 mx-auto bg-out-green-1000 rounded-[52px] overflow-x-hidden">
        <animated.div
          style={props}
          className="select-none mx-auto text-base font-bold text-out-green-400 flex items-center justify-center gap-x-14"
          >
          
          {!isActive &&
          <button className="text-nowrap" onClick={startLongBreak} >
            Long Break
          </button>}

          <button onClick={toggleTimer} className="text-3xl">
            {handleButtonText()}
            {isActive && <span className="animate-pulse text-red-500"> .</span>}
          </button>

          {!isActive &&
          <button className="text-nowrap" onClick={startShortBreak} >
            Short Break
          </button>}
        </animated.div>
      </div>

      <animated.button
      style={swipeButtonProps}
      onClick={handleRightButtonClick}
      disabled={isActive}
      className="rounded-full flex items-center justify-center bg-out-green-400 transition-all">
        <MdArrowRight className="text-out-green-200 text-3xl scale-125"/>
      </animated.button>
    </section>
  )
}

export default ActionBtnGroup