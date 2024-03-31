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

  const [isButtonInMiddle, setIsButtonInMiddle] = useState(true)
  const [props, api] =  useSpring(() => ({ from: { x: 0 } }))

  useEffect(() => {api.start({ x: 0 }) }, [isActive])

  const swipeButtonProps = useSpring({
    config: { duration: 100 },
    from: { opacity: 0 },
    to: { opacity: isActive ? 0 : 1 }
  })

  const handleLeftButtonClick = () => {
    if (isButtonInMiddle){
      api.start({ x: -135 })
      setIsButtonInMiddle(!isButtonInMiddle)
    }
    else {
      api.start({ x: 0 })
      setIsButtonInMiddle(!isButtonInMiddle)
    }
  }

  const handleRightButtonClick = () => {
    if (isButtonInMiddle) {
    api.start({ x: 142 })
    setIsButtonInMiddle(!isButtonInMiddle)
    }
    else {
      api.start({ x: 0 })
      setIsButtonInMiddle(!isButtonInMiddle)
    }
  }

  return (
    <div className="flex justify-center items-center gap-x-8">
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
          className="select-none mx-auto text-sm sm:text-base font-bold text-out-green-400 flex items-center justify-center gap-5 sm:gap-x-14"
          >
          
          {!isActive && 
          <button className="text-nowrap" onClick={startLongBreak} >
            Long Break
          </button>}

          <button onClick={toggleTimer} className="text-xl sm:text-3xl">
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
    </div>
  )
}

export default ActionBtnGroup